var express = require("express");
var router = express.Router();
var teamservice = require("../services/tim");
const Response = require("../models/ResponseResult")
const rasporedViewModel = require("../models/viewmodels/rasporedViewModel");
var rezultatservice = require("../services/rezultat");
var passport = require("./config");
const upload = require("../middleware/upload")

router.post('/', passport.authenticate('jwt', {session: false}), 
    async (req, res)=>{

    var timovi = await teamservice.getAll(req.body.liga);
    if(timovi == null || timovi.length == 0)
        return res.send(new Response(null, "Nema timova u datoj ligi", false));
    var rezultat = rezultatservice.dodajParove(timovi);

    if(rezultat==null)
    {
        return res.send(new Response(rezultat, "Greska prilikom dodavanja parova", false));
    }

    return res.send(new Response(rezultat, "Success", true));
    
});

router.get('/:liga', async (req, res)=>{
    var raspored = await rezultatservice.getParove(req.params.liga);
    raspored.sort((a,b)=>(a.kolo>b.kolo) ? 1 : -1);

    if(raspored == null || raspored.length<1)
        return res.send(new Response(raspored, "Raspored i dalje nije formiran", false));
    
    var kolo = raspored[0].kolo;
    kola = []
    lista = []

    raspored.forEach(ras=>{
        if(ras.kolo != kolo)
        {
            kolo = ras.kolo;
            lista.push(kola);
            kola = [];
        }

        if(ras.tim1rezultat)
        {
            var rasViewModel = new rasporedViewModel(
                ras._id,
                ras.tim1,
                ras.tim2,
                ras.tim1naziv,
                ras.tim2naziv,
                ras.liga,
                ras.kolo,
                ras.tim1rezultat,
                ras.tim2rezultat,
                ras.slika
            )
        }
        else{
            var rasViewModel = new rasporedViewModel(
                ras._id,
                ras.tim1,
                ras.tim2,
                ras.tim1naziv,
                ras.tim2naziv,
                ras.liga,
                ras.kolo
            )
        }
        kola.push(rasViewModel);
    })
    lista.push(kola);
    if(lista==null || lista.length<1)
    {
        return res.send(new Response(lista, "Raspored i dalje nije formiran", false));
    }
    return res.send(new Response(lista, "Success", true));
});

module.exports = router;