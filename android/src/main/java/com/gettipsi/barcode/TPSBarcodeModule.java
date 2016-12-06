package com.gettipsi.barcode;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class TPSBarcodeModule extends ReactContextBaseJavaModule {

    public TPSBarcodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TPSBarcodeModule";
    }
}
