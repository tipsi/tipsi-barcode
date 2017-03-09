//
//  TPSBarcode.h
//  TPSBarcode
//
//  Created by Anton Kuznetsov on 01/12/2016.
//
//

#import <UIKit/UIKit.h>
#import <React/UIView+React.h>
#import <RCTBridge.h>
#import <AVFoundation/AVFoundation.h>

@interface TPSBarcode : UIView <AVCaptureMetadataOutputObjectsDelegate>

@property (nonatomic, strong) dispatch_queue_t queue;
@property (nonatomic, strong) AVCaptureSession *session;
@property (nonatomic, strong) AVCaptureVideoPreviewLayer *previewLayer;
@property (nonatomic, copy) RCTBubblingEventBlock onBarcodeScanned;

- (id)initWithQueue:(dispatch_queue_t)queue;
- (void)startCamera;
- (void)stopCapture;
- (void)barcodeScanned:(NSString *)result;

@end
