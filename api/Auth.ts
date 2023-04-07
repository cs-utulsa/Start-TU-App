import axios, { AxiosRequestConfig } from 'axios';
import * as AuthSession from 'expo-auth-session';

import {Client_Id, Tenant_Id} from '../creds'


export const auth_request = async (): Promise<string> => {

    return new Promise((resolve, reject) => {
        const callback_url = 'msauth.com.example.StartTU://auth'

        let url = 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize?' + 
                'client_id={client}' + 
                '&response_type=code' + 
                '&redirect_uri={callback}' +
                '&response_mode=query' + 
                '&scope=.default'

        url = url.replace('{tenant}', Tenant_Id)
                 .replace('{client}', Client_Id)
                 .replace('{callback}', callback_url)

        AuthSession.startAsync({
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

        })
        .catch((error) => {
                reject(error);
            }
        );
    })
};

export const retrieve_token = async (auth_code: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const callback_url = 'msauth.com.example.StartTU://auth'

        let url = 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token'

        url = url.replace('{tenant}', Tenant_Id)

        const requestBody = new URLSearchParams();
        requestBody.append('grant_type', 'authorization_code');
        requestBody.append('code', auth_code);
        requestBody.append('client_id', Client_Id)
        requestBody.append('redirect_uri', callback_url)

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        axios.post(url, requestBody.toString(), config)
        .then(response => {
            resolve(response.data.access_token)
        })
        .catch(error => {
            reject(error.response.data.error_description)
        });
    })
}
