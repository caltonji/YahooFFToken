var axios = require('axios');
require('dotenv').config()
const qs = require('qs');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger  processed a request.');
    let randomData = {
        "other": "you know"
    };
    qs.stringify(randomData);
    if (req.query.code) {
        let data = {
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: process.env["redirect_uri"],
            client_id: process.env["client_id"],
            client_secret: process.env["client_secret"]
        };
        await axios.post("https://api.login.yahoo.com/oauth2/get_token", qs.stringify(data))
        .then(response => { 
            console.log("success");
            context.res = {
                status: 200,
                body: response.data
            };
        })
        .catch(error => {
            console.log("failure");
            context.res = {
                status: error.response.status,
                body: error.response.data
            };
            console.log(error.response.data)
        });
    } else if (req.query.refresh_token) {
        let data = {
            grant_type: 'refresh_token',
            refresh_token: req.query.refresh_token,
            redirect_uri: process.env["redirect_uri"],
            client_id: process.env["client_id"],
            client_secret: process.env["client_secret"]
        };
        await axios.post("https://api.login.yahoo.com/oauth2/get_token", qs.stringify(data))
        .then(response => { 
            context.res = {
                status: 200,
                body: response.data
            };
        })
        .catch(error => {
            context.res = {
                status: error.response.status,
                body: error.response.data
            };
        });
    } else {
        context.res = {
            status: 400,
            body: "Code or refresh token required"
        };
    }
}