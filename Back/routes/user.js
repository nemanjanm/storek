var express = require("express");
var userservice = require("../services/user");
const Response = require("../models/ResponseResult")
var usermodel = require("../models/user");

var router = express.Router();

router.post('/register', async (req,res)=>{
    var token = await userservice.register(req.body);
    if (!token)
        return res.send(new Response(null, "Greska prilikom registracije", false));
    return res.send(new Response(token, "Success", true));
})

router.post('/login', async (req,res)=>{
    var token = await userservice.login(req.body);
    if (!token)
        return res.send(new Response(null, "Pogresni kredencijali", false));
    return res.send(new Response(token, "Success", true));
})
module.exports = router