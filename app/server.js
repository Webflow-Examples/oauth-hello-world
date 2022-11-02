const fastifyStatic = require("@fastify/static");
const fastify = require("fastify")();
const Webflow = require("webflow-api");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const { PORT, CLIENT_ID, CLIENT_SECRET } = process.env;

const port = PORT || 3000;
const webflow = new Webflow();

// server static assets from public folders
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
});

// Server the index.html file
fastify.get("/", (request, reply) => {
  reply.sendFile("index.html");
});

// redirect to Webflow's Authorization URL
fastify.get("/authorize", (request, reply) => {
  const url = webflow.authorizeUrl({ client_id: CLIENT_ID });
  reply.redirect(url);
});

// handle the redirect from Webflow's Authorization URL
fastify.post("/", async (request, reply) => {
  const { access_token } = await webflow.accessToken({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: request.body.code,
  });

  const app = new Webflow({ token: access_token });
  const { user } = await app.authenticatedUser();
  reply.send(user);
});

// Run the server!
fastify.listen({ port }, (err) => {
  if (err) throw err;
  console.log(`Server is now listening on port ${port}`);
});
