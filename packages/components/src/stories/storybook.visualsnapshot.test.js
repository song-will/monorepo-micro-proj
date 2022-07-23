import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'
import { useConfigFile } from '../../ci_cd/useConfigFileHelper'
import path from 'path'

useConfigFile((config) => {
  const getScreenshotOptions = ({ context, url }) => {
    return {
      encoding: 'binary', // encoding: 'base64' is a property required by puppeteer
      fullPage: false // Do not take the full page screenshot. Default is 'true' in Storyshots.,
    }
  }

  // Function to customize the snapshot location
  const getMatchOptions = ({ context: { fileName } }) => {
    // Generates a custom path based on the file name and the custom directory.
    const snapshotPath = path.join(path.resolve(__dirname), path.dirname(fileName), '__image_snapshots__')
    return { customSnapshotsDir: snapshotPath }
  }
  initStoryshots({
    suite: 'Image storyshots',
    test: imageSnapshot({
      storybookUrl: `file://${path.resolve(__dirname, '../../storybook-static')}`,
      getScreenshotOptions,
      getMatchOptions
    })
  })
})
