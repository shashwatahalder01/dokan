require('dotenv').config()
// console.log(process.env.ENV)

// if (process.env.ENV == 'local') {
//     console.log('first file')
//     require('dotenv').config({ path: '.env.local' })

//     console.log(process.env.ABC)
//     console.log(process.env.ENV)
// }

var dotenv = require('dotenv');
var fs = require('fs');
if (process.env.ENV === 'local') {
    //  process.env = dotenv.parse(fs.readFileSync('.env'));
    process.env = dotenv.parse(fs.readFileSync('.env.local'));
}
// console.log(config1.ABC)
// console.log(config2.ABC)
console.log(process.env)
