import connection from "../config.js";

export const getAllClients = async (req, res) => {
  console.log("Get clients!");
  try {
    const [results] = await connection.query("SELECT * FROM `Clients`");
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const createClient = async (req, res) => {
  console.log("Post client!");
  try {
    const [results] = await connection.query(
      "INSERT INTO `Clients` (name, phone_number, email) VALUES (?, ?, ?)",
      [req.query.name, req.query.phone_number, req.query.email]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const updateClient = async (req, res) => {
  console.log("Patch Client!");
  try {
    const [results] = await connection.query(
      `UPDATE Clients SET name = ? phone_number = ? email = ? WHERE id = ?`,
      [req.query.name, phone_number, email, req.query.id]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const deleteClient = async (req, res) => {
  console.log("Delete client!");
  try {
    const [results] = await connection.query(
      `DELETE FROM Clients WHERE id = ?`,
      [req.query.id]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};
