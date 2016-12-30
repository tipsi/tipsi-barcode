import test from 'tape-async'
import helper from './utils'

const { driver, elements } = helper

test('Test if user can see barcode scanner', async (t) => {
  const screen = elements()

  try {
    await driver
      .waitForVisible(screen.permissionOkButton, 60000)
      .click(screen.permissionOkButton)
  } catch (e) {
    await helper.screenshot()
    await helper.source()
  }

  try {
    await driver.waitForVisible(screen.title, 60000)
    const title = await driver.getText(screen.title)
    t.equal(title, 'Tipsi Barcode Scanner', 'Title is correct')

    await driver.waitForVisible(screen.camera, 60000)
    t.pass('User should see barcode scanner view')
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
