//Database setup

require('dotenv').config();
const sql = require('mssql');
const express = require('express');

const app = express();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options:{
        trustServerCertificate: true,
    },
    port: parseInt(process.env.DB_PORT) 
}

//Database functions

// const login = async(user_nm, user_pw) =>{
//     try{
//         let pool = await sql.connect(config)
//         let employees = await pool.request().query(
//             `if exists(
//             select * from USER_LOGIN where user_nm = ${user_nm} and user_pw = ${user_pw}
//             )
//             begin
//                 select * from customers, USER_LOGIN
//                 where customers.email = USER_LOGIN.user_nm
//             end`
//         )
//         return employees
//         }
//     catch(error){
//         console.log(error)
//     }
// }

const get_employees = async() =>{
    try{
        let pool = await sql.connect(config)
        let employees = await pool.request().query(`Select * from USER_LOGIN`);
        return employees;
    }
    catch(error){
        console.log(error)
    }
    
}

const create_user = async(user_name, user_password, user_email) => {
    try{
    let pool = await sql.connect(config)
    await pool.request().query(`INSERT INTO USER_LOGIN VALUES('${user_name}', '${user_password}', '${user_email}')`)
    }
    catch(err){
        console.log(err);
    }
}

const member_login = async(user_name, user_password) => {
    try{
        let pool = await sql.connect(config);
        const result = await pool.request().query(`select dbo.udf_user_login('${user_name}','${user_password}')`)
        return result.recordset
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    get_employees,
    create_user,
    member_login
}
