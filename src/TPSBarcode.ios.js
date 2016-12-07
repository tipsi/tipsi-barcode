import React, { Component, PropTypes } from 'react'
import {
  NativeModules,
  requireNativeComponent,
  Alert,
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

  async componentWillMount() {
    try {
      await TPSBarcodeManager.checkDeviceAuthorizationStatus()
      await TPSBarcodeManager.startCamera()
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
              } catch (e) {
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
