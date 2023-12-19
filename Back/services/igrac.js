var igracModel = require("../models/igrac");

var save = async function(igrac)
{
    return await igracModel.dodajIgraca(igrac);
}

var get = async function(id)
{
    return await igracModel.findById(id).populate("tim");
}

var getAll = async function(brojlige)
{
    return await igracModel.find().populate({path: "tim", match: {liga: brojlige}})
}

var getByTeam = async function(id)
{
    return await igracModel.find({tim: id}).populate("tim");
}

var updateIgrac = async function(body)
{
    var igrac =  await igracModel.updateIgrac(body);
    return igrac;
}

var dodajPartiju = async function(body)
{
    return await igracModel.dodajPartiju(body);
}

var deleteIgrac = async function(id)
{
    return await igracModel.deleteById(id);
}

var deleteIgraci = async function(tim)
{
    tim.igraci.forEach(igrac => {
        igracModel.obrisiTim(igrac)
    });
    return true;
}

var addPhoto = async function(req)
{
    return await igracModel.addPhoto(req);
}
module.exports = {
    save,
    get,
    getByTeam,
    updateIgrac,
    dodajPartiju,
    getAll,
    deleteIgrac,
    deleteIgraci,
    addPhoto
}