var express = require("express");
var vestiservice = require("../services/vest");
var router = express.Router();
const Response = require("../models/ResponseResult")
var passport = require("./config");

router.post('/', passport.authenticate('jwt', {session: false}),
    async (req, res)=>{
    var vest = await vestiservice.save(req.body);
    if(vest!=null)
    {
        return res.send(new Response(vest, "Success", true));
    }
    return res.send(new Response(vest, "Greska prilikom dodavanja vesti", false));
});

router.get('/', async (req, res)=>{
    res.send( await vestiservice.getAll());
});

router.get('/:id', async (req, res)=>{
    var vest = await vestiservice.get(req.params.id);
    if(vest != null)
    {
        return res.send(new Response(vest, "Success", true));
    }
    else
    {
        return res.send(new Response(vest, "Vest sa ovim id-jem ne postoji", false));
    }
});

router.put('/', passport.authenticate('jwt', {session: false}),
    async (req, res)=>{
    var vest = await vestiservice.updateVest(req.body);
    if(vest!=null)
    {
        return res.send(new Response(vest, "Success", true));
    }
    return res.send(new Response(vest, "Greska prilikom izmene vesti", false));

})

router.delete("/:id", passport.authenticate('jwt', {session: false}),
    async (req, res)=>{
    var vest = await vestiservice.deleteVest(req.params.id)

    if(vest!=null)
    {
        return res.send(new Response(vest, "Success", true));
    }
    return res.send(new Response(vest, "Greska prilikom brisanja vesti", false));
});

module.exports = router;