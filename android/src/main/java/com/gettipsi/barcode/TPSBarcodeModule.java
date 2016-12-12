package com.gettipsi.barcode;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;
import android.util.SparseArray;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.vision.Frame;
import com.google.android.gms.vision.barcode.Barcode;
import com.google.android.gms.vision.barcode.BarcodeDetector;

import java.io.IOException;

import static android.app.Activity.RESULT_OK;

public class TPSBarcodeModule extends ReactContextBaseJavaModule {
    private static final int RESULT_GALLERY = 0;
    private final ActivityEventListener activityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            super.onActivityResult(activity, requestCode, resultCode, data);
            if (requestCode == RESULT_GALLERY && resultCode == RESULT_OK && null != data) {
                Uri selectedImageUri = data.getData();
                try {
                    final Bitmap selectedImageBitmap = MediaStore.Images.Media.getBitmap(
                        getCurrentActivity().getContentResolver(),
                        selectedImageUri
                    );
                    scanImage(selectedImageBitmap);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    };

    private final ReactApplicationContext reactContext;
    public TPSBarcodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(activityEventListener);
    }

    @Override
    public String getName() {
        return "TPSBarcodeModule";
    }

    @ReactMethod
    public void openGallery() {
        Intent galleryIntent = new Intent(
            Intent.ACTION_PICK,
            android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI
        );
        getCurrentActivity().startActivityForResult(galleryIntent, RESULT_GALLERY);
    }

    private void scanImage(final Bitmap bitmap) {
        final Frame frame = new Frame.Builder().setBitmap(bitmap).build();
        final BarcodeDetector barcodeDetector = new BarcodeDetector.Builder(getCurrentActivity())
                .build();
        if (barcodeDetector.isOperational()) {
            SparseArray<Barcode> sparseArray = barcodeDetector.detect(frame);
            if (sparseArray != null && sparseArray.size() > 0) {
                for (int i = 0; i < sparseArray.size(); i++) {
                    sendEvent(sparseArray.valueAt(i));
                }
            } else {
                Log.e("LOG_TAG", "SparseArray null or empty");
            }
        } else {
            Log.e("LOG_TAG", "Detector dependencies are not yet downloaded");
        }
    }

    private void sendEvent(final Barcode result) {
        WritableMap event = Arguments.createMap();
        event.putString("data", result.rawValue);
        event.putString("type", Integer.toString(result.format));
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("scannerBarcodeRead", event);
    }
}