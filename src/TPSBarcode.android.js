import React, { Component, PropTypes } from 'react'
import {
  NativeModules,
  requireNativeComponent,
  NativeAppEventEmitter,
  PermissionsAndroid,
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

  state = {
    granted: false,
  }

  async componentWillMount() {
    this.barcodeListener = NativeAppEventEmitter.addListener(
      'scannerBarcodeRead',
      this.props.onBarcodeScanned
    )

    const granted = await PermissionsAndroid.requestPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA
    )

    this.setState({ granted })
  }

  componentWillUnmount() {
    this.barcodeListener.remove()
  }

  handlePress = () => {
    TPSBarcodeModule.openGallery()
  }

  render() {
    const { children, styles } = this.props
    const CameraView = this.state.granted ? ScannerView : View
    return (
      <View>
        <CameraView style={styles} accessible accessibilityLabel="scanner">
          {children}
        </CameraView>
        <Button title="Gallery" onPress={this.handlePress} accessible accessibilityLabel="gallery">
          Gallery
        </Button>
      </View>
    )
  }
}
