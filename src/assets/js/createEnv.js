const fs = require('fs')
fs.writeFileSync('./.envx', `API_KEY=${process.env.API_KEY}\n`);