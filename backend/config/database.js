const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate();

/* const connectDB = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      resolve();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      reject();
    }
  })
} */

const get = async (sql, options) => {
  //await connectDB();
  const [results, metadata] = await sequelize.query(sql, options);
  //await sequelize.close();

  return results;
}

(async ()=>{
  /* let tableNames= await get("SHOW tables;");

  let dbData = {};
  for(let obj of tableNames){
    let columnNames = [];
    const tableName = obj.Tables_in_rakoon;
    const columnInfo = await get(`SHOW columns from ${tableName};`);
    for(let info of columnInfo){
      columnNames.push(`${info.Field}`);
    }
    dbData[tableName] = columnNames;
  }
  console.log("dbData");
  console.log(dbData);
  let data=[];
  for(let table of Object.keys(dbData)){
    const content = await get(`SELECT * from ${table};`), obj={};
    obj[table]=content;
    if(content.length!==0)
      data.push(obj);
  }
  require('fs').writeFileSync('./dbData.json',JSON.stringify(data,null,'\t'));
  console.log("saved!!!!!!!!!"); */
/* 
  data = JSON.parse(require('fs').readFileSync('./dbData.json').toString());
  
  for(let table of data){
    const tableName = Object.keys(table)[0];
    const rows = table[tableName];

    for(let row of rows){
      let sql = `SET FOREIGN_KEY_CHECKS=OFF; REPLACE INTO rakoon.${tableName}(`;
      sql = sql + Object.keys(row) + ') VALUES (';
      for(let i=0; i<Object.keys(row).length; i++){
        const columnName = Object.keys(row)[i];
        if(columnName.includes('_id') || columnName==="is_verified" || columnName==="auth" || columnName==="isprevimg")
          sql=sql+Object.values(row)[i]+',';
        else
          sql=sql+`'${Object.values(row)[i]}'`+',';
      }
      sql=sql.substring(0,sql.length-1)+');';
      await get(sql);
    }
  }
 */
})();

module.exports = {
  get,
  sequelize
};