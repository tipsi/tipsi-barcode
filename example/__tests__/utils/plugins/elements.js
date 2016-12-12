export default function elements() {
  const { idFromXPath: id } = this

  const selectors = {
    title: {
      ios: id(`
        //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
        XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
        XCUIElementTypeStaticText
      `),
      android: id(`
        //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
        android.widget.FrameLayout[1]/android.view.ViewGroup[1]/android.widget.TextView[1]
      `),
    },
    camera: {
      ios: id(`
        //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
        XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
        XCUIElementTypeOther/XCUIElementTypeOther
      `),
      android: id(`
        //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
        android.widget.FrameLayout[1]/android.view.ViewGroup[1]/
        android.view.ViewGroup[1]/android.view.View[1]
      `),
    },
    permissionOkButton: {
      ios: id(`
        //XCUIElementTypeApplication/XCUIElementTypeWindow[6]/XCUIElementTypeOther[2]/
        XCUIElementTypeAlert/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
        XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/
        XCUIElementTypeButton
      `),
    },
    galleryButton: {
      android: id(`
        //android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/
        android.widget.FrameLayout[1]/android.view.ViewGroup[1]/
        android.widget.Button[1]/android.widget.TextView[1]
      `),
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
