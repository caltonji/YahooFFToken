const qs = require('qs');
// require('dotenv').config();

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger  processed a request.');
    if (req.query.code) {
        context.res = {
            status: 200,
            body: req.query.code
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
