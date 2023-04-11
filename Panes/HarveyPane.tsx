import harveyData from '../Database/HarveyData';
import {StyleSheet, View, Text} from 'react-native';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function List() {
  const harveyList = harveyData.map(key =>
    <li>{key.class + ", " + key.building + ", " + key.time}</li>
  );
  return <ul>{harveyList}</ul>;
}