import React, { Component, PropTypes } from 'react'
import {
  NativeModules,
  requireNativeComponent,
} from 'react-native'

const { TPSBarcodeManager } = NativeModules
const ScannerView = requireNativeComponent('TPSBarcode', TPSBarcode)


export default class TPSBarcode extends Component {
  static propTypes = {
    children: PropTypes.node,
    onBarcodeScanned: PropTypes.func,
    styles: PropTypes.object,
  }

  static defaultProps = {
    onBarcodeScanned: () => {},
    styles: {},
  }

  componentWillMount() {
    TPSBarcodeManager.checkDeviceAuthorizationStatus()
  }

  render() {
    const { children, styles, onBarcodeScanned } = this.props
    return (
      <ScannerView
        style={{ width: styles.width, height: styles.height }}
        onBarcodeScanned={onBarcodeScanned}>
        {children}
      </ScannerView>
    )
  }
}
