import React, { Component, PropTypes } from 'react'
import {
  NativeModules,
  requireNativeComponent,
  NativeAppEventEmitter,
  View,
  Button,
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
    this.barcodeListener = NativeAppEventEmitter.addListener(
      'scannerBarcodeRead',
      this.props.onBarcodeScanned
    )
  }

  componentWillUnmount() {
    this.barcodeListener.remove()
  }

  handlePress = () => {
    TPSBarcodeModule.openGallery()
  }

  render() {
    const { children, styles } = this.props
    return (
      <View>
        <ScannerView style={styles}>
          {children}
        </ScannerView>
        <Button title="Gallery" onPress={this.handlePress}>
          Gallery
        </Button>
      </View>
    )
  }
}
