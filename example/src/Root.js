import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  Dimensions,
  Platform,
} from 'react-native'
import TPSBarcode from 'tipsi-barcode'

export default class Root extends Component {
  state = {
    show: false,
    scannedText: '',
  }

  handleShowScanner = () => {
    this.setState({ show: true })
  }

  handleBarcodeScanned = ({ data: scannedText = '' }) => {
    this.setState({ scannedText })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.title}
          accessible
          accessibilityLabel="title"
          testID="title">
          Tipsi Barcode Scanner
        </Text>
        {!this.state.show &&
          <Button
            onPress={this.handleShowScanner}
            accessible
            accessibilityLabel="show"
            testID="show"
            title="Show Scanner"
          />
        }
        {this.state.show &&
          <TPSBarcode
            styles={styles.scanner}
            onBarcodeScanned={this.handleBarcodeScanned}
          />
        }
        <Text
          style={styles.result}
          accessible
          accessibilityLabel="result"
          testID="result">
          {this.state.scannedText}
        </Text>
      </View>
    )
  }
}

const { width, height } = Dimensions.get('window')

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
    height: height - (Platform.OS === 'ios' ? 150 : 135),
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
}
