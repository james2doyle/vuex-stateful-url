const jsonURL = require('json-url')('lzw');

/**
 * StatefulURL is a Vuex plugin that can read and write the state from a query string
 *
 * @param {Object} config = {}
 * @param {String} config.key the query string value to sync the state
 *
 * @returns {Function<void>|void}
 */
function StatefulURL (config = {}) {
  // bail if not in a browser or missing features
  if (typeof window === 'undefined' && typeof window.URLSearchParams === 'function') {
    return;
  }

  const key = config.key || 'state';
  const search = new window.URLSearchParams(window.location.search);
  const urlState = Object.fromEntries(search.entries()).state || null;

  /**
   * Store plugin
   *
   * @param {Object} store
   */
  return function (store) {
    if (urlState) {
      jsonURL
        .decompress(urlState)
        .then((json) => {
          try {
            Object.entries(json)
              .forEach(([prop, value]) => {
                store.state[prop] = value;
              });
          } catch (e) {}
        });
    }

    store.subscribe((mutation, state) => {
      const search = new window.URLSearchParams(window.location.search);

      jsonURL
        .compress(state)
        .then((currentState) => {
          search.set(key, currentState);
          const url = new URL(window.location.href);
          url.search = '?' + search.toString();

          const path = url.toString();

          window.history.replaceState({ path }, document.title, path);
        });
    });
  };
};

module.exports = StatefulURL;
