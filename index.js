const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();

const port = 8080;
const dotenv = require("dotenv");

dotenv.config();
const appId = process.env.appId;
const appCertificate = process.env.appCertificate; // Use appCertificate as the secret key

// Middleware to check for authorization header
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    // Validate the token (you can use any validation logic here)
    if (token !== appCertificate) {
        return res.status(403).json({ error: 'Invalid token' });
    }

    next();
};

app.get('/token', verifyToken, (req, res) => {
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(500).json({ error: 'channelName is required' });
    }

    let uid = req.query.uid;
    if (!uid) {
<<<<<<< HEAD
        uid = 0;
    }
=======
        // return resp.status(500).json({ 'error': 'uid is required' });
        uid=0;
>>>>>>> origin/main

    let role = RtcRole.SUBSCRIBER;
    if (req.query.role === 'publisher') {
        role = RtcRole.PUBLISHER;
    }

    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime === '') {
        expireTime = 3600; // Set default if not provided
    } else {
        expireTime = parseInt(expireTime, 10);
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;

    const token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpireTime);

    res.json({ token });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
