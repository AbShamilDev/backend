import connection from "../config.js";

export const getAllInstallations = async (req, res) => {
  console.log("Get installations!");
  try {
    const [results] = await connection.query("SELECT * FROM `Installations`");
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const createInstallation = async (req, res) => {
  console.log("Post installations!");
  try {
    const [results] = await connection.query(
      "INSERT INTO Installations (name, fst_specification_id, snd_specification_id, trd_specification_id, two_lines) VALUES (?, ?, ?, ?, ?)",
      [
        req.query.name,
        req.query.fst_specification_id,
        req.query.snd_specification_id,
        req.query.trd_specification_id,
        JSON.parse(req.query.two_lines),
      ]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const updateInstallation = async (req, res) => {
  console.log("Patch installations!");
  try {
    const [results] = await connection.query(
      `UPDATE Installations SET name = ?, fst_specification_id = ?, snd_specification_id = ?,  trd_specification_id = ?, two_lines = ?,  WHERE id = ?`,
      [
        req.query.name,
        req.query.fst_specification_id,
        req.query.snd_specification_id,
        req.query.trd_specification_id,
        JSON.parse(req.query.two_lines),
        req.query.id,
      ]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const deleteInstallation = async (req, res) => {
  console.log("Delete installations!");
  try {
    const [results] = await connection.query(
      `DELETE FROM Installations WHERE id = ?`,
      [req.query.id]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};
