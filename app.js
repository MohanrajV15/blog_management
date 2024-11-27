const express = require('express');
const app = express();

const errorHandler = require('./src/middleware/error');
const DatabaseAndTables = require('./src/database/dbsetup');
DatabaseAndTables();



const dotenv = require('dotenv');
dotenv.config({path:"../src/config/config.env"});

const allRouter = require('./src/router/index');
app.use(express.json());
app.use('/api/health',(req,res) => {
  res.send('health check ok....');
})

const db = require("./src/database/db");
console.log(typeof db.execute);


app.use('/api', allRouter);

app.use(errorHandler)


const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  // close server and exit process
  server.close(() => process.exit(1));
});