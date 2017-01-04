import test from 'tape-async'
import helper from 'tipsi-appium-helper'

const { driver, select, idFromXPath, idFromResourceId, idFromAccessId } = helper

test('Test if user can see barcode scanner', async (t) => {
  const showScannerButtonId = idFromAccessId('show')
  const permissionOkButtonId = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication/XCUIElementTypeWindow[6]/XCUIElementTypeOther[2]/
      XCUIElementTypeAlert/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
      XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/
      XCUIElementTypeButton
    `),
    android: idFromResourceId('com.android.packageinstaller:id/permission_allow_button'),
  })
  const titleId = idFromAccessId('title')
  const cameraId = select({
    ios: idFromXPath(`
      //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
      XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther
    `),
    android: idFromAccessId('scanner'),
  })

  try {
    await driver.waitForVisible(titleId, 60000)
    const title = await driver.getText(titleId)
    t.equal(title, 'Tipsi Barcode Scanner', 'Title is correct')

    await driver.click(showScannerButtonId)
    t.pass('User should be able to click "Show Scanner" button')

    try {
      await driver
        .waitForVisible(permissionOkButtonId, 10000)
        .click(permissionOkButtonId)
    } catch (e) {
      // Do nothing
    }

    await driver.waitForVisible(cameraId, 60000)
    t.pass('User should see barcode scanner view')
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
