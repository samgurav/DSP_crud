const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/getdata", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM crudtable");
    res.json(allTodo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/adddetails", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, mobile, state, city } = req.body;
    const query =
      'INSERT INTO "crudtable" ( "name","email","mobile","state","city") VALUES ($1, $2, $3,$4,$5)';
    const data = [name, email, mobile, state, city];
    console.log(query);
    console.log(data);
    console.log(name);
    const newTodo = await pool.query(query, data);
    console.log(newTodo);
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});
app.put("/updateDetails", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, mobile, state, city } = req.body;
    const query = `UPDATE "crudtable" 
    SET "name" = $1,"mobile"=$2,"state"=$3,"city" = $4
    WHERE "email" = $5`;

    // const query = `UPDATE "crudtable"
    // SET "name" ='${name}'::text,"mobile"='${mobile}'::text,"state"='${state}'::text,"city" = '${city}'::text
    // WHERE "email" = '${email}'::text`;

    const data = [name, mobile, state, city, email];
    console.log(query);
    console.log(data);
    const newTodo = await pool.query(query, data);
    console.log(newTodo);
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/deletedetails", async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;
    const query = 'DELETE FROM "crudtable" WHERE "email" = $1';
    const data = [email];
    console.log(query);
    console.log(data);
    const newTodo = await pool.query(query, data);
    console.log(newTodo);
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3001, () => {
  console.log("working on 3001");
});
