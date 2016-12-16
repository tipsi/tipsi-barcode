[![Build Status](https://travis-ci.org/tipsi/tipsi-barcode.svg?branch=master)](https://travis-ci.org/tipsi/tipsi-barcode)

# tipsi-barcode
React Native Barcode Scanner for iOS/Android

### iOS
![image](https://cloud.githubusercontent.com/assets/1788245/20975154/9a6bcda0-bcaf-11e6-9a42-6584e1beeb49.png)

### Android
![image](https://cloud.githubusercontent.com/assets/1788245/21139504/3cae80ce-c144-11e6-985a-afade1814960.png)

## Usage
```js
// ...other imports
import TPSBarcode from 'tipsi-barcode'

class BarcodeScannerScreen extends React.Component {
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
```

See more in [example](https://github.com/tipsi/tipsi-barcode/tree/master/example) directory

## License

MIT License

Copyright (c) 2016 Tipsi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
