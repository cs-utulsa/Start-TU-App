import React, {useState} from 'react';
import {Alert, Button, SafeAreaView, TextInput } from 'react-native';
import { Card } from 'react-native-paper'
import {useRoute} from '@react-navigation/native';
import { isPropertySignature } from 'typescript';
import { auth_request, retrieve_token} from '../api/Auth';

//npm install react-native-paper@5.0.0-rc.9

const STUDLOG_STATE = 0;
const GUESTLOG_STATE = 1;

interface LoginScreenInterface {
    navigation: any;
}

const LoginPage = (screenInterface: LoginScreenInterface) =>  {

    const [loginType, setLoginType] = useState(STUDLOG_STATE)

    const studentLogin = () => {
        setLoginType(STUDLOG_STATE);

        //Making the an authentication request to get an authentication code.
        //The user will enter their username and password in this request
        auth_request().then((code: string) => {

            //Use the authentication code to again call the azure server to obtain
            //an access code to use throughout the whole app.
            retrieve_token(code).then((access_token: string) => {
                screenInterface.navigation.navigate("main", {paramKey: [STUDLOG_STATE, access_token]});
            })
            
        });
    }

    const guestLogin = () => {
        setLoginType(GUESTLOG_STATE);
        screenInterface.navigation.navigate("main", {paramKey: [GUESTLOG_STATE, null]});
    }

    return(
        <SafeAreaView>
            <Card>
                <Card.Title title = "LOGIN PAGE"></Card.Title>
                <Card.Content>
                    <Button
                        onPress = {studentLogin}
                        title = "STUDENT LOGIN"
                    />
                    <Button
                        onPress = {guestLogin}
                        title = "GUEST LOGIN"
                    />
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
};

export default LoginPage;