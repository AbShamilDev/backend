import { createConnection } from "mysql2/promise";

const connection = await createConnection({
  host: "127.127.126.50",
  user: "root",
  database: "diplomDB",
});

export default connection;
