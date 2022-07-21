require('dotenv').config()
// let mysql = require('mysql')
let mysql = require('mysql2')
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack)
        return
    }
    // console.log('Connected as id ' + connection.threadId)
})

let tablePrefix = process.env.DB_TABLE_PREFIX
let table = tablePrefix + 'dokan_orders'
let column = 'order_id'
// let parameter = 'siteurl'
let parameter = '451'

// let sql = `Select option_value From dok_options where option_name= 'siteurl'`
// let sql = `Select option_value From wp_options where option_name=` + `'${parameter}'`
// let sql = `Select * From ${tablePrefix}dokan_orders where order_id=` + `'${parameter}'`
// let sql = `Select * From ${tablePrefix}wc_order_tax_lookup where order_id=` + `'${parameter}'`
let sql = `Select * From ${tablePrefix}wc_order_stats where order_id=` + `'${parameter}'`
console.log(sql)
connection.query(sql, (error, results, fields) => {
    if (error) {
        return console.error(error.message)
    }
    console.log(results)
    // console.log(results[0].option_value)
    // results.forEach((result) => {
    //     console.log(`${result.option_value}`)
    // })

})
connection.end()



// docker ps -aqf "name=_tests-mysql_1$"
// docker port container id


