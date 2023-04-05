import axios from 'axios';
import * as AuthSession from 'expo-auth-session';

import {Client_Id, Tenant_Id, StartTU_Secret_Value} from '../creds'
import * as Application from 'expo-application';



export const auth_request = async (): Promise<string> => {

    return new Promise((resolve, reject) => {
        const callback_url = AuthSession.makeRedirectUri({ scheme: 'com.example.StartTU', path: 'auth' })

        let url = 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize?' + 
                'client_id={client}' + 
                '&response_type=code' + 
                '&redirect_uri={callback}/code' +
                '&response_mode=query' + 
                '&scope=user.read%20mail.readwrite'

        url = url.replace('{tenant}', Tenant_Id).replace('{client}', Client_Id).replace('{callback}', callback_url)

  
        let authResponse = AuthSession.startAsync({
            authUrl:    url,
            returnUrl:   callback_url
        })
        .then((authResponse ) => { 
            //Conditional if the user proceeds with the authentication process
            if (authResponse.type === "success") { 
          
            //Return the error and the response.
            if (authResponse.params["error"] ) {

                reject(authResponse.params.error);
            } 
            else {
                //If authentication is successful, get the authorization code from the token
                resolve(authResponse.params.code);
            }

          }
          //Else if the user has decline continuing further with authentication.
          else {  
            reject('User declining further continuing');
          } 

        }).catch((error) => {
                reject(error);
            }
        );
    })
};

export const retrieve_token = async (auth_code: string) => {
    console.log('CALLING INSIDE retrieve_token')
    console.log(auth_code)
    const callback_url = AuthSession.makeRedirectUri({ scheme: 'com.example.StartTU', path: 'auth' })

    let url = 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token?' + 
}