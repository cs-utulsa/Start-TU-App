import {View, Image} from 'react-native';

export const Header = () => {
    return(
        <View style={{paddingTop:20}}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../assets/TUlogonormal.png')}/>
        </View>
    )
}