import {View, Image, StyleSheet} from 'react-native';
import { LIGHT_BLUE } from '../constants/color_constants';

const EmailPane = () => {
    return(
        <View style={styles.emailPane}>
            <Image style={{aspectRatio: 0.63, height: 595}} source={require('../assets/Outlook.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    emailPane: {
        flex: 9,
        backgroundColor: LIGHT_BLUE,
    }
});
  