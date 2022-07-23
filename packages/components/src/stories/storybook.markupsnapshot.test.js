import initStoryshots, { multiSnapshotWithOptions, Stories2SnapsConverter } from '@storybook/addon-storyshots'
import { useConfigFile } from '../../ci_cd/useConfigFileHelper'

useConfigFile(() => {
  initStoryshots({
    suite: 'markup storyshots',
    // this creates a *.snap.js for each *.stories.js I have
    test: multiSnapshotWithOptions(),
    // this tells storybook we're to look for stories (I have all mine in one folder) but as far as I know it searches down recursively from here
    stories2snapsConverter: new Stories2SnapsConverter({
      // This puts all my *.snaps.js in a __snapshots__ folder next to my stories folder, the default is to have them next to the *.stories.js files themselves
      snapshotsDirName: '__snapshots__'
    })
  })
})
