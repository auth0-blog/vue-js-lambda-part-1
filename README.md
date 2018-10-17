# Vue.js and AWS Lambda: Developing Production-Ready Apps (Part 1)

Application repo accompanying the first article of a series. In this series, you will use modern technologies like Vue.js, AWS Lambda, Express, MongoDB, and Auth0 to create a production-ready application that acts like a micro-blog engine. The first part of the series (this one) will focus on the setup of the Vue.js client that users will interact with and on the definition of the Express backend app.

[Vue.js and AWS Lambda: Developing Production-Ready Apps (Part 1)](https://auth0.com/blog/vue-js-and-lambda-developing-production-ready-apps-part-1/)

## Running This Sample

To facilitate running this sample, I've left my own Auth0 configuration values in this repo. As such, you can simply run the following commands to run this sample:

```bash
# after cloning, move into the backend
cd backend

# install deps
npm i

# and run the backend on the background
node src &

# then install frontend deps
cd ../client
npm i

# run the frontend app
npm run dev
```
