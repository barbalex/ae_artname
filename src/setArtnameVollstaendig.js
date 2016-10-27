'use strict'

const _ = require(`lodash`)

module.exports = (db, objects) => {
  const objectsToSave = []
  objects.forEach((object) => {
    if (object.Taxonomie && object.Taxonomie.Eigenschaften) {
      const eig = object.Taxonomie.Eigenschaften
      let artnameVollstaendig
      switch (object.Gruppe) {
        case `Flora`:
          artnameVollstaendig = `${eig.Gattung}${eig.Art ? ` ${eig.Art}` : ``}${eig.Autor ? ` ${eig.Autor}` : ``}${eig[`Unterart Name`] ? ` subsp. ${eig[`Unterart Name`]}${eig[`Unterart Autor`] ? ` ${eig[`Unterart Autor`]}` : ``}` : ``}${eig[`Name Deutsch`] ? ` (${eig[`Name Deutsch`]})` : ``}`
          break
        case `Fauna`:
        case `Moose`:
          artnameVollstaendig = `${eig.Gattung}${eig.Art ? ` ${eig.Art}` : ``}${eig.Autor ? ` ${eig.Autor}` : ``}${eig.Unterart ? ` subsp. ${eig.Unterart}${eig[`Unterart Autor`] ? ` ${eig[`Unterart Autor`]}` : ``}` : ``}${eig[`Name Deutsch`] ? ` (${eig[`Name Deutsch`]})` : ``}`
          break
        case `Macromycetes`:
          artnameVollstaendig = `${eig.Gattung}${eig.Art ? ` ${eig.Art}` : ``}${eig.Autor ? ` ${eig.Autor}` : ``}${eig[`Name Deutsch`] ? ` (${eig[`Name Deutsch`]})` : ``}`
          break
        default:
          artnameVollstaendig = `${eig.Gattung}${eig.Art ? ` ${eig.Art}` : ``}${eig.Autor ? ` ${eig.Autor}` : ``}${eig[`Name Deutsch`] ? ` (${eig[`Name Deutsch`]})` : ``}`
      }
      if (object.Taxonomie.Eigenschaften[`Artname vollständig`] && object.Taxonomie.Eigenschaften[`Artname vollständig`] !== artnameVollstaendig) {
        object.Taxonomie.Eigenschaften[`Artname vollständig`] = artnameVollstaendig
        objectsToSave.push(object)
      }
    }
  })
  const objectArraysToSave = _.chunk(objectsToSave, 20)
  return Promise.all(objectArraysToSave.map(objectArray => db.saveAsync(objectArray)))
}
