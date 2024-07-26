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

app.get("/getall", async (req, res) => {
  console.log("Get all!");
  const data = {
    installations: await connection.query("SELECT * FROM `Installations`"),
    projects: await connection.query("SELECT * FROM `Projects`"),
    specifications: await connection.query("SELECT * FROM `Specifications`"),
    components: await connection.query("SELECT * from Components"),
    departments: await connection.query("SELECT * FROM `Departments`"),
    units: await connection.query("SELECT * FROM `Units`"),
    clients: await connection.query("SELECT * FROM `Clients`"),
  };
  data.installations = data.installations[0];
  data.projects = data.projects[0];
  data.specifications = data.specifications[0];
  data.components = data.components[0];
  data.departments = data.departments[0];
  data.units = data.units[0];
  data.clients = data.clients[0];

  res.send(data);
});

app.use("/installations", installationsRouter);
app.use("/components", componentsRouter);
app.use("/projects", projectsRouter);
app.use("/specifications", specificationsRouter);
app.use("/clients", clientsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
