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

- (void) dealloc {
    [self stopCapture];
}

- (id) initWithQueue:(dispatch_queue_t)queue {
    if (self = [super init]) {
        self.session = [AVCaptureSession new];
        
        self.previewLayer = [AVCaptureVideoPreviewLayer layerWithSession:self.session];
        [self.layer insertSublayer:self.previewLayer atIndex:0];
        [self.previewLayer setNeedsDisplayOnBoundsChange:YES];
        [self.previewLayer setVideoGravity:AVLayerVideoGravityResizeAspectFill];
        
        self.queue = queue;
    }
    return self;
}

- (void) initCamera {
#if TARGET_IPHONE_SIMULATOR
    return;
#endif
    AVCaptureDevice *captureDevice = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    AVCaptureDeviceInput *input = [AVCaptureDeviceInput deviceInputWithDevice:captureDevice error:nil];
    [self.session addInput:input];
    AVCaptureMetadataOutput *captureMetadataOutput = [AVCaptureMetadataOutput new];
    [self.session addOutput:captureMetadataOutput];
    
    [captureMetadataOutput setMetadataObjectsDelegate:self queue:self.queue];
    [captureMetadataOutput setMetadataObjectTypes:[captureMetadataOutput availableMetadataObjectTypes]];
}

- (void) startCamera {
    [self initCamera];
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
                [self barcodeScanned:metadata.stringValue];
            }
        }
    }
}

- (void) barcodeScanned: (NSString *)result  {
    NSDictionary *event = @{
        @"data": result
    };
    _onBarcodeScanned(event);
}

- (void) layoutSubviews {
    [super layoutSubviews];
    [self.previewLayer setFrame:self.bounds];
}

@end
