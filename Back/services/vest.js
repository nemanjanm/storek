var vestModel = require("../models/vest");

var save = async function(vest)
{
    return await vestModel.dodajVest(vest);
}

var get = async function(id)
{
    return await vestModel.findById(id);
}

var getAll = async function()
{
    return await vestModel.find();
}

var updateVest = async function(body)
{
    return await vestModel.updateVest(body);
}

var deleteVest = async function(id)
{
    return await vestModel.findByIdAndDelete(id);
}

module.exports = {
    save,
    get,
    getAll,
    updateVest,
    deleteVest
}