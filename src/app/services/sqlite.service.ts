import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@awesome-cordova-plugins/sqlite/ngx";

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  db!: SQLiteObject;

  constructor(private sqlite: SQLite) {  }
  
  setSqlite(db: SQLiteObject) {
    if (!this.db){
      this.db = db;
    }
  }

  // INICIALIZA LA BASE DE DATOS SQLITE
async createSqliteBase() {
  await this.sqlite.create({
    name: 'Sqlite.db',
    location: 'default'
  })
  .then((db) => {
   this.setSqlite(db);
  })
  .catch((error) => {
    console.error(error);
  });
  }

  // CREA LA TABLA DE FAVORITOS EN LA BASE DE DATOS SI NO EXISTE
  createTable(userId: string): Promise<any> {
    return this.db.executeSql(`CREATE TABLE IF NOT EXISTS ${userId} (fav_id INTEGER PRIMARY KEY AUTOINCREMENT, treatments varchar(255))`, [])
      .then(() => {
        console.log('Tabla creada correctamente');
      })
      .catch((error) => {
        console.error('Error al crear la tabla:', error);
      });
  }

  // AÑADE UN REGISTRO NUEVO DE FAVORITOS DEL USUARIO
  addFavorite(userId: string, treatment: string): Promise<any> {
    console.log(userId);
    return this.db.executeSql(`INSERT INTO "${userId}" (treatments) VALUES ("${treatment}")`, [])
      .then(() => {
        console.log('Registro de Favorito creado correctamente');
      })
      .catch((error) => {
        console.error('Error al crear el registro:', error);
      });
  }

  // DEVUELVE UN ARRAY CON LOS TRATAMIENTOS FAVORITOS
  getFavorites(userId: string): Promise<string[]> {
    return this.db.executeSql(`SELECT treatments FROM "${userId}"`, [])
      .then((res) => {
        const favoritos: string[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          favoritos.push(res.rows.item(i).treatments);
        }
        return favoritos;
      })
      .catch((error) => {
        console.error('Error al leer los favoritos:', error);
        return [];
      });
  }

  // ELIMINA UN TRATAMIENTO FAVORITO DE LA TABLA DE FAVORITOS
  deleteFavorite(userId: string, treatment: string): Promise<any> {
    return this.db.executeSql(`DELETE FROM "${userId}" WHERE treatments = "${treatment}"`, [])
      .then(() => {
        console.log('Registro de favorito eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar el registro:', error);
      });
  }

}
