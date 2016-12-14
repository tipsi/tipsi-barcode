export default function elements() {
  const { idFromXPath, idFromAccessId } = this

  const selectors = {
    title: {
      ios: idFromXPath(`
        //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
        XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
        XCUIElementTypeStaticText
      `),
      android: idFromAccessId('title'),
    },
    camera: {
      ios: idFromXPath(`
        //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
        XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
        XCUIElementTypeOther/XCUIElementTypeOther
      `),
      android: idFromAccessId('scanner'),
    },
    permissionOkButton: {
      ios: idFromXPath(`
        //XCUIElementTypeApplication/XCUIElementTypeWindow[6]/XCUIElementTypeOther[2]/
        XCUIElementTypeAlert/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
        XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/
        XCUIElementTypeButton
      `),
    },
    galleryButton: {
      android: idFromAccessId('gallery'),
    },
  }


  return Object.keys(selectors).reduce((memo, item) => {
    const currentImplementation = selectors[item][this.config.platformName]
    if (currentImplementation) {
      /* eslint no-param-reassign: 0 */
      memo[item] = selectors[item][this.config.platformName]
    }

    return memo
  }, {})
}
