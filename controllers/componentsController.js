import connection from "../config.js";

export const getAllComponents = async (req, res) => {
  console.log("Get components!");
  try {
    const [results] = await connection.query("SELECT * FROM `Components`");
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const createComponent = async (req, res) => {
  console.log("Post components!", req.query.alternatives);
  try {
    const [results] = await connection.query(
      "INSERT INTO `Components` (name, description, department_id, unit_id, alternatives,  cost, link) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        req.query.name,
        req.query.description,
        req.query.department_id,
        req.query.unit_id,
        JSON.stringify(req.query.alternatives),
        req.query.cost,
        req.query.link,
      ]
    );
    const insertId = results.insertId;
    if (req.query.alternatives) {
      const components = await connection.query(
        "SELECT * from Components WHERE department_id = ?",
        [req.query.department_id]
      );
      let alternatives = [];
      req.query.alternatives.forEach(async (altCompId) => {
        alternatives = components[0].find(
          (el) => +el.id === +altCompId
        ).alternatives;
        console.log(alternatives);
        await connection.query(
          "UPDATE Components set alternatives = ? where id = ?",
          [
            alternatives && alternatives.length
              ? JSON.stringify([...alternatives, insertId])
              : JSON.stringify([insertId]),
            altCompId,
          ]
        );
      });
    }
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const updateComponent = async (req, res) => {
  console.log("Patch components!");
  try {
    const [results] = await connection.query(
      `UPDATE \`Components\` set name = ?, description = ?, department_id = ?, unit_id = ?, cost = ?, link = ? WHERE id = ?`,
      [
        req.query.name,
        req.query.description,
        req.query.department_id,
        req.query.unit_id,
        req.query.cost,
        req.query.link,
        req.query.id,
      ]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const deleteComponent = async (req, res) => {
  console.log("Delete components!");
  try {
    const [results] = await connection.query(
      `DELETE FROM \`Components\` WHERE id = ?`,
      [req.query.id]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};
