const dotenv = require('dotenv');
const res=dotenv.config({ path: `.env.${process.env.NODE_ENV}`}); //{ path: `.env.${process.env.NODE_ENV}`}

const { parsed: mesvars } = res
const { 
    PORT,
    JWT_SECRET,
} = mesvars

module.exports = {
    PORT,
    JWT_SECRET
}