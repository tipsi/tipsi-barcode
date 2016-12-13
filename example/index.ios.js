import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  Dimensions,
} from 'react-native'
import TPSBarcode from 'tipsi-barcode'

const { width, height } = Dimensions.get('window')

export default class example extends Component {
  state = {
    scannedText: '',
  }

  handleBarcodeScanned = ({ data: scannedText = '' }) => {
    this.setState({ scannedText })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>
          Tipsi Barcode Scanner
        </Text>
        <TPSBarcode styles={styles.scanner} onBarcodeScanned={this.handleBarcodeScanned} />
        <Text style={{ marginTop: 20, fontSize: 16 }}>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  scanner: {
    width,
    height: height - 150,
  },
}

AppRegistry.registerComponent('example', () => example)
