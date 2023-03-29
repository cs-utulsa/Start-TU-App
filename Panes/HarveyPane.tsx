import harveyData from '../Database/HarveyData';
import {StyleSheet, View, Text} from 'react-native'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const calendar_styles = StyleSheet.create({
  agenda: {
    height: '100%', 
    width: '100%', 
    position: 'relative'
  }
});

const jsonSource = {
  html: "<p style='text-align:center;'>Placeholder for json data</p>"
};

export default function App() {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={width}
      source={jsonSource}
    />
  );
}