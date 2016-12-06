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
  }

  componentWillMount() {
    TPSBarcodeManager.checkDeviceAuthorizationStatus()
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  render() {
    const { children, styles, onBarcodeScanned } = this.props
    return (
      <ScannerView
        style={{ width: 300, height: 300 }}
        onBarcodeScanned={onBarcodeScanned}>
        {children}
      </ScannerView>
    )
  }
}
