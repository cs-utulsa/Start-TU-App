import axios, { AxiosRequestConfig } from 'axios';


type UserPaneData = {
    name: string
    email: string
}

export const get_profile_data = async (access_token: string): Promise<UserPaneData> => {
    return new Promise((resolve, reject) => {
        let url = 'https://graph.microsoft.com/v1.0/me'

        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        };

        axios.get(url, config)
             .then((response) => {
                const retrievedData: UserPaneData = {
                    name: response.data.givenName + ' ' + response.data.surname,
                    email: response.data.mail
                }
                resolve(retrievedData);
            })
             .catch((error) => {
                reject(error.message)
             })
        }
    )
}