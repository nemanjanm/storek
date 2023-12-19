var rezultatModel = require("../models/rezultat");
var timoviModel = require("../models/tim");

var dodajParove = async function(timovi)
{
    return await rezultatModel.dodajParove(timovi);
}

var getParove = async function(liga)
{
    return await rezultatModel.find({liga: liga})
}

var dodajRezultat = async function(req)
{
    return await rezultatModel.dodajRezultat(req);
}

var deleteRezultat = async function(id)
{
    rezultatModel.obrisiRezultat(id);
    return true;
}

var updateIme = async function(body)
{
    return await rezultatModel.updateIme(body);
}
module.exports = {
    dodajParove,
    getParove,
    dodajRezultat,
    updateIme,
    deleteRezultat
}