var axios = require('axios');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    if (!req.query.code) {
        context.res = {
            body: process.env["redirect_uri"]
        };
    } else {
        response = await axios.post("https://api.login.yahoo.com/oauth2/get_token",
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: process.env["redirect_uri"],
                client_id: process.env["client_id"],
                client_secret: process.env["client_secret"]
            }
        });
        console.log(response);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: response
        };
    }
}