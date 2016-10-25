/* eslint no-console:0, max-len:0, prefer-arrow-callback:0, func-names:0, no-underscore-dangle */
'use strict'

module.exports = (db, objects) => {
  const savePromises = objects.map((object) => {
    if (object.Taxonomie && object.Taxonomie.Eigenschaften) {
      const eig = object.Taxonomie.Eigenschaften
      let artnameVollstaendig
      switch (object.Gruppe) {
        case `Flora`:
          artnameVollstaendig = `${eig.Gattung} ${eig.Art}${eig.Autor ? ` ${eig.Autor}` : ``} ${eig.Art}${eig[`Unterart Name`] ? ` subsp. ${eig[`Unterart Name`]}${eig[`Unterart Autor`] ? ` ${eig[`Unterart Autor`]}` : ``}` : ``}${eig.NameDeutsch ? ` (${eig.NameDeutsch})` : ``}`
          break
        case `Fauna`:
        case `Moose`:
          artnameVollstaendig = `${eig.Gattung} ${eig.Art}${eig.Autor ? ` ${eig.Autor}` : ``} ${eig.Art}${eig.Unterart ? ` subsp. ${eig.Unterart}${eig[`Unterart Autor`] ? ` ${eig[`Unterart Autor`]}` : ``}` : ``}${eig.NameDeutsch ? ` (${eig.NameDeutsch})` : ``}`
          break
        case `Macromycetes`:
          artnameVollstaendig = `${eig.Gattung} ${eig.Art}${eig.Autor ? ` ${eig.Autor}` : ``}${eig.NameDeutsch ? ` (${eig.NameDeutsch})` : ``}`
          break
        default:
          artnameVollstaendig = `${eig.Gattung} ${eig.Art}${eig.Autor ? ` ${eig.Autor}` : ``}${eig.NameDeutsch ? ` (${eig.NameDeutsch})` : ``}`
      }
      object.Taxonomie.Eigenschaften[`Artname vollständig`] = artnameVollstaendig
      return db.saveAsync(object._id, object._rev, object)
    }
    return new Error(`no object.Taxonomie.Eigenschaften found for object: ${object}`)
  })

  return Promise.all(savePromises)
}
