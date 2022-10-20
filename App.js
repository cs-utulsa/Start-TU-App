"use strict";
exports.__esModule = true;
var expo_status_bar_1 = require("expo-status-bar");
var react_native_1 = require("react-native");
var TU_DB_1 = require("./Database/TU_DB");
function App() {
    var databasePath = "";
    var databaseName = "";
    (0, TU_DB_1.openDatabaseFromLocalMachine)(databasePath, databaseName).then(function (db) {
        db.transaction(function (tx) {
            var sqlCommand = "CREATE TABLE IF NOT EXISTS Person"
                + "("
                + "TU_Email VARCHAR(18) PRIMARY KEY NOT NULL"
                + ", Name VARCHAR(30)"
                + ", Password VARCHAR(30)"
                + ");";
            tx.executeSql(sqlCommand);
        }, function (test) {
            console.log(test.message);
        }, function () {
            console.log('Success');
        });
    });
    console.log(databasePath);
    console.log(databaseName);
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text>Start of TU APP. This is our senior project for 2022-2023.</react_native_1.Text>
      <expo_status_bar_1.StatusBar style="auto"/>
    </react_native_1.View>);
}
exports["default"] = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
