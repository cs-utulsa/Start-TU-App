const harveyData = require('./Database/HarveyData.json');
import {StyleSheet, View, Text} from 'react-native'

const calendar_styles = StyleSheet.create({
  agenda: {
    height: '100%', 
    width: '100%', 
    position: 'relative'
  }
});

export const Stocks = () => {
  return (
    <View 
      <div className="harvey-class-container">
        {harveyData.map((data, key) => {
          return (
            <div key={key}> {
              data.className +
                " , " + data.building +
                " ," + data.time
              }
            </div>
          );
        })}
      </div>
    </View>
  );
};
