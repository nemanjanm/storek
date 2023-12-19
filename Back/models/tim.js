var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TimSchema = new Schema({
    naziv: {type: String, required: true},
    liga: {type: Number, required: true},
    kapiten: {type: String, required: true},
    kontakt: {type: String, required: true},
    igraci: [{type: Schema.Types.ObjectId, ref: "igrac"}],
    pozicija: {type: Number, required: true},
    odigraniMecevi: {type: Number, required: true},
    dobijeniMecevi: {type: Number, required: true},
    nereseniMecevi: {type: Number, required: true},
    odigranePartije: {type: Number, required: true},
    dobijenePartije: {type: Number, required: true},
    dublOdigrane: {type: Number, required: true},
    dublDobijene: {type: Number, required: true},
    dublOdigraniSetovi: {type: Number, required: true},
    dublDobijeniSetovi: {type: Number, required: true},
    domacinstva: {type: Number, required: true},
    gostovanja: {type: Number, required: true}
})

var TimModel = mongoose.model("tim", TimSchema);

TimModel.saveTeam = function(tim)
{
    var t = new TimModel({
        naziv: tim.naziv,
        liga: tim.liga,
        kontakt: tim.kontakt,
        kapiten: tim.kapiten,
        pozicija: 0,
        odigraniMecevi: 0,
        dobijeniMecevi: 0,
        nereseniMecevi: 0,
        odigranePartije: 0,
        dobijenePartije: 0,
        dublOdigrane: 0,
        dublDobijene: 0,
        dublOdigraniSetovi: 0,
        dublDobijeniSetovi: 0,
        domacinstva: 0,
        gostovanja: 0
    });
    t.save();
    return t;
}

TimModel.updateTeam = async function(body)
{
    var team = await TimModel.findById(body._id);
    if(body.naziv != null)
    {
        team.naziv = body.naziv;
    }
    if(body.liga != null)
    {
        team.liga = body.liga;
    }
    if(body.kapiten!=null)
    {
        team.kapiten = body.kapiten;
    }
    if(body.kontakt!=null)
    {
        team.kontakt = body.kontakt;
    }
    team.save();
    return team;
}

TimModel.dodajMec = async function(body)
{
    var team1 = await TimModel.findById(body.id1);
    var team2 = await TimModel.findById(body.id2);

    team1.odigraniMecevi+=1;
    team2.odigraniMecevi+=1;
    
    team1.odigranePartije+=10;
    team2.odigranePartije+=10;

    team1.dobijenePartije+=parseInt(body.rez1);
    team2.dobijenePartije+=parseInt(body.rez2);
    
    if(body.rez1 == body.rez2 && parseInt(body.rez1)+parseInt(body.rez2) == 10)
    {
        team1.nereseniMecevi+=1;
        team2.nereseniMecevi+=1;
    }

    else if(body.rez1 > body.rez2 && parseInt(body.rez1)+parseInt(body.rez2)  == 10)
    {
        team1.dobijeniMecevi+=1;
    }

    else if(body.rez1 < body.rez2 && parseInt(body.rez1)+parseInt(body.rez2)  == 10)
    {
        team2.dobijeniMecevi+=1;
    }
    else
        return 0;
    team1.save();
    team2.save();
    
    return 1;
}

TimModel.dodajDubl = async function(id1, id2, set1, set2)
{
    var team1 = await TimModel.findById(id1);
    var team2 = await TimModel.findById(id2);

    team1.dublOdigrane += 1;
    team2.dublOdigrane += 1;

    team1.dublOdigraniSetovi += set1+set2;
    team2.dublOdigraniSetovi += set1+set2;
    
    if(set1>set2)
    {
        team1.dublDobijene += 1;
    }
    else
    {
        team2.dublDobijene += 1;
    }

    team1.dublDobijeniSetovi += set1;
    team2.dublDobijeniSetovi += set2;

    team1.save();
    team2.save();
    return 1;
}

module.exports = TimModel;