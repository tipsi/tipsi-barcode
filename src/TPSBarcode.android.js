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

  static requestCameraPermission = ({ title, message } = {}) => (
    new Promise(async (resolve) => {
      try {
        const granted = await PermissionsAndroid.requestPermission(
          PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: title || 'Cool Photo App Camera Permission',
            message: message ||
              'Cool Photo App needs access to your camera so you can take awesome pictures.',
          }
        )

        resolve(granted)
      } catch (err) {
        resolve(false)
      }
    })
  )

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
        <ScannerView style={styles} accessible accessibilityLabel="scanner">
          {children}
        </ScannerView>
        <Button title="Gallery" onPress={this.handlePress} accessible accessibilityLabel="gallery">
          Gallery
        </Button>
      </View>
    )
  }
}
