package com.gettipsi.barcode;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static android.app.Activity.RESULT_OK;

public class TPSBarcodeModule extends ReactContextBaseJavaModule {

    private static final int RESULT_GALLERY = 0;

    private final ActivityEventListener activityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            super.onActivityResult(activity, requestCode, resultCode, data);

            if (requestCode == RESULT_GALLERY && resultCode == RESULT_OK && null != data) {
                Uri selectedImage = data.getData();

                String[] filePathColumn = {
                    MediaStore.Images.Media.DATA
                };

                Cursor cursor = getCurrentActivity()
                        .getContentResolver()
                        .query(selectedImage, filePathColumn, null, null, null);
                cursor.moveToFirst();

                int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
                String picturePath = cursor.getString(columnIndex);
                cursor.close();
            }
        }
    };

    public TPSBarcodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
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
}
