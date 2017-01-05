import helper from 'tipsi-appium-helper'

helper.elements = function () {
  const { idFromXPath, idFromAccessId, idFromResourceId } = this

  const selectors = {
    title: {
      ios: idFromAccessId('Tipsi Barcode Scanner'),
      android: idFromAccessId('title'),
    },
    camera: {
      ios: idFromXPath(`
        //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
        XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
        XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther
      `),
      android: idFromAccessId('scanner'),
    },
    openScannerButton: {
      ios: idFromAccessId('show'),
      android: idFromAccessId('show'),
    },
    permissionOkButton: {
      ios: idFromXPath(`
        //XCUIElementTypeApplication/XCUIElementTypeWindow[6]/XCUIElementTypeOther[2]/
        XCUIElementTypeAlert/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
        XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/
        XCUIElementTypeButton
      `),
      android: idFromResourceId('com.android.packageinstaller:id/permission_allow_button'),
    },
    galleryButton: {
      ios: idFromXPath(`
        //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
        XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
        XCUIElementTypeOther/XCUIElementTypeButton
      `),
      android: idFromAccessId('gallery'),
    },
  }


  return Object.keys(selectors).reduce((memo, item) => {
    const currentImplementation = selectors[item][this.config.platformName]
    if (currentImplementation) {
      /* eslint no-param-reassign: 0 */
      memo[item] = currentImplementation
    }

    return memo
  }, {})
}.bind(helper)

export default helper
