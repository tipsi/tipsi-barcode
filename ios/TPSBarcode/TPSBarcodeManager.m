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

@interface TPSBarcodeManager ()

@property (nonatomic, strong) TPSBarcode *barcodeView;

@end

@implementation TPSBarcodeManager

RCT_EXPORT_MODULE()

- (id)init {
    if (self = [super init]) {
        self.queue = dispatch_queue_create("cameraManagerQueue", DISPATCH_QUEUE_SERIAL);
    }
    return self;
}

// Like render in React
// Entry point of View Component
- (UIView *)view {
    TPSBarcode *theView = [[TPSBarcode alloc] initWithQueue:self.queue];
    self.barcodeView = theView;
    return theView;
}

- (dispatch_queue_t)methodQueue {
    return self.queue;
}

RCT_EXPORT_METHOD(openAppSettings:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    if (&UIApplicationOpenSettingsURLString != NULL) {
        NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
        [[UIApplication sharedApplication] openURL:url];
    }
    else {
        reject(nil, nil, [[NSError alloc] init]);
    }
}

RCT_EXPORT_VIEW_PROPERTY(onBarcodeScanned, RCTBubblingEventBlock);

RCT_EXPORT_METHOD(startCamera) {
    [self.barcodeView startCamera];
}

RCT_EXPORT_METHOD(checkDeviceAuthorizationStatus:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    __block NSString *mediaType = AVMediaTypeVideo;
    AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    
    if (authStatus == AVAuthorizationStatusAuthorized) {
        resolve(@(YES));
    } else if (authStatus == AVAuthorizationStatusNotDetermined) {
        [AVCaptureDevice requestAccessForMediaType:mediaType completionHandler:^(BOOL granted) {
            if (!granted) {
                reject(nil, nil, [[NSError alloc] initWithDomain:@"com.tipsi.barcode" code:401 userInfo:@{@"reason":@"denied"}]);
            } else {
                mediaType = AVMediaTypeAudio;
                [AVCaptureDevice requestAccessForMediaType:mediaType completionHandler:^(BOOL granted) {
                    resolve(@(granted));
                }];
            }
        }];
    } else {
        reject(nil, nil, [[NSError alloc] initWithDomain:@"com.tipsi.barcode" code:403 userInfo:@{@"reason":@"restricted"}]);
    }
}

@end
