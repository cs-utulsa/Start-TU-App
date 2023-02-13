import React from 'react';
import {Alert, Button, SafeAreaView, TextInput } from 'react-native';
import { Card } from 'react-native-paper'
import { isPropertySignature } from 'typescript';


//npm install react-native-paper@5.0.0-rc.9

interface LoginScreenInterface {
    navigation: any;
}

const LoginPage = (screenInterface: LoginScreenInterface) =>  {

    const pressLogin = () => screenInterface.navigation.navigate("main");

    return(
        <SafeAreaView>
            <Card>
                <Card.Title title = "LOGIN PAGE"></Card.Title>
                <Card.Content>
                    <TextInput placeholder = {"USERNAME"} placeholderTextColor={'black'}/>
                    <TextInput placeholder = {"PASSWORD"} placeholderTextColor={'black'}/>
                    <Button
                        onPress = {pressLogin}
                        title = "LOGIN"
                    />
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
};

export default LoginPage;