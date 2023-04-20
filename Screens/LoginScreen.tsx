import React, {useState} from 'react';
import {Alert, Button, SafeAreaView, TextInput } from 'react-native';
import { Card } from 'react-native-paper'
import {useRoute} from '@react-navigation/native';
import { isPropertySignature } from 'typescript';


//npm install react-native-paper@5.0.0-rc.9

const STUDLOG_STATE = 0;
const GUESTLOG_STATE = 1;
const FACILITATOR_STATE = 2;

interface LoginScreenInterface {
    navigation: any;
}

const LoginPage = (screenInterface: LoginScreenInterface) =>  {

    const [loginType, setLoginType] = useState(STUDLOG_STATE)

    const studentLogin = () => {
        setLoginType(STUDLOG_STATE);
        console.log(loginType);
        screenInterface.navigation.navigate("main", {paramKey: 0});
    }

    const guestLogin = () => {
        setLoginType(GUESTLOG_STATE);
        console.log(loginType);
        screenInterface.navigation.navigate("main", {paramKey: 1});

    }

    const facilitatorLogin = () => {
        setLoginType(FACILITATOR_STATE);
        console.log(loginType);
        screenInterface.navigation.navigate("main", {paramKey: 2});
    }

    return(
        <SafeAreaView>
            <Card>
                <Card.Title title = "LOGIN PAGE"></Card.Title>
                <Card.Content>
                    <TextInput placeholder = {"USERNAME"} placeholderTextColor={'black'}/>
                    <TextInput placeholder = {"PASSWORD"} placeholderTextColor={'black'}/>
                    <Button
                        onPress = {studentLogin}
                        title = "STUDENT LOGIN"
                    />
                    <Button
                        onPress = {guestLogin}
                        title = "GUEST LOGIN"
                    />
                    <Button
                        onPress = {facilitatorLogin}
                        title = "ADMIN LOGIN"
                    />
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
};

export default LoginPage;