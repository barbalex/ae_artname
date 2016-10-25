/* eslint no-console:0 */

'use strict'

const Promise = require('bluebird')
const cradle = Promise.promisifyAll(require('cradle'))
const couchPass = require('./couchPass.json')
const connection = new (cradle.Connection)('127.0.0.1', 5984, {
  auth: {
    username: couchPass.user,
    password: couchPass.pass
  }
})
const db = connection.database('artendb')
const setArtnameVollstaendig = require('./src/setArtnameVollstaendig.js')
const getNonLr = require('./src/getNonLr.js')


getNonLr(db)
  .then((objects) => setArtnameVollstaendig(db, objects))
  .then(() => {
    console.log('Artname vollständig aktualisiert!')
  })
  .catch((error) => console.log('index.js error:', error))
