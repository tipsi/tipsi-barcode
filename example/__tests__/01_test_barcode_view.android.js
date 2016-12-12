import test from 'tape-async'
import helper from './utils/helper'

test('Test if user can see barcode scanner', async (t) => {
  try {
    t.pass('Android initial tests')
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})
