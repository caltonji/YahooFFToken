const qs = require('qs');
// require('dotenv').config();

module.exports = async function (context) {
    context.log('JavaScript HTTP trigger  processed a request.');
    if (context.req.query.code) {
        context.res = {
            status: 200,
            body: context.req.query.code
        };
        // let data = {
        //     grant_type: 'authorization_code',
        //     code: eq.query.code,
        //     redirect_uri: process.env["redirect_uri"],
        //     client_id: process.env["client_id"],
        //     client_secret: process.env["client_secret"]
        // };
        // context.log(data);
        // context.res = {
        //     status: 200,
        //     body: qs.stringify(data)
        // };
    }
}
