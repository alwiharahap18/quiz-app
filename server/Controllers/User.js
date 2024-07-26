const UserPost = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 
module.exports.Register = (req, res) => {
    const { name, email, password, repassword, role } = req.body;

    if(password !== repassword) return res.status(400).json({mesasge: "Password dan Confirm Password tidak cocok"});

    bcrypt.genSalt().then(salt => {
        bcrypt.hash(password, salt).then(hashPassword => {
            let Posting = new UserPost({
                name: name,
                email: email,
                password: hashPassword,
                refresh_token: null,
                role
            })
        
            Posting.save()
                .then(() => {
                    res.status(200).json({
                        message: "Register Berhasil",
                        data: {name, email}
                    });
                })

        })
    });

}
 
exports.getIG = (req, res, next) => {
    const userId = req.params.getId;
  
    UserPost.findById(userId)
      .then(result => {
        if (!result) {
          const error = new Error('Data Quiz Tidak Ditemukan!');
          error.errorStatus = 404;
          throw error;
        }
  
        res.status(200).json({
          message: "Data Panitia Berhasil Dipanggil",
          username: result.name
        });
      })
      .catch(err => next(err));
  };

module.exports.Login = (req, res) => {
        UserPost.find({
            email: req.body.email
        })
            .then(result => {
                if(!result[0]) return res.status(404).json({message: "Email not found"});

                bcrypt.compare(req.body.password, result[0].password)
                    .then(match => {
                        if(!match) return res.status(400).json({message: "Wrong Password"});

                        const id = result[0]._id;
                        const name = result[0].name;
                        const email = result[0].email;
                        const role = result[0].role;

                        const accessToken = jwt.sign({id, name, email, role}, process.env.ACCESS_TOKEN_SECRET,{
                            expiresIn: '1d'
                        }); 

                        const refreshToken = jwt.sign({id, name, email, role}, process.env.REFRESH_TOKEN_SECRET,{
                            expiresIn: '1d'
                        });

                        UserPost.updateOne({ _id: id }, { $set: { refresh_token: refreshToken } })
                            .then(() => {
                                // untuk set cookie
                                res.cookie('refreshToken', refreshToken,{
                                    httpOnly: true,
                                    maxAge: 24 * 60 * 60 * 1000
                                });
                                // respon access token
                                res.json({ accessToken })
                            })
                            .catch(error => console.error(error))
                    })
                    .catch(err => console.error(err))
            })
}
 
module.exports.Logout = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) return res.sendStatus(204);

    UserPost.find({
        refresh_token: refreshToken
    })
        .then(result => {
            if(!result) return res.sendStatus(204);
            const id = result._id;

            // fungsi $set untuk mengupdate tanpa menghapus data data lainnya
            UserPost.updateOne({ _id: id }, { $set: { refresh_token: refreshToken } }) 
                .then(() => {
                    // hapus cookie
                    res.clearCookie('refreshToken');
                    res.status(200).json({
                        message: "Berhasil Logout!"
                    })
                })
        })
}