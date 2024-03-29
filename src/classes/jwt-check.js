module.exports=function (app) {
    const bearerToken = require('express-bearer-token');
    app.use(bearerToken());
    app.all("*",async function (req, res, next) {
        //let meta = require(`../auth/jwt/verify`)(res.token, res.email, res);
        console.log("token is",req.token);
        let meta = await (require("../auth/jwt/jwt").getPayloadFromToken(req.token));
        console.dir(meta);
        if (!meta) { res.json({success:false,message:"NOT_LOGGED_IN"}); res.end() ; return ; }
        req.User = meta;
        req.email = meta.email;
        next();
    });
};