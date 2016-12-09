import test from 'tape-async'
import helper from './utils/helper'

const { driver, idFromXPath } = helper

test('Test if user can see barcode scanner', async (t) => {
  const permissionOkButton = idFromXPath(`
    /XCUIElementTypeApplication/XCUIElementTypeWindow[6]/XCUIElementTypeOther[2]/
    XCUIElementTypeAlert/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/
    XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/
    XCUIElementTypeButton
  `)
  const camera = idFromXPath(`
    /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
    XCUIElementTypeOther/XCUIElementTypeOther
  `)
  const titleId = idFromXPath(`
    /XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
    XCUIElementTypeStaticText
  `)

  try {
    await helper.screenshot()
    await driver
      .waitForVisible(permissionOkButton, 60000)
      .click(permissionOkButton)
  } catch (e) {
    await helper.screenshot()
    await helper.source()
  }

  try {
    await driver.waitForVisible(titleId, 60000)
    const title = await driver.getText(titleId)
    t.equal(title, 'Tipsi Barcode Scanner', 'Title is correct')

    await driver.waitForVisible(camera, 60000)
    t.pass('User should see barcode scanner view')
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
