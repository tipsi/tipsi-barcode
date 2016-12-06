/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native'
import TPSBarcode from 'tipsi-barcode'

export default class example extends Component {
  onBarcodeScanned = (event) => {
    console.log(event.nativeEvent)
  }

  render() {
    return (
      <View style={styles.container}>
        <TPSBarcode onBarcodeScanned={this.onBarcodeScanned} style={{ width: 400, height: 600 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
})

AppRegistry.registerComponent('example', () => example)
