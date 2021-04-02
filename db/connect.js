const mysql = require('mysql');
const user = require('./dbUser.js');
const fs = require('fs');
const readline = require('readline');

const con = mysql.createConnection(user);

const main = async () => {
  await connect();

  const rl = readline.createInterface({
    input: fs.createReadStream('./db/rakoon_db.sql'),
    crlfDelay: Infinity
  });

  let sql = '';
  for await (const line of rl) sql += line;
  await get(sql);

  /* sql= JSON.parse(await get("USE rakoon; SHOW tables;"));

  let dbData = {};
  for(let obj of sql[1]){
    let columnNames = [];
    const tableName = obj.Tables_in_rakoon;
    for(let info of JSON.parse(await get(`SHOW columns from rakoon.${tableName};`)))
      columnNames.push(info.Field);
    dbData[tableName] = columnNames;
  }
  console.log(dbData); */

}

async function connect() {
  return new Promise((resolve) => {
    con.connect(async (err) => {
      if (err) throw err;
      console.log("Connected to Mysql DB");
      resolve(1);
    });
  });
}

function get(query) {
  return new Promise((resolve, reject) => {
    con.query(query, function (err, result) {
      if (err) reject(err);
      resolve(JSON.stringify(result));
    });
  })
}

main();




module.exports = {
  get
}