const helpers= require('../helpers/helper');
const User=require('../model/model');

class userController{

    static async register(req, res,next){
        let userData=req.body
        let saltHash= helpers.genHashPassword(userData.password);
        const newUser= new User({
            name: userData.firstName,
            email: userData.email,
            hashedPassword: saltHash.genPassword,
            salt: saltHash.salt
        })
        const tokenObject =helpers.issueToken(newUser);
        newUser.save().then((user)=>{
            return res.json({
                status:200,
                data:user,
                token:tokenObject.token
            })
        });
        // const newUser= User.create({
        //         name: userData.name,
        //         email: userData.email,
        //         password: saltHash.genPassword,
        //         salt:saltHash.salt
        // })
    }
    static login(req, res,next){
        User.findOne({ email: req.body.email })
            .then((user) => {
                    
                if (!user) {
                    res.status(401).json({ success: false, msg: "could not find user" });
                }
                // Function defined at bottom of app.js
                const isValid = helpers.isValidPassword(req.body.password,user.salt ,user.hashedPassword);
                
                if (isValid) {
                    const tokenObject =helpers.issueToken(user);
                    res.status(200).json({ success: true,data:user, token: tokenObject.token, expiresIn: tokenObject.expires });
                } else {
                    res.status(401).json({ success: false, msg: "you entered the wrong password" });
                }
        
            })
            .catch((err) => {   
                next(err);
            });
    }
}

module.exports=userController;