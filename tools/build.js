// More info on Webpack's Node API here: https://webpack.js.org/api/node/
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
const webpack = require('webpack');
const config = require('../webpack.config.prod')
// import {chalkError, chalkSuccess, chalkWarning, chalkProcessing} from './chalkConfig';

// process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.


webpack(config).run(() => {
  // if we got this far, the build succeeded.
  console.log(`Your app is compiled in ${process.env.NODE_ENV} mode`);

  return 0;
});
