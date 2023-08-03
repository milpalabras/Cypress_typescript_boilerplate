const { defineConfig } = require('cypress')
const { verifyDownloadTasks } = require('cy-verify-downloads')
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib')
const exec = require('child_process').execSync

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 1,
    openMode: 1,
  },
  viewportWidth: 1366,
  viewportHeight: 768,
  video: false,
  screenshotOnRunFailure: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      overwrite: true,
      reportPageTitle: 'Cypress Tests',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // Verifies that the file was downloaded correctly
      on('task', verifyDownloadTasks)
      // mocha awesome report
      require('cypress-mochawesome-reporter/plugin')(on)
      // mocha junit report
      on('after:run', async () => {
        console.log('override after:run')
        //if you are using other than Windows remove below line starts with await exec
        await exec('npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml')
        await afterRunHook()
      })
    },
    baseUrl: 'https://www.google.com/', // change this to your app's URL
  },
})
