require('dotenv').config();
const authenticate = (req,res,next) => {
    if (req.headers.password===process.env.password){
        next();
    } else {
        res.status(400).send("Lack of Credentials");
    }
}
module.exports={authenticate};