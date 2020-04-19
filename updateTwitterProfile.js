const updateTwitterProfile = async (counter) => {
    const OAuth = require('oauth-1.0a')
    const crypto = require('crypto')
    const axios = require('axios');
    const qs = require('querystring')


    // Token and OAuth Settings
    const oauth = OAuth({
        consumer: {
            key: process.env["TWITTER_CONSUMER_KEY"],
            secret: process.env["TWITTER_CONSUMER_SECRET_KEY"]
        },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return crypto
                .createHmac('sha1', key)
                .update(base_string)
                .digest('base64')
        },
    });
    const token = {
        key: process.env["TWITTER_ACCESS_KEY"],
        secret: process.env["TWITTER_ACCESS_SECRET_KEY"]
    };
    // Twitter REST API
    // update twitter
    const twitterUserName = process.env["TWITTER_USER_NAME"];
    const updateProfileData = {
        url: 'https://api.twitter.com/1.1/account/update_profile.json',
        method: 'POST',
        data: { name: `${twitterUserName} ${counter}` },
    }
    await axios.post(updateProfileData.url, qs.stringify(oauth.authorize(updateProfileData, token)), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response) => {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    })

}
module.exports = updateTwitterProfile;
