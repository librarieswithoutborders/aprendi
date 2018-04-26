# Aprendi

Aprendi is a tool built by Libraries Without Borders to help communities curate local resources in a dynamic, reliable, and relevant fashion.

The live site can be found at [https://www.aprendi.org/](https://www.aprendi.org/).

This repo contains the client app code, the backend codebase can be found [here](https://github.com/librarieswithoutborders/aprendi-server/)

## Requirements

For development, you will need [Node.js](http://nodejs.org/) installed in your environment and an environment file from the project administrator.

---

## Install

    $ git clone https://github.com/librarieswithoutborders/aprendi.git
    $ cd aprendi
    $ npm install
    
You will also need to request an environment file from the project administrators and have the [backend server](https://github.com/librarieswithoutborders/aprendi/) running

### Development: Start/Watch/Eslint

    $ npm run dev

### Development: Test Local Build for Production

    $ npm run build
    
### Production Deployment

  See [Deployment Page](https://github.com/librarieswithoutborders/aprendi/wiki/Deployment) in Wiki

---

## Languages & tools

- [Webpack](https://webpack.js.org/)

### HTML

- [EJS](http://ejs.co/) + [Webpack HTML Plugin](https://webpack.js.org/plugins/html-webpack-plugin/) to generate base html file

### JavaScript

- [ESlint](https://eslint.org/)
- [Babel](https://babeljs.io/)
- [React](http://facebook.github.io/react)
- [Redux](https://redux.js.org/)

### CSS

- [SCSS](https://sass-lang.com/)

_Autoprefixer_ is included and use [caniuse.com](http://caniuse.com/) database to avoid outdated prefixes.

---

## Project Structure

- **tools/** : lint, build, and deployment tools
- **src/** : app source code
  - **actions/** : action creators split out by content type
  - **components/** : React components below the page-level
    - **admin-components/** : Admin components
    - **sitewide-components/** : Non-admin components
  - **pages/** : React page-level components
  - **reducers/** : reducers split out by content type
  - **static/** : images and svg files
  - **styles/** : scss files
    - **base/** : document-level styles
    - **components/** : component styles
    - **mixins/** : breakpoint and text mixins
    - **variables/** : breakpoint, color, etc. variables
    - **index.scss** : entry point for scss files
  - **utils/** : helper functions for input validation/processing, etc.
  - **constants.js** : editor constants
  - **index.ejs** : template processed by webpack to generate html entrypoint
  - **index.js** : js entry point, imports styles from /styles/index.scss
  - **routes.js** : routes for react-router
  - **store.js** : redux store
  
