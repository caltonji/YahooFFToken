import {
    Link,
    TextField
    }
    from '@material-ui/core';
import * as React from 'react';
import * as qs from 'qs';
import axios from 'axios';

interface IGetTokenState {
    token: string
}

const loginTitle = "Login with Yahoo! for Read Access";
const loginUrl = "https://api.login.yahoo.com/oauth2/request_auth_fe?response_type=code&state=&client_id=dj0yJmk9QUJ2Yk1kQVdSbDZKJmQ9WVdrOVVXRmhXbGxtTm1zbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTM5&scope=&redirect_uri=https://localhost:3000";
const clientId = "dj0yJmk9QUJ2Yk1kQVdSbDZKJmQ9WVdrOVVXRmhXbGxtTm1zbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTM5";
const clientSecret = "secret";
const getTokenUrl = "https://api.login.yahoo.com/oauth2/get_token?client_id=" + clientId + "&client_secret=" + clientSecret + "&grant_type=authorization_code&code=gkthgdm&redirect_uri=https://localhost:3000";
const tokenUrl = "https://api.login.yahoo.com/oauth2/get_token";
// headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
// },
const redirectUri = "https://localhost:3000";

export default class GetLink extends React.Component<any, IGetTokenState> {

    constructor(props: any) {
        super(props);
        let queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
        if (queryParams.code) {
            this.get_token(queryParams.code.toString());
        }
        
        this.state = {
            token: "blah"
        };
    }

    private get_token = (code: string) => {
        console.log("getting token");
        console.log(code);
        axios.post("https://api.login.yahoo.com/oauth2/get_token",
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: redirectUri,
                    client_id: clientId,
                    client_secret: clientSecret
                }
            })
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    console.log(res.data);
                    console.log(res.data["access_token"])
                } else {
                    console.log("Failed get token: " + res);
                }
            });
    }

    public render() {
        return (
            <div>
                <Link
                    href={loginUrl}>{loginTitle}</Link>
                <Link
                    href={getTokenUrl}>{getTokenUrl}</Link>
                <TextField
                    id="filled-multiline-flexible"
                    label="Multiline"
                    multiline
                    rowsMax={4}
                    value={this.state.token}
                    variant="filled"
                    />
            </div>
        );
    }
}