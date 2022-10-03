"use strict";
exports.__esModule = true;
var expo_status_bar_1 = require("expo-status-bar");
var react_native_1 = require("react-native");
function App() {
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
