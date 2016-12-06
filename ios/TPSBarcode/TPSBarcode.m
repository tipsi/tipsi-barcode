//
//  TPSBarcode.m
//  TPSBarcode
//
//  Created by Anton Kuznetsov on 01/12/2016.
//
//

#import "TPSBarcode.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "RCTLog.h"
#import "UIView+React.h"
#import <AVFoundation/AVFoundation.h>

@implementation TPSBarcode

- (id) initWithQueue:(dispatch_queue_t)queue {
    if ((self = [super init])) {
        self.queue = queue;
        [self initCamera];
        [self startCapture];
    }
    return self;
}

- (void) initCamera {
#if TARGET_IPHONE_SIMULATOR
    return;
#endif
    self.session = [AVCaptureSession new];
    
    AVCaptureDevice *captureDevice = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    AVCaptureDeviceInput *input = [AVCaptureDeviceInput deviceInputWithDevice:captureDevice error:nil];
    [self.session addInput:input];
    AVCaptureMetadataOutput *captureMetadataOutput = [AVCaptureMetadataOutput new];
    [self.session addOutput:captureMetadataOutput];
    
    [captureMetadataOutput setMetadataObjectsDelegate:self queue:self.queue];
    [captureMetadataOutput setMetadataObjectTypes:[captureMetadataOutput availableMetadataObjectTypes]];
    
    self.previewLayer = [AVCaptureVideoPreviewLayer layerWithSession:self.session];
    
    [self.previewLayer setNeedsDisplayOnBoundsChange:YES];
    [self.previewLayer setVideoGravity:AVLayerVideoGravityResizeAspectFill];
}

- (void) startCapture {
    [self.session startRunning];
}

- (void) stopCapture {
    [self.session stopRunning];
}

- (void) captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects fromConnection:(AVCaptureConnection *)connection {
    NSArray *barCodeTypes = @[
        AVMetadataObjectTypeUPCECode,
        AVMetadataObjectTypeCode39Code,
        AVMetadataObjectTypeCode39Mod43Code,
        AVMetadataObjectTypeEAN13Code,
        AVMetadataObjectTypeEAN8Code,
        AVMetadataObjectTypeCode93Code,
        AVMetadataObjectTypeCode128Code,
        AVMetadataObjectTypePDF417Code,
        AVMetadataObjectTypeQRCode,
        AVMetadataObjectTypeAztecCode
    ];
    
    for (AVMetadataMachineReadableCodeObject *metadata in metadataObjects) {
        for (id barCodeType in barCodeTypes) {
            if ([metadata.type isEqualToString:barCodeType]) {
                NSDictionary *event = @{
                    @"type": metadata.type,
                    @"data": metadata.stringValue
                };
                _onBarcodeScanned(event);
            }
        }
    }
}

- (void) layoutSubviews {
    [super layoutSubviews];
    [self.previewLayer setFrame:self.bounds];
    [self setBackgroundColor:[UIColor blackColor]];
    [self.layer insertSublayer:self.previewLayer atIndex:0];
}

- (void) insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
    [super insertReactSubview:subview atIndex:atIndex + 1];
    [self insertSubview:subview atIndex:atIndex + 1];
}

- (void)removeReactSubview:(UIView *)subview {
    [super removeReactSubview:subview];
}

- (void)removeFromSuperview {
    [self stopCapture];
    [super removeFromSuperview];
}

@end
