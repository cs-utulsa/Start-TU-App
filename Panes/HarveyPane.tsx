import { harveyData } from "./Database";
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    App: {
        text-align: center;
    },
    harvey-class-container: {
        padding-left: 3em;
        padding-right: 3em;
        margin-top: 3em;
    }
})

export const Stocks = () => {
  return (
    <>
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
    </>
  );
};
