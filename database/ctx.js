import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";
import dbConfig from "./dbConfig";

async function openDatabase() {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require("../assets/SQlite/vectiopto.db")).uri, // nie da się z configu wziąć nazwy bo w trakcie kompilacji musi już znać ścieżkę
    FileSystem.documentDirectory + `SQLite/${dbConfig.DB_NAME}`
  );

  return SQLite.openDatabase(dbConfig.DB_NAME);
}

const initDB = async () => {
  await openDatabase();
};

export { initDB };
