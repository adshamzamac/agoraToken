
const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();

const port = 8080;
const dotenv = require("dotenv");


dotenv.config();
const appId = process.env.appId;
const appCertificate = process.env.appCertificate;

app.get('/token', (req, res) => {
    // const channelName = req.query.channelName;
    // const uid = req.query.uid || 0;
    // const role = req.query.role || RtcRole.SUBSCRIBER;
    // const expireTime = req.query.expireTime || 3600;

    // const privilegeExpireTime = (Date.now() / 1000) + expireTime;
    const channelName = req.query.channelName;
    if (!channelName) {
        return resp.status(500).json({ 'error': 'channelName is required' });
    }
    let uid = req.query.uid;
    if (!uid) {
        return resp.status(500).json({ 'error': 'uid is required' });

    }
    let role = RtcRole.SUBSCRIBER;
    if (req.query.role == 'publisher') {
        role - RtcRole.PUBLISHER;
    }
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '') {
        expireTime = parseInt(expireTime, 360)
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;

    const token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpireTime);

    res.json({ token });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

