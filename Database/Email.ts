import * as SQLite from 'expo-sqlite'
import {db_name} from './DB_Name';

class Email_Entity {
    DB: SQLite.WebSQLDatabase;

    constructor(database_name: string) {
        this.DB = SQLite.openDatabase(database_name);
    }
}