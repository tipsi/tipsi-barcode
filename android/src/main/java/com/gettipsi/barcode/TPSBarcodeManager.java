package com.gettipsi.barcode;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class TPSBarcodeManager extends ViewGroupManager<TPSBarcodeView> implements LifecycleEventListener {

    public static final String REACT_CLASS = "TPSBarcode";

    private TPSBarcodeView mReaderView;
    private boolean mReaderViewVisible;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public TPSBarcodeView createViewInstance(ThemedReactContext context) {
        context.addLifecycleEventListener(this);
        mReaderView = new TPSBarcodeView(context, null);
        mReaderViewVisible = true;
        return mReaderView;
    }

    @Override
    public void onDropViewInstance(TPSBarcodeView view) {
        mReaderViewVisible = false;
        mReaderView.stop();
    }

    @Override
    public void onHostResume() {
        if (mReaderViewVisible) {
            mReaderView.startCameraSource();
        }
    }

    @Override
    public void onHostPause() {
        mReaderView.stop();
    }

    @Override
    public void onHostDestroy() {
        mReaderView.stop();
        mReaderView.release();
    }
}
