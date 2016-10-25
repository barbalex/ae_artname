/* eslint no-console:0, max-len:0, prefer-arrow-callback:0, func-names:0 */
'use strict'

module.exports = (db, objects) =>
  new Promise((resolve, reject) => {
    const objectsToSave = []

    objects.forEach((object) => {
      if (object.Taxonomie && object.Taxonomie.Eigenschaften) {
        const eig = object.Taxonomie.Eigenschaften
        let artnameVollstaendig
        switch (object.Gruppe) {
          case 'Flora':
            artnameVollstaendig = `${eig.Gattung} ${eig.Art}${eig.Autor ? ` ${eig.Autor}` : ''} ${eig.Art}${eig['Unterart Name'] ? ` subsp. ${eig['Unterart Name']}${eig['Unterart Autor'] ? ` ${eig['Unterart Autor']}` : ''}` : ''}${eig.NameDeutsch ? ` (${eig.NameDeutsch})` : ''}`
            break
          case 'Fauna':
          case 'Moose':
            artnameVollstaendig = `${eig.Gattung} ${eig.Art}${eig.Autor ? ` ${eig.Autor}` : ''} ${eig.Art}${eig.Unterart ? ` subsp. ${eig.Unterart}${eig['Unterart Autor'] ? ` ${eig['Unterart Autor']}` : ''}` : ''}${eig.NameDeutsch ? ` (${eig.NameDeutsch})` : ''}`
            break
          case 'Macromycetes':
            artnameVollstaendig = `${eig.Gattung} ${eig.Art}${eig.Autor ? ` ${eig.Autor}` : ''}${eig.NameDeutsch ? ` (${eig.NameDeutsch})` : ''}`
            break
          default:
            artnameVollstaendig = `${eig.Gattung} ${eig.Art}${eig.Autor ? ` ${eig.Autor}` : ''}${eig.NameDeutsch ? ` (${eig.NameDeutsch})` : ''}`
        }
        object.Taxonomie.Eigenschaften['Artname vollständig'] = artnameVollstaendig
        objectsToSave.push(object)
      } else {
        console.error('no object.Taxonomie.Eigenschaften found for object:', object)
      }
    })

    if (objectsToSave.length === 0) {
      console.log('0 names updated')
      return resolve()
    }
    db.saveAsync(objectsToSave)
      .then(() => {
        console.log(`${objectsToSave.length} names updated`)
        resolve()
      })
      .catch((error) => {
        console.error('insertNewCscfProperties error:', error)
        reject()
      })
  })
