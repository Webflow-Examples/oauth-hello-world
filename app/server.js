import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import {WebflowClient} from "webflow-api";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";

dotenv.config();


const { PORT, CLIENT_ID,CLIENT_SECRET } = process.env;

const port = PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: false
})
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
  const url = WebflowClient.authorizeURL({
    clientId: CLIENT_ID,
    scope: ["authorized_user:read"],
  });
  reply.redirect(url);
});

// handle the redirect from Webflow's Authorization URL
fastify.post("/", async (request, reply) => {
  try {
    const access_token = await WebflowClient.getAccessToken({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      code: request.body.code,
    });

    const app = new WebflowClient({
      accessToken: access_token
    });
    const user = await app.token.authorizedBy();
    
    reply.send(user);
  } catch (e) {
    console.log(e);
  }
});

// Run the server!
fastify.listen({
  port
}, (err) => {
  if (err) throw err;
  console.log(`Server is now listening on port ${port}`);
});