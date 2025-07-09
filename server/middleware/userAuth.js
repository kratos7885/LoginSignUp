import jwt from 'jsonwebtoken';


//next is used to move to the next middleware function
const userAuth = async (req, res, next) => { //this is a middleware function that will check if the user is logged in or not
    const {token} = req.cookies;  
    if(!token) return res.json({message: 'Unauthorized Login again'});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded);
        if(decoded.id){
            req.userId = decoded.id;
        }else{
            return res.json({message: 'Unauthorized Login Again'});
        }
        //console.log(req.userId);
        next(); //this will move to the next middleware function
        //as we are using only middleware function if will now go to the controller functions we wrote
    } catch (error) {
        return res.json({message: 'Unauthorized'});
    }
};
export default userAuth; //this exports the userAuth function so we can use it in other files