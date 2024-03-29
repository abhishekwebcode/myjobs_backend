module.exports=function (app) {
    app.all(`/me`,async function (request,response) {
        let email = request.email;
        console.log(email);
        let res=await request.app.get("db")().collection(`users`).find({email},{email:1,username:1,_id:0}).limit(1).toArray();
        response.json({
            success:true,
            data:(res.length==0)?[{email:"Not found",username:"..."}]:res[0]
        })
    });
}