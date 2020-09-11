const jwt = require("jsonwebtoken");
const qs = require('querystring')
const axios = require("axios");

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const secret = process.env.JWT_SECRET || 'secret';
    const { token } = event.headers;
    const { from, to, message } = JSON.parse(event.body);

    try {
        const { nim } = jwt.verify(token, secret);

        if (from.startsWith('nim:') && from !== 'nim:' + nim) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'You are not authorized to send as this NIM' }),
            };
        }

        await submitResponse(from, to, message);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid JWT' }),
        };
    }
};

async function submitResponse(from, to, message) {
    const formId = process.env.GFORM_FORM_ID;
    const fromEntryId = process.env.GFORM_FROM_ENTRY_ID;
    const toEntryId = process.env.GFORM_TO_ENTRY_ID;
    const messageEntryId = process.env.GFORM_MESSAGE_ENTRY_ID;

    const postUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
    const body = {
        [fromEntryId]: from,
        [toEntryId]: to,
        [messageEntryId]: message
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const response = await axios.post(postUrl, qs.stringify(body), { headers });
    return response;
}