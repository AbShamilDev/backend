import connection from "../config.js";

export const getAllProjects = async (req, res) => {
  console.log("Get projects!");
  try {
    const [results] = await connection.query("SELECT * FROM `Projects`");
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const createProject = async (req, res) => {
  console.log("Post projects!");

  const [client_result] = await connection.query(
    "SELECT name FROM  Clients where id = ?",
    [req.query.client_id]
  );

  const client_name = client_result[0].name;

  const insertIds = {
    fst_specification_id: undefined,
    snd_specification_id: undefined,
    trd_specification_id: undefined,
    installation_id: undefined,
  };

  const formatDateForMySQL = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const PostNewSpecification = (spec, department_id) => {
    const result = connection.query(
      "INSERT INTO `Specifications` (name, components, department_id) VALUES (?, ?, ?)",
      [
        `${spec.name} для ${client_name}`,
        JSON.stringify(
          spec.components.map((el) => {
            return { id: el.id, quantity: el.quantity };
          })
        ),
        department_id,
      ]
    );
    return result;
  };

  try {
    if (JSON.parse(req.query.fst_spec.edited)) {
      const [result] = await PostNewSpecification(req.query.fst_spec, 1);
      insertIds.fst_specification_id = result.insertId;
    }
    if (JSON.parse(req.query.snd_spec.edited)) {
      const [result] = await PostNewSpecification(req.query.snd_spec, 2);
      insertIds.snd_specification_id = result.insertId;
    }
    if (JSON.parse(req.query.trd_spec.edited)) {
      const [result] = await PostNewSpecification(req.query.trd_spec, 3);
      insertIds.trd_specification_id = result.insertId;
    }
    if (
      insertIds.fst_specification_id ||
      insertIds.snd_specification_id ||
      insertIds.trd_specification_id
    ) {
      const [result] = await connection.query(
        "INSERT INTO `Installations` (name, fst_specification_id, snd_specification_id, trd_specification_id, two_lines) VALUES (?, ?, ?, ?, ?)",
        [
          `${req.query.installation.name} для ${client_name}`,
          insertIds.fst_specification_id
            ? insertIds.fst_specification_id
            : req.query.installation.fst_specification_id,
          insertIds.snd_specification_id
            ? insertIds.snd_specification_id
            : req.query.installation.snd_specification_id,
          insertIds.trd_specification_id
            ? insertIds.trd_specification_id
            : req.query.installation.snd_specification_id,
          JSON.parse(req.query.installation.two_lines),
        ]
      );
      insertIds.installation_id = result.insertId;
    }

    const [results] = await connection.query(
      "INSERT INTO `Projects`( `client_id`, `installation_id`, `budget`, `start_date`) VALUES (?, ?, ?, ?)",
      [
        req.query.client_id,
        insertIds.installation_id
          ? insertIds.installation_id
          : req.query.installation.id,
        req.query.budget,
        formatDateForMySQL(req.query.start_date),
      ]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

export const deleteProject = async (req, res) => {
  console.log("Delete projects!");
  try {
    const [results] = await connection.query(
      `DELETE FROM Projects WHERE id = ?`,
      [req.query.id]
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};
