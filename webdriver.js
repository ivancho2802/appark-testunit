
var webdriverKobitonServerConfig = {
    protocol: 'https',
    host: 'api.kobiton.com',
    auth: 'mmachmar:87e3d3d8-beea-44f5-b0ed-1d7e905f46d1'
  }
  
  var desiredCaps = {
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
    app:                'kobiton-store:v354937',
    
    deviceGroup:        'KOBITON',
    // For deviceName, platformVersion Kobiton supports wildcard
    // character *, with 3 formats: *text, text* and *text*
    // If there is no *, Kobiton will match the exact text provided
    deviceName:         'Google Pixel 6',
    platformVersion:    '12',
    platformName:       'Android'
  } 
  