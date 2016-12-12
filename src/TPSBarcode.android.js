import React, { Component, PropTypes } from 'react'
import {
  View,
  Button,
  NativeAppEventEmitter,
  requireNativeComponent,
  NativeModules,
} from 'react-native'

const { TPSBarcodeModule } = NativeModules
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
      <View>
        <ScannerView style={styles}>
          {children}
        </ScannerView>
        <Button title="Gallery" onPress={() => TPSBarcodeModule.openGallery()}>
          Gallery
        </Button>
      </View>
    )
  }
}
