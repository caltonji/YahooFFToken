const qs = require('qs');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger  processed a request.');
    let data = {
        blank: 'et',
        hula: "hoop"
    };
    context.res = {
        status: 200,
        body: qs.stringify(data)
    };
}
