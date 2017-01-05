import React, { Component } from 'react'
import {
  Dimensions,
  Platform,
  View,
  Text,
  Button,
} from 'react-native'
import TPSBarcode from 'tipsi-barcode'

const { width, height } = Dimensions.get('window')

export default class example extends Component {
  state = {
    isBarcodeVisible: false,
    scannedText: '',
  }

  handleShowScanner = async () => {
    const isBarcodeVisible = await TPSBarcode.requestCameraPermission()
    this.setState({ isBarcodeVisible })
  }

  handleBarcodeScanned = ({ data: scannedText = '' }) => {
    this.setState({ scannedText })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title} accessible accessibilityLabel="title">
          Tipsi Barcode Scanner
        </Text>
        {!this.state.isBarcodeVisible &&
          <Button
            onPress={this.handleShowScanner}
            accessible
            accessibilityLabel="show"
            testID="show"
            title="Show Scanner"
          />
        }
        {this.state.isBarcodeVisible &&
          <TPSBarcode
            styles={styles.scanner}
            onBarcodeScanned={this.handleBarcodeScanned}
          />
        }
        <Text style={styles.result} accessible accessibilityLabel="result">
          {this.state.scannedText}
        </Text>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  scanner: {
    width,
    height: height - (Platform.OS === 'android' ? 135 : 150),
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
}
