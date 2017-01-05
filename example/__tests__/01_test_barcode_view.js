import test from 'tape-async'
import helper from './utils'

const { driver, elements } = helper

test('Test if user can see barcode scanner', async (t) => {
  const screen = elements()

  try {
    await driver
      .waitForVisible(screen.openScannerButton, 60000)
      .click(screen.openScannerButton)

    try {
      await driver
        .waitForVisible(screen.permissionOkButton, 10000)
        .click(screen.permissionOkButton)
    } catch (e) {
      // Do nothing. Permissions granted
    }

    await driver.waitForVisible(screen.title, 10000)
    const title = await driver.getText(screen.title)
    t.equal(title, 'Tipsi Barcode Scanner', 'Title is correct')

    await driver.waitForVisible(screen.camera, 10000)
    t.pass('User should see barcode scanner view')

    await driver.waitForVisible(screen.galleryButton, 10000)
    t.pass('User should see gallery button')
  } catch (error) {
    await helper.screenshot()
    await helper.source()
  }
})
