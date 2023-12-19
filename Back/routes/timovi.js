var express = require("express");
var timservice = require("../services/tim");
var igracservice = require("../services/igrac");
var rezultatservice = require("../services/rezultat");
const dublViewModel = require("../models/viewmodels/dublViewModel");
const timRankViewModel = require("../models/viewmodels/timRankViewModel");
const timViewModel = require("../models/viewmodels/timViewModel");
const Response = require("../models/ResponseResult")
var passport = require("./config");
const upload = require("../middleware/upload")

var router = express.Router();
router.post('/', passport.authenticate('jwt', {session: false}), 
    async (req, res)=>{
    var novitim = await timservice.save(req.body);
    if(novitim!=null)
    {
        return res.send(new Response(novitim, "Success", true));
    }
    return res.send(new Response(novitim, "Greska prilikom dodavanja tima", false));
})

router.get('/teaminfo/:idlige', async (req, res)=>{
    var timovi = await timservice.getTeamInfo(req.params.idlige);
    var lista = [];
    timovi.forEach(tim=>{
        var novitim = new timViewModel(
            tim._id,
            tim.naziv,
            tim.kapiten,
            tim.kontakt,
            tim.igraci,
        )
        lista.push(novitim)
    })
    if(lista.length == 0)
        return res.send(new Response(lista, "Nema timova", false));
    return res.send(new Response(lista, "Success", true));
})

router.get('/:idlige', async (req, res)=>{
    var timovi = await timservice.getAll(req.params.idlige);
    var lista = [];
    timovi.forEach(tim=>{
        var novitim = new timRankViewModel(
            tim._id,
            tim.naziv,
            tim.kapiten,
            tim.kontakt,
            tim.odigraniMecevi,
            tim.dobijeniMecevi,
            tim.nereseniMecevi,
            tim.odigraniMecevi - tim.dobijeniMecevi - tim.nereseniMecevi,
            tim.dobijenePartije,
            tim.odigranePartije - tim.dobijenePartije,
            tim.dobijeniMecevi * 3 + tim.nereseniMecevi
        )
        lista.push(novitim)
    })
    if(lista.length == 0)
        return res.send(new Response(lista, "Nema timova", false));
    return res.send(new Response(lista, "Success", true));
})

router.get("/:dubl", async(req, res) => {
    var dublovi = await timservice.getAll(req.params.dubl);

    if(dublovi.length>0)
    {
        var lista = [];
        dublovi.forEach(dubl => {
            novidubl = new dublViewModel(
                dubl._id,
                dubl.naziv,
                dubl.dublOdigrane,
                dubl.dublDobijene,
                dubl.dublOdigrane - dubl.dublDobijene,
                dubl.dublDobijeniSetovi,
                dubl.dublOdigraniSetovi - dubl.dublDobijeniSetovi
            )
            lista.push(novidubl);
        });
        return res.send(new Response(lista, "Success", true));
    }
    return res.send(new Response(lista, "Nema timova", false));
})
router.get('/:id', async (req, res)=>{
    var tim = await timservice.getTeam(req.params.id);
    if(tim != null)
    {
        return res.send(new Response(tim, "Success", true));
    }
    return res.send(new Response(tim, "Tim sa ovim id-jem ne postoji", false));
})

router.put('/', passport.authenticate('jwt', {session: false}), 
    async (req, res)=>{
    var tim = await timservice.updateTeam(req.body);
    var rezservice = await rezultatservice.updateIme(req.body)
    if(tim != null)
    {
        return res.send(new Response(tim, "Success", true));
    }
    return res.send(new Response(tim, "Greska prilikom izmene tima", false));
})

router.delete("/:id", passport.authenticate('jwt', {session: false}), 
    async (req, res)=>{
    var tim = await timservice.deleteTeam(req.params.id)

    if(tim==null)
    {
        return res.send(new Response(tim, "Greska prilikom brisanja tima", false));
    }

    var rezultat = rezultatservice.deleteRezultat(req.params.id);
    if(!rezultat)
    {
        return res.send(new Response(tim, "Greska prilikom rezultata tima", false));
    }

    var result = igracservice.deleteIgraci(tim);
    if(!result)
    {
        return res.send(new Response(tim, "Greska prilikom brisanja timova igraca", false));
    }
    console.log(rezultat);
    return res.send(new Response(tim, "Success", true));
});

router.post('/dodajmec', 
    upload.single('slika'),
    async (req, res)=>{
    var novitim = await timservice.dodajMec(req.body);
    if(novitim == 0)
        return res.send(new Response(null, "Greska prilikom dodavanja meca", false));

    var rezultat = await rezultatservice.dodajRezultat(req);
    if(rezultat!=1)
        return res.send(new Response(null, "Greska prilikom dodavanja slike", false));
    return res.send(new Response(rezultat, "Success", true));
})

module.exports = router