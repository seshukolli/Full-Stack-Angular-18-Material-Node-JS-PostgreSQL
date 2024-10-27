//create postgresql connection and pool
const { user, pssword, database} = require("pg/lib/defaults")

const pgsqlPool = require("pg").Pool

const pool = new pgsqlPool({
    user: "postgres",
    password: "Seshu@123",
    database: "account_master",
    host: "localhost",
    port:"5432",
    max:10
})
pool.connect((err,connection)=>{
    if(err) throw err;
    console.log(`Connected to PostgresSQL DB successfully`);
    connection.release()
})

module.exports=pool;