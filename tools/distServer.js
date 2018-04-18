// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync';

/* eslint-disable no-console */


// Run Browsersync
browserSync({
  port: 4000,
  ui: {
    port: 4001
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ]
});
