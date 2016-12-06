import React, { Component, PropTypes } from 'react'
import {
  View,
  NativeAppEventEmitter,
  requireNativeComponent,
} from 'react-native'

const ScannerView = requireNativeComponent('TPSBarcode', TPSBarcode)

export default class TPSBarcode extends Component {
  static propTypes = {
    ...View.propTypes,
    onBarcodeScanned: PropTypes.func,
  }

  static defaultProps = {
    onBarcodeScanned: () => {},
  }

  componentWillMount() {
    this.barcodeListener = NativeAppEventEmitter
      .addListener('scannerBarcodeRead', this.props.onBarcodeScanned)
  }

  componentWillUnmount() {
    this.barcodeListener.remove()
  }

  render() {
    const { children, styles } = this.props
    return (
      <ScannerView style={styles}>
        {children}
      </ScannerView>
    )
  }
}
