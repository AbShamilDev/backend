import connection from "../config.js";

export const getAllSpecifications = async (req, res) => {
  console.log("Get specifications!");
  try {
    const [results] = await connection.query("SELECT * FROM `Specifications`");
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const createSpecification = async (req, res) => {
  console.log("Post specification!", req.query);
  try {
    const [results] = await connection.query(
      "INSERT INTO `Specifications` (name, components, department_id) VALUES (?, ?, ?)",
      [
        req.query.name,
        JSON.stringify(req.query.components),
        req.query.department_id,
      ]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const updateSpecification = async (req, res) => {
  console.log("Patch specification!");
  try {
    const [results] = await connection.query(
      `UPDATE \`Specifications\` SET name = ?, components = ?, department_id = ? WHERE id = ?`,
      [
        req.query.name,
        JSON.stringify(req.query.components),
        req.query.department_id,
        req.query.id,
      ]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const deleteSpecification = async (req, res) => {
  console.log("Delete specifications!");
  try {
    const [results] = await connection.query(
      `DELETE FROM \`Specifications\` WHERE id = ?`,
      [req.query.id]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};
