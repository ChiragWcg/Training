// Middelware to check Authentication - "passport-jwt"

let jwt = require('jsonwebtoken');

global.AuthJWT = (req, res, next) => {
    let token = req.cookies.token;
    let privateKey = 'chirag';
    jwt.verify(token, privateKey, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/userLogin")
      }
      else {
        req.user = user;
        next();
      }
    })
  }


