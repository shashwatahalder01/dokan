// require('dotenv').config()
// const mysql = require('like-mysql')
// const db = mysql('127.0.0.1:3306', 'root', '01dokan01', 'dokan4')

// async function dbQuery (sql,callback) {
// await db.ready()
// const result = await db.query(sql)
// // console.log(result)
// callback(result)
// // return result
// // await db.end()
// }

// let tablePrefix = process.env.DB_TABLE_PREFIX
// let parameter = '451'
// let sql = `Select * From ${tablePrefix}wc_order_stats where order_id=` + `'${parameter}'`

// // let result = dbQuery(sql)
// // console.log(result)

// let result =  dbQuery(sql,async (data)=>{
//     console.log(data)
// })

// // console.log(result)
// db.end()




// console.log(94.77 - 4.74 + 5)
// console.log(94.77 - 9.48 + 4.74)
// for (let i = 0; i < 100; i++) {
// console.log(Math.floor((Math.random() * 2) +1)) }

// for (let i = 0; i < 100; i++) {
// console.log(Math.floor(Math.random() * 3))
// }

function reverse(s){
    return s.split("").reverse().join("");
}

// let s = 'Order Date: April 18, 2022, 11:01 pm'
// //  console.log(s.split(':')[1])
// //  console.log(s.split(':')[1])
//  var str =  s.split(':')[1]
//  var res = str.substring(0, str.indexOf(',', str.indexOf(',')+1))
// console.log(res)


// console.log(1===1===1)
    
//     let a = 1

//     a == true ? console.log(-a) : console.log(a)


  let a= 'via Flat rate'
  console.log(a.replace('via ',''))