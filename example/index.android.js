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
        <Text style={styles.title}>
          Tipsi Barcode Scanner
        </Text>
        <TPSBarcode styles={styles.scanner} onBarcodeScanned={this.handleBarcodeScanned} />
        <Text style={styles.result}>
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
    height: height - 135,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
}

AppRegistry.registerComponent('example', () => example)
