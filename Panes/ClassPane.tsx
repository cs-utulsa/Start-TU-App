import {View, Image, StyleSheet} from 'react-native';
import { LIGHT_BLUE } from '../constants/color_constants';

const ClassesPane = () => {
    return(
        <View style={styles.classesPane}>
            <Image style={{aspectRatio: 0.63, height: 595}} source={require('../assets/Harvey.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    classesPane: {
        flex: 9,
        backgroundColor: LIGHT_BLUE,
    }
});