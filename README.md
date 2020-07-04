# Vuex StatefulURL

> StatefulURL is a Vuex plugin that can read and write the state from a query string

## Demo

![demo.gif](demo.gif)

They way it works is that it detects state changes and syncs a compressed object to a query string.

## Installation

* `npm install --save vuex-stateful-url`

```js
// es6
// import StatefulURL from 'vuex-stateful-url';
// commonjs
const StatefulURL = require('vuex-stateful-url');

export default new Vuex.Store({
  // ...
  plugins: [
    // your other plugins...
    StatefulURL()
  ],
  // ...
});
```

## Options

* `config.key`: the query string value to sync the state. default = `"state"` *(?state=blablabla)*

## License

[LICENSE](LICENSE)
