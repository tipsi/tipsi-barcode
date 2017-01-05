import React, { Component, PropTypes } from 'react'
import {
  NativeModules,
  requireNativeComponent,
  Alert,
  View,
  Button,
} from 'react-native'

const { TPSBarcodeManager } = NativeModules
const ScannerView = requireNativeComponent('TPSBarcode', TPSBarcode)

const errorDescription = {
  restricted: 'You should give access to Camera & Microphone in Settings => Example',
  denied: 'You didn\'t accept permissions for Barcode. You cannot use Barcode Scanner',
}

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

  static requestCameraPermission = () => (
    new Promise(async (resolve) => {
      try {
        await TPSBarcodeManager.checkDeviceAuthorizationStatus()
        TPSBarcodeManager.startCamera()
        resolve(true)
      } catch (error) {
        Alert.alert(
          'Permissions error',
          errorDescription[error.userInfo.reason],
          [
            { text: 'Cancel', onPress: () => {} },
            { text: 'Grant Access',
              onPress: async () => {
                try {
                  await TPSBarcodeManager.openAppSettings()
                  resolve(true)
                } catch (e) {
                  resolve(false)
                  Alert.alert(
                    'Grant Access',
                    'Try to give access to Camera and Microphone manually',
                    [{ text: 'OK', onPress: () => {} }],
                  )
                }
              },
            },
          ],
        )
      }
    })
  )

  handleBarcodeScanned = ({ nativeEvent }) => {
    this.props.onBarcodeScanned(nativeEvent)
  }

  render() {
    const { children, styles } = this.props
    return (
      <View>
        <ScannerView
          style={styles}
          onBarcodeScanned={this.handleBarcodeScanned}>
          {children}
        </ScannerView>
        <Button title="Gallery" onPress={() => TPSBarcodeManager.openGallery()}>
          Gallery
        </Button>
      </View>
    )
  }
}
