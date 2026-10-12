
import express from "express";
import cors from "cors";
import { httpServerHandler } from "cloudflare:node";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import apiRoutes from "./routes/apiRoutes.js";
import firebaseConfig from "./models/firebaseConfig.js";

const app = express();
const port = 3000;

app.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const firebaseApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

app.use(apiRoutes(db));

app.get("/", (req, res) => {
  res.json({ message: "API is running on Cloudflare Workers" });
});

app.listen(port);

export default httpServerHandler({ port });
