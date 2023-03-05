const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '8af824c2c8084caa84fb55cdd88148e7',
        clientSecret: '132459e1a351454ba7813c48df04c951',
        refreshToken
    })

    spotifyApi
        .refreshAccessToken()
        .then(
            (data) => {
                res.json({
                    accessToken: data.body.accessToken,
                    expiresIn: data.body.expiresIn
                })
            })
            .catch(() => {
                res.sendStatus(400)
            }
        )
})

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '8af824c2c8084caa84fb55cdd88148e7',
        clientSecret: '132459e1a351454ba7813c48df04c951'
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.listen(3001)