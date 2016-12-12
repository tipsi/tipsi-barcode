//
//  TPSBarcodeManager.h
//  TPSBarcode
//
//  Created by Anton Kuznetsov on 01/12/2016.
//
//

#import "RCTViewManager.h"
#import <AVFoundation/AVFoundation.h>

@interface TPSBarcodeManager : RCTViewManager

@property (nonatomic, strong) dispatch_queue_t queue;

@end
