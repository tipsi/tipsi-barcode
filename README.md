[![Build Status](https://travis-ci.org/tipsi/tipsi-barcode.svg?branch=master)](https://travis-ci.org/tipsi/tipsi-barcode)

# tipsi-barcode
React Native Barcode Scanner for IOS/Android

### iOS                                 Android
![image](https://cloud.githubusercontent.com/assets/1788245/20975154/9a6bcda0-bcaf-11e6-9a42-6584e1beeb49.png)
![image](https://cloud.githubusercontent.com/assets/1788245/21138338/a1457552-c13e-11e6-9d1f-42ad42834b09.png)

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
```

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
