var axios = require('axios');
// require('dotenv').config();
const qs = require('qs');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger  processed a request.');
    if (req.query.code) {
        let data = {
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: process.env["redirect_uri"],
            client_id: process.env["client_id"],
            client_secret: process.env["client_secret"]
        };
        context.res = {
            status: 200,
            body:  qs.stringify(data)
        };
        // await axios.post("https://api.login.yahoo.com/oauth2/get_token", qs.stringify(data))
        //     .then(response => { 
        //         context.log("success");
        //         context.res = {
        //             status: 200,
        //             body: response.data
        //         };
        //     })
        //     .catch(error => {
        //         context.log("failure");
        //         context.res = {
        //             status: error.response.status,
        //             body: error.response.data
        //         };
        //         console.log(error.response.data)
        //     });
    }
}