const bcryptjs = require('bcryptjs');

const encrypt = (password)=>{
    return bcryptjs.hashSync(password,10);
}

const compare = (password, passwordHash)=>{
    return bcryptjs.compareSync(password,passwordHash);
}

module.exports = { encrypt,compare }