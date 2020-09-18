const qs = require('qs');
// require('dotenv').config();

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger  processed a request.');
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    if (req.query.code || (req.code && req.body.code)) {
        context.res = {
            // status defaults to 200 */
            body: "Hello " + (req.query.code || req.body.code)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
}
