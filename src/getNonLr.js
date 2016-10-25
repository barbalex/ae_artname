'use strict'

/* eslint no-console:0 */

module.exports = (db) => {
  console.log('fetching all objekte...')
  return db.viewAsync('artendb/objekte', { include_docs: true })
    .then((result) => {
      const objects = result.map((doc) => doc).filter(d => d.Gruppe !== 'Lebensräume')
      console.log(`received ${objects.length} non lr objects`)
      return objects
    })
    .catch((error) => {
      throw error
    })
}
