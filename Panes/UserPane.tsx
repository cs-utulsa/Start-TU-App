import {View, Text, StyleSheet} from 'react-native';
import { LIGHT_BLUE } from '../constants/color_constants';

const UserPane = () => {
    return(
        <View style={styles.userPane}>
            <Text style={{fontSize: 50}}> Ben</Text>
            <Text style={{fontSize: 20}}> Benjamin Hughes </Text>
            <Text style={{fontSize: 5}}> {"\n"} </Text>
            <Text style={{fontSize: 20}}> bmh7113@utulsa.edu</Text>
            <Text style={{fontSize: 10}}> {"\n"} </Text>
            <Text style={{fontSize: 30}}> Bachelor of Science</Text>
            <Text style={{fontSize: 20}}> Major in Computer Science</Text>
            <Text style={{fontSize: 20}}> Minor in Spanish</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    userPane: {
        flex: 9,
        backgroundColor: LIGHT_BLUE,
    }
});