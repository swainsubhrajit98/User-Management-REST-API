import connection from "../config/db.js"; // Add `.js` if you're using ES Modules

const createUserTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS myusertable (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  image TEXT,
  password VARCHAR(255) NOT NULL
);
    `;

    await connection.query(query);
    console.log("Usertable created or already exists");
  } catch (err) {
    console.error("Error creating usertable:", err);
  }
};

export default createUserTable;
