import {
    Button,
    TextField,
    Grid
    }
    from '@material-ui/core';
import * as React from 'react';
import * as qs from 'qs';
import axios from 'axios';
import './GetToken.css';

interface IGetTokenState {
    accessToken: string,
    expirationTime: number,
    refreshToken: string
}
const loginTitle = "Login with Yahoo! for Read Access";

const redirectUri = "https://lemon-dune-0cd4b231e.azurestaticapps.net";
const clientId = "dj0yJmk9QUJ2Yk1kQVdSbDZKJmQ9WVdrOVVXRmhXbGxtTm1zbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTM5";
const loginUrl = "https://api.login.yahoo.com/oauth2/request_auth?response_type=code&state=&client_id=" + clientId + "&scope=&redirect_uri=" + redirectUri;

export default class GetLink extends React.Component<any, IGetTokenState> {

    constructor(props: any) {
        super(props);

        this.state = {
            accessToken: "",
            expirationTime: new Date().getTime(),
            refreshToken: ""
        }
    }

    componentDidMount() {
        let queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
        if (queryParams.code) {
            window.history.pushState({}, document.title, "/");
            this.get_token(queryParams.code.toString());
        } else {
            let accessToken = localStorage.getItem("accessToken");
            let refreshToken = localStorage.getItem("refreshToken");
            const expirationTimeString = localStorage.getItem("expirationTime")
            if (expirationTimeString && accessToken && refreshToken) {
                let expirationTimeEpoch: number = Date.parse(expirationTimeString);
                if (expirationTimeEpoch < new Date().getTime()) {
                    this.refresh_token(refreshToken);
                } else {
                    this.setState({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        expirationTime: expirationTimeEpoch
                    });
                }
            }
        }
    }

    private get_token = (code: string) => {
        console.log("getting token");
        console.log(code);
        axios.get('/api/GetToken', {
            params: {
              yahoo_code: code
            }
        })
        .then( (response) => {
            console.log(response);
            this.updateTokenData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    private refresh_token = (refreshToken: string) => {
        // clear current state
        this.setState({
            accessToken: "",
            expirationTime: new Date().getTime(),
            refreshToken: ""
        });
        axios.get('/api/GetToken', {
            params: {
              refresh_token: refreshToken
            }
        })
        .then( (response) => {
            console.log(response);
            this.updateTokenData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    private updateTokenData = (tokenData: any) => {
        let expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + tokenData.expires_in);

        this.setState({
            accessToken: tokenData["access_token"],
            refreshToken: tokenData["refresh_token"],
            expirationTime: expirationTime.getTime()
        });
        localStorage.setItem("accessToken", tokenData["access_token"]);
        localStorage.setItem("refreshToken", tokenData["refresh_token"]);
        localStorage.setItem("expirationTime", expirationTime.toString());
    }

    public render() {
        if (this.state && this.state.expirationTime && this.state.refreshToken
            && this.state.expirationTime < new Date().getTime()) {
                this.refresh_token(this.state.refreshToken);
        }
        return (
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
                >
                <Button className="GetToken-login-button" variant="contained" color="primary" href={loginUrl}>
                    {loginTitle}
                </Button>
                <TextField
                    className="GetToken-text"
                    id="filled-multiline-flexible"
                    label="Access Token"
                    multiline
                    fullWidth
                    rows={10}
                    value={this.state.accessToken}
                    variant="filled"
                    />
            </Grid>
        );
    }
}