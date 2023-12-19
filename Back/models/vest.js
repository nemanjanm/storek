var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VestSchema = new Schema({
    naslov: {type: String, required: true},
    sadrzaj: {type: String, required: true},
    datumKreiranja: {type: Date, required: true},
    izmenjeno: {type: Boolean},
    datumIzmene: {type: Date}
})

var VestModel = mongoose.model("vest", VestSchema);

VestModel.dodajVest = function(vest)
{
    var vest = new VestModel({
        naslov: vest.naslov,
        sadrzaj: vest.sadrzaj,
        datumKreiranja: new Date()
    });

    vest.save();
    return vest;
}

VestModel.updateVest = async function(body)
{
    var vest = await VestModel.findById(body._id);
    vest.naslov = body.naslov;
    vest.sadrzaj = body.sadrzaj;
    vest.izmenjeno = true;
    vest.datumIzmene = new Date();

    vest.save();
    return vest;
}

module.exports = VestModel;