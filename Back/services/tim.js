var timModel = require("../models/tim");

var save = async function(team)
{
    return await timModel.saveTeam(team);
}

var getAll = async function(liga)
{
    return await timModel.find({liga: liga}).populate("igraci")
}

var getTeam = async function(id)
{
    return await timModel.findById(id);
}

var getTeamInfo = async function(liga)
{
    return await timModel.find({liga: liga}).populate("igraci")
}

var updateTeam = async function(body)
{
    var team =  await timModel.updateTeam(body);
    return team;
}

var deleteTeam = async function(id)
{
    return await timModel.findByIdAndDelete(id);
}

var dodajMec = async function(body)
{
    return await timModel.dodajMec(body);
}

module.exports = {
    save,
    getAll,
    getTeam,
    updateTeam,
    dodajMec,
    deleteTeam,
    getTeamInfo
}