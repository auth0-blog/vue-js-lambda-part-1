const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const auth0 = require('auth0');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const router = express.Router();

// retrieve latest micro-posts
router.get('/', async (req, res) => {
  const collection = await loadMicroPostsCollection();
  res.send(
    await collection.find({}).toArray()
  );
});

// this is a middleware to validate access_tokens
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://bk-tmp.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://micro-blog-app',
  issuer: `https://bk-tmp.auth0.com/`,
  algorithms: ['RS256']
});

// insert a new micro-post with user details
router.post('/', checkJwt, async (req, res) => {
  const collection = await loadMicroPostsCollection();

  const token = req.headers.authorization
    .replace('bearer ', '')
    .replace('Bearer ', '');

  const authClient = new auth0.AuthenticationClient({
    domain: 'bk-tmp.auth0.com',
    clientId: 'ZComiPhZoVB02xOsBF81LVbpsvkjL93S',
  });

  authClient.getProfile(token, async (err, userInfo) => {
    if (err) {
      return res.status(500).send(err);
    }

    await collection.insertOne({
      text: req.body.text,
      createdAt: new Date(),
      author: {
        sub: userInfo.sub,
        name: userInfo.name,
        picture: userInfo.picture,
      },
    });

    res.status(200).send();
  });
});

async function loadMicroPostsCollection() {
  const client = await MongoClient.connect('mongodb://localhost:27017/');
  return client.db('micro-blog').collection('micro-posts');
}

module.exports = router;
