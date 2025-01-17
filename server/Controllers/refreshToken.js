const User = require("../Models/User");
const jwt = require("jsonwebtoken");
 
module.exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) return res.sendStatus(401);

    User.find({
        refresh_token: refreshToken
    })
        .then(result => {
            if(!result[0]) return res.sendStatus(403);

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if(err) return res.sendStatus(403);

                const id = result[0]._id;
                const name = result[0].name;
                const email = result[0].email;

                const accessToken = jwt.sign({id, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn: '30s'
                });

                res.json({ accessToken });
            })
        })
}