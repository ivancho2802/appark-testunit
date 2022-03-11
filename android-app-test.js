"use strict";

import 'babel-polyfill'
import 'colors'
import wd from 'wd'
import {assert} from 'chai'

const username = "mmachmar"
const apiKey = "87e3d3d8-beea-44f5-b0ed-1d7e905f46d1"
const deviceName = process.env.KOBITON_DEVICE_NAME || 'Galaxy*'

const kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: `${username}:${apiKey}`
}

const desiredCaps = {
  // The generated session will be visible to you only. 
  sessionName:        'Automation test session',
  sessionDescription: '',
  deviceOrientation:  'portrait',
  captureScreenshots: true,
  // The maximum size of application is 500MB
  // By default, HTTP requests from testing library are expired
  // in 2 minutes while the app copying and installation may
  // take up-to 30 minutes. Therefore, you need to extend the HTTP
  // request timeout duration in your testing library so that
  // it doesn't interrupt while the device is being initialized.
  app:                'kobiton-store:v356453',
  
  deviceGroup:        'KOBITON',
  // For deviceName, platformVersion Kobiton supports wildcard
  // character *, with 3 formats: *text, text* and *text*
  // If there is no *, Kobiton will match the exact text provided
  deviceName:         'Galaxy S20+ 5G',
  platformVersion:    '12',
  platformName:       'Android',
  //appPackage: 'com.scharfstein.apparksch'
  //appActivity: '.ApiDemos'
}

let driver

if (!username || !apiKey) {
  console.log('Error: Environment variables KOBITON_USERNAME and KOBITON_API_KEY are required to execute script')
  process.exit(1)
}

describe('Android App sample', function () {

  before(async () => {
    wd.configureHttp({
      timeout: 20 * 60000, // 20 mins
      retries: 3,
      retryDelay: 100
    })

    driver = wd.promiseChainRemote(kobitonServerConfig)

    driver.on('status', (info) => {
      console.log(info.cyan)
    })
    driver.on('command', (meth, path, data) => {
      console.log(' > ' + meth.yellow, path.grey, data || '')
    })
    driver.on('http', (meth, path, data) => {
      console.log(' > ' + meth.magenta, path, (data || '').grey)
    })

    try {
      await driver.init(desiredCaps)
      .setImplicitWaitTimeout(2000);
    }
    catch (err) {
      if (err.data) {
        console.error(`init driver: ${err.data}`)
      }
    throw err
    }
  })

  it('should show the app label', async () => {
    await driver.waitForElementByClassName("android.widget.TextView")
    .text().then(function(text) {
      assert.equal(text.toLocaleLowerCase(), text.toLocaleLowerCase())
    })
    //para test y obtener datos de l app

    let hasElementPhone = await driver.elementById("phone").isDisplayed()//@resource-id='android:id/tel'
    console.log("hasElementPhone", hasElementPhone)
    assert.equal(hasElementPhone, true)
    //verificar que el input phone exista

    let hasAcuraMDX = await driver.elementByXPath("//android.widget.TextView//*[@text='Ingresa tu teléfono móvil']").isDisplayed();
    console.log("hasIngresa", hasAcuraMDX)
    assert.equal(hasAcuraMDX, true)
    //este igualmente optener datos y verificar qe stoy en el login
  }); 

  after(async () => {
    if (driver != null) {
    try {
      await driver.quit()
    }
    catch (err) {
      console.error(`quit driver: ${err}`)
    }
  }
  })
})
