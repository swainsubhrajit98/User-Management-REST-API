import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", userRoutes);

//Error handling
app.use(errorHandling);

//creating table before starting the server
createUserTable();
app.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT DATABASE()");
    res.send(`The db name is ${rows[0]["DATABASE()"]}`);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
