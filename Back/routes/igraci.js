var express = require("express");
var igracservice = require("../services/igrac");
var teamservice = require("../services/tim");
var router = express.Router();
const igracViewModel = require("../models/viewmodels/igracViewModel");
const Response = require("../models/ResponseResult")
const upload = require("../middleware/upload")
var passport = require("./config");

router.post('/', passport.authenticate('jwt', {session: false}), 
    upload.single('slika'), async (req, res)=>{
    var noviigrac = await igracservice.save(req);
    if(noviigrac!=null)
    {
        return res.send(new Response(noviigrac, "Success", true));
    }
    return res.send(new Response(noviigrac, "Greska prilikom dodavanja igraca", false));
});

router.get('/:liga', async (req, res)=>{
    var igraci = await igracservice.getAll(req.params.liga);
    console.log(igraci);
    var lista = [];
    igraci.forEach(igrac => {
        if(igrac.tim)
        {
            var noviigraci = new igracViewModel(
                igrac.imeIprezime,
                igrac._id,
                igrac.slika,
                igrac.tim.naziv,
                igrac.tim._id,
                igrac.odigraniMecevi,
                igrac.dobijeniMecevi,
                igrac.odigraniMecevi - igrac.dobijeniMecevi,
                igrac.dobijeniSetovi,
                igrac.odigraniSetovi - igrac.dobijeniSetovi,
                igrac.dobijeniPoeni,
                igrac.odigraniPoeni - igrac.dobijeniPoeni
            );
            lista.push(noviigraci);
        }
    });
    if(lista.length == 0)
        return res.send(new Response(lista, "Nema igraca", false));
    return res.send(new Response(lista, "Success", true));
});

router.get('/idigraca/:id', async (req, res)=>{
    var igrac = await igracservice.get(req.params.id);
    if(igrac != null)
    {
        var noviigrac = new igracViewModel(
            igrac._id,
            igrac.imeIprezime,
            igrac.tim.naziv,
            igrac.tim._id,
            igrac.odigraniMecevi,
            igrac.dobijeniMecevi,
            igrac.odigraniMecevi - igrac.dobijeniMecevi,
            igrac.dobijeniSetovi,
            igrac.odigraniSetovi - igrac.dobijeniSetovi,
            igrac.dobijeniPoeni,
            igrac.odigraniPoeni - igrac.dobijeniPoeni
        );
        return res.send(new Response(noviigrac, "Success", true));
    }
    else
    {
        return res.send(new Response(igrac, "Igrac sa ovim id-jem ne postoji", false));
    }
});

router.get('/idtima/:id', async (req, res)=>{
    var tim = await teamservice.getTeam(req.params.id)
    if(tim == null)
    {
        return res.send(new Response(null, "Tim ne postoji", false));
    }
    var igraci = await igracservice.getByTeam(req.params.id);
    if(igraci.length>0)
    {
        var lista = [];
        igraci.forEach(igrac => {
            var noviigraci = new igracViewModel(
                igrac.imeIprezime,
                igrac._id,
                igrac.slika,
                igrac.tim.naziv,
                igrac.tim._id,
                igrac.odigraniMecevi,
                igrac.dobijeniMecevi,
                igrac.odigraniMecevi - igrac.dobijeniMecevi,
                igrac.dobijeniSetovi,
                igrac.odigraniSetovi - igrac.dobijeniSetovi,
                igrac.dobijeniPoeni,
                igrac.odigraniPoeni - igrac.dobijeniPoeni
            );
            lista.push(noviigraci);
        });
        return res.send(new Response(lista, "Success", true));
    }
    return res.send(new Response(igraci, "Tim nema igraca", false));
});

router.put('/editPhoto', passport.authenticate('jwt', {session: false}),
    upload.single('slika'), 
    async (req, res)=>{
    var igrac = await igracservice.addPhoto(req);
    if(igrac!=null)
    {
        return res.send(new Response(igrac, "Success", true));
    }
    return res.send(new Response(igrac, "Greska prilikom izmene igraca", false));
})


router.put('/', passport.authenticate('jwt', {session: false}), 
    async (req, res)=>{
    var igrac = await igracservice.updateIgrac(req.body);
    if(igrac!=null)
    {
        return res.send(new Response(igrac, "Success", true));
    }
    return res.send(new Response(igrac, "Greska prilikom izmene igraca", false));
})

router.delete("/:id", passport.authenticate('jwt', {session: false}), 
    async (req, res)=>{
    var igrac = await igracservice.deleteIgrac(req.params.id)

    if(igrac!=null)
    {
        return res.send(new Response(igrac, "Success", true));
    }
    return res.send(new Response(igrac, "Greska prilikom brisanja igraca", false));
});

router.post('/dodajpartiju', passport.authenticate('jwt', {session: false}),
    async (req, res)=>{
    var result = await igracservice.dodajPartiju(req.body);
    if(result == 0)
        return res.send(new Response(null, "Greska prilikom dodavanja partije", false));
    return res.send(new Response(result, "Success", true));
});

module.exports = router;