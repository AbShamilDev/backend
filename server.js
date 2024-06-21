import express from "express";
import cors from "cors";
import installationsRouter from "./routes/installations.js";
import componentsRouter from "./routes/components.js";
import projectsRouter from "./routes/projects.js";
import specificationsRouter from "./routes/specifications.js";
import clientsRouter from "./routes/clients.js";
import connection from "./config.js";

const app = express();
const port = 8080;

app.use(cors({ headers: ["Content-Type"] }));

app.use("/installations", installationsRouter);
app.use("/components", componentsRouter);
app.use("/projects", projectsRouter);
app.use("/specifications", specificationsRouter);
app.use("/clients", clientsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
