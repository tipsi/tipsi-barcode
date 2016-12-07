import test from 'tape-async'
import helper from './utils/helper'

const { driver, idFromXPath } = helper

test('Test if user can see barcode scanner', async (t) => {
  const camera = idFromXPath(`
    //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
    XCUIElementTypeOther/XCUIElementTypeOther
  `)
  const titleId = idFromXPath(`
    //XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/
    XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/
    XCUIElementTypeStaticText
  `)

  try {
    await driver.waitForVisible(titleId, 3000)
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
