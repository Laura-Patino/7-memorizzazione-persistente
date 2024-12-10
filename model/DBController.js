import * as SQLite from 'expo-sqlite'; 

// Classe con dei metodi DINAMICI, devo creare un costruttore che inizializzi il db
export default class DBController { 
    constructor() {
        this.db = null; //inizializzo il db a null
    }

    //metodo di INIZIALIZZAZIONE e APERTURA DEL DB
    async openDB() { 
        this.db = await SQLite.openDatabaseAsync('usersDB'); //restituisce un oggetto DB
        console.log('DB opened');
        const query = "CREATE TABLE IF NOT EXISTS Users(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT);"; 
        try {
            await this.db.execAsync(query); //execAsync usata per creare tabelle
        } catch (error) {
            console.log('Error creating table: ' + error);
        }
    }
    
    // Come usare le query? 4 modi: execAsync, runAsync, getFirstAsync, getAllAsync
    async saveUser(name) {
        const query = "INSERT INTO Users (Name) VALUES (?);";
        await this.db.runAsync(query, name);
        /* try {
            const result = await this.db.runAsync(query, name);
            console.log(result.lastInsertRowId, result.changes);
        } catch (error) {
            console.log(error);
        } */
    }

    //per la lettura si usa: getFirstAsync e getAllAsync
    async getFirstUser() {
        const query = "SELECT * FROM Users";
        const result = await this.db.getFirstAsync(query);
        return result;
    }

    async getAllUsers() {
        const query = "SELECT * FROM Users";
        const result = await this.db.getAllAsync(query);
        return result;
    }

}