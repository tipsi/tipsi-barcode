//
//  TPSBarcodeManager.m
//  TPSBarcode
//
//  Created by Anton Kuznetsov on 01/12/2016.
//
//

#import "TPSBarcodeManager.h"
#import "TPSBarcode.h"
#import <RCTBridgeModule.h>
#import <RCTLog.h>
#import "UIView+React.h"

@implementation TPSBarcodeManager

RCT_EXPORT_MODULE()

- (id)init {
    if ((self = [super init])) {
        self.queue = dispatch_queue_create("cameraManagerQueue", DISPATCH_QUEUE_SERIAL);
    }
    return self;
}

// Like render in React
// Entry point of View Component
- (UIView *)view {
    TPSBarcode *theView = [[TPSBarcode alloc] initWithQueue:self.queue];
    return theView;
}

- (dispatch_queue_t)methodQueue {
    return self.queue;
}

RCT_EXPORT_VIEW_PROPERTY(onBarcodeScanned, RCTBubblingEventBlock);

RCT_EXPORT_METHOD(checkDeviceAuthorizationStatus:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    __block NSString *mediaType = AVMediaTypeVideo;
    [AVCaptureDevice requestAccessForMediaType:mediaType completionHandler:^(BOOL granted) {
        if (!granted) {
            reject(nil, nil, @(granted));
        } else {
            mediaType = AVMediaTypeAudio;
            [AVCaptureDevice requestAccessForMediaType:mediaType completionHandler:^(BOOL granted) {
                resolve(@(granted));
            }];
        }
    }];
}

@end
