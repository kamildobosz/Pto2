import * as SQLite from 'expo-sqlite'
import dbConfig from '../dbConfig'

const db = SQLite.openDatabase(dbConfig.DB_NAME)

const getAllDiseases = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM BadaniaGenetyczne',
        [],
        (tx, results) => {
          const len = results.rows.length
          const rows = []
          for (let i = 0; i < len; i++) {
            rows.push(results.rows.item(i))
          }
          resolve(rows)
        },
        (error) => {
          console.error('Błąd podczas pobierania danych: ', error)
          reject(error)
        }
      )
    })
  })
}

const drepo = {
  getAllDiseases,
}

export default drepo
