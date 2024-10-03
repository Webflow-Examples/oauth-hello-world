# Webflow OAuth App

Use this "Hello World" code sample to :
- Spin up a Weblow App Server
- Enable OAuth 
- Get data on an authorized user

## Get Running
1. [Register](https://developers.webflow.com/#oauth-applications) a Webflow App 
2. Copy the `.env.example` file to `.env`
3. Replace the IDs in `.env` with the IDs from Webflow
4. Clone and run `yarn install`
5. Run `yarn dev` to start your development server


## Tools Used
- [Fastify](https://www.fastify.io/) for a webserver
- [Webflow SDK](https://www.npmjs.com/package/webflow-api) for the Webflow API client
- [Nodemon](https://nodemon.io/) for live-reload during development

## Requirements
This server needs to be accessible by Webflow to recieve Webhook events. You have a couple of options to enable this:

### Free Hosts
- [Railway.app](https://railway.app/)
- [Fly.io](https://fly.io)
- [Vercel](https://vercel.com/)

### Tunnel
- [ngrok](https://ngrok.com/)
- [localtunnel](https://theboroer.github.io/localtunnel-www/)