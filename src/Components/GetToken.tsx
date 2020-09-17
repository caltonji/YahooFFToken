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
    expirationTime: Date,
    refreshToken: string
}
const loginTitle = "Login with Yahoo! for Read Access";

const redirectUri = "https://lemon-dune-0cd4b231e.azurestaticapps.net";
const clientId = "dj0yJmk9QUJ2Yk1kQVdSbDZKJmQ9WVdrOVVXRmhXbGxtTm1zbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTM5";
const loginUrl = "https://api.login.yahoo.com/oauth2/request_auth?response_type=code&state=&client_id=" + clientId + "&scope=&redirect_uri=" + redirectUri;

export default class GetLink extends React.Component<any, IGetTokenState> {

    constructor(props: any) {
        super(props);
        let queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
        if (queryParams.code) {
            this.get_token(queryParams.code.toString());
        }

        this.state = {
            accessToken: "",
            expirationTime: new Date(),
            refreshToken: ""
        }
    }

    componentDidMount() {
        let queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
        if (queryParams.code) {
            this.get_token(queryParams.code.toString());
        }
    }

    private get_token = (code: string) => {
        console.log("getting token");
        console.log(code);
        axios.get('/api/GetToken', {
            params: {
              code: code
            },
            baseURL: redirectUri
        })
        .then( (response) => {
            console.log(response);
            const tokenData = {
                "access_token": "h92fa8XOvV.0A4nR2AR2CN7jhNnBtnMRKuNNXRM9Uz6Re7Obz_.3mJf6vXWgL1rH10p24Mt_PbiW8BH7URaM8MCYL_WZ_ME842BeELJf.TyvzYMO1mR2epNjdVzRQwm1aXojRSnqgBb0IZp4VnE_d5XHnowrAcAFGS0QagNqYbjhBW2YAsPPV2Q_qNOSJEyyWPzTC_dTgPmsIKEenVLHlg1q_B5h29qKMGiO1NyXkc7EX3jjIVjTsHUf2YAT0D5tSmFCsrEIYwgNXejWiTfjCTAAsn55sc5WG0Af38q13Fykq8izy9dDes62KaqUFjOMrzKLn9wBzaPWJ47Oxn9EgRw1rdKeQbhKxyAvhOMm7xuT2UUSgnEypk1IP9Jk8o8dRuocUHPRvSbegno5AjzFoAfyJIPhrP65pKNHgBGPSOaXMkNJlssxKjH3ON2E.CiTgV5iZoeyt9CXja_338WUoaMiyvhfnulJEdov_dxIMxaiydaxEmpc_8okuBOftDyMgE_LU3Vi0BAzTEa7SGYpcjMJ6Cu4WGVFUKm93p6UWu9i2AXhdVlV.mm9Twz0zln_fZLXVKc88XvkjXBPVBYxtqlYWQ_gQpXnPgEAeggK80v3HXbx3A2jES.xq5QUacnYSTUTRPPAjfoIiAWKG6g3QRS4Earz7WswXlWBT.P3qVbZ0Sd6RvdRrSh_cKtQRADv_ZG3nxkaSWmeTJOqR7GnIMxWb.DcvAlVprh8pIWCJ66VqHawyFxfMzL5H8PG8BlBKRO5AfsMVQ9w9Yqlx3wSOJNb.78GTcwzH.1O4UAJDSCmfHI9OVi9fOtmQ.ajTGLRcIiIheRim9wnV99xq7SjH4JeVE8AvXrJUmq_.6UO0Fe04uc5KrpDaGLMY7LcAk02bDEJNE9S5BYYgf8A5wGCvnvejw1EudGkz.sjPw44TCz16lFc45JEufFAljAOyL6_c4gczPF_6yHCuarZ1TJPBxFXmtRjPtQJcQ--",
                "refresh_token": "AJEDY1.2BMRVY4Zo3i_yu9LgcPJbpn.WPxdK5ma89f8TMRv0JWA-",
                "expires_in": 3600,
                "token_type": "bearer",
                "xoauth_yahoo_guid": "IYYZECV4YYWC3AQYEQPY3VSN6M"
            };
            this.updateTokenData(tokenData);
        })
        .catch(function (error) {
            console.log(error);
        });
        const tokenData = {
            "access_token": "h92fa8XOvV.0A4nR2AR2CN7jhNnBtnMRKuNNXRM9Uz6Re7Obz_.3mJf6vXWgL1rH10p24Mt_PbiW8BH7URaM8MCYL_WZ_ME842BeELJf.TyvzYMO1mR2epNjdVzRQwm1aXojRSnqgBb0IZp4VnE_d5XHnowrAcAFGS0QagNqYbjhBW2YAsPPV2Q_qNOSJEyyWPzTC_dTgPmsIKEenVLHlg1q_B5h29qKMGiO1NyXkc7EX3jjIVjTsHUf2YAT0D5tSmFCsrEIYwgNXejWiTfjCTAAsn55sc5WG0Af38q13Fykq8izy9dDes62KaqUFjOMrzKLn9wBzaPWJ47Oxn9EgRw1rdKeQbhKxyAvhOMm7xuT2UUSgnEypk1IP9Jk8o8dRuocUHPRvSbegno5AjzFoAfyJIPhrP65pKNHgBGPSOaXMkNJlssxKjH3ON2E.CiTgV5iZoeyt9CXja_338WUoaMiyvhfnulJEdov_dxIMxaiydaxEmpc_8okuBOftDyMgE_LU3Vi0BAzTEa7SGYpcjMJ6Cu4WGVFUKm93p6UWu9i2AXhdVlV.mm9Twz0zln_fZLXVKc88XvkjXBPVBYxtqlYWQ_gQpXnPgEAeggK80v3HXbx3A2jES.xq5QUacnYSTUTRPPAjfoIiAWKG6g3QRS4Earz7WswXlWBT.P3qVbZ0Sd6RvdRrSh_cKtQRADv_ZG3nxkaSWmeTJOqR7GnIMxWb.DcvAlVprh8pIWCJ66VqHawyFxfMzL5H8PG8BlBKRO5AfsMVQ9w9Yqlx3wSOJNb.78GTcwzH.1O4UAJDSCmfHI9OVi9fOtmQ.ajTGLRcIiIheRim9wnV99xq7SjH4JeVE8AvXrJUmq_.6UO0Fe04uc5KrpDaGLMY7LcAk02bDEJNE9S5BYYgf8A5wGCvnvejw1EudGkz.sjPw44TCz16lFc45JEufFAljAOyL6_c4gczPF_6yHCuarZ1TJPBxFXmtRjPtQJcQ--",
            "refresh_token": "AJEDY1.2BMRVY4Zo3i_yu9LgcPJbpn.WPxdK5ma89f8TMRv0JWA-",
            "expires_in": 3600,
            "token_type": "bearer",
            "xoauth_yahoo_guid": "IYYZECV4YYWC3AQYEQPY3VSN6M"
        };
        this.updateTokenData(tokenData);
    }

    private refresh_token = () => {
        axios.get('/api/GetToken', {
            params: {
              refresh_token: this.state.refreshToken
            }
        })
        .then( (response) => {
            console.log(response);
            const tokenData = {
                "access_token": "h92fa8XOvV.0A4nR2AR2CN7jhNnBtnMRKuNNXRM9Uz6Re7Obz_.3mJf6vXWgL1rH10p24Mt_PbiW8BH7URaM8MCYL_WZ_ME842BeELJf.TyvzYMO1mR2epNjdVzRQwm1aXojRSnqgBb0IZp4VnE_d5XHnowrAcAFGS0QagNqYbjhBW2YAsPPV2Q_qNOSJEyyWPzTC_dTgPmsIKEenVLHlg1q_B5h29qKMGiO1NyXkc7EX3jjIVjTsHUf2YAT0D5tSmFCsrEIYwgNXejWiTfjCTAAsn55sc5WG0Af38q13Fykq8izy9dDes62KaqUFjOMrzKLn9wBzaPWJ47Oxn9EgRw1rdKeQbhKxyAvhOMm7xuT2UUSgnEypk1IP9Jk8o8dRuocUHPRvSbegno5AjzFoAfyJIPhrP65pKNHgBGPSOaXMkNJlssxKjH3ON2E.CiTgV5iZoeyt9CXja_338WUoaMiyvhfnulJEdov_dxIMxaiydaxEmpc_8okuBOftDyMgE_LU3Vi0BAzTEa7SGYpcjMJ6Cu4WGVFUKm93p6UWu9i2AXhdVlV.mm9Twz0zln_fZLXVKc88XvkjXBPVBYxtqlYWQ_gQpXnPgEAeggK80v3HXbx3A2jES.xq5QUacnYSTUTRPPAjfoIiAWKG6g3QRS4Earz7WswXlWBT.P3qVbZ0Sd6RvdRrSh_cKtQRADv_ZG3nxkaSWmeTJOqR7GnIMxWb.DcvAlVprh8pIWCJ66VqHawyFxfMzL5H8PG8BlBKRO5AfsMVQ9w9Yqlx3wSOJNb.78GTcwzH.1O4UAJDSCmfHI9OVi9fOtmQ.ajTGLRcIiIheRim9wnV99xq7SjH4JeVE8AvXrJUmq_.6UO0Fe04uc5KrpDaGLMY7LcAk02bDEJNE9S5BYYgf8A5wGCvnvejw1EudGkz.sjPw44TCz16lFc45JEufFAljAOyL6_c4gczPF_6yHCuarZ1TJPBxFXmtRjPtQJcQ--",
                "refresh_token": "AJEDY1.2BMRVY4Zo3i_yu9LgcPJbpn.WPxdK5ma89f8TMRv0JWA-",
                "expires_in": 3600,
                "token_type": "bearer",
                "xoauth_yahoo_guid": "IYYZECV4YYWC3AQYEQPY3VSN6M"
            };
            this.updateTokenData(tokenData);
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
            expirationTime: expirationTime
        });
    }

    public render() {
        if (this.state && this.state.expirationTime && this.state.refreshToken
            && this.state.expirationTime <= new Date()) {
                this.refresh_token();
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