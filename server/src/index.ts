import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;