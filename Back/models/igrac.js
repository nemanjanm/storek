var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TimModel = require("./tim");
var IgracSchema = new Schema({
    imeIprezime: {type: String, required: true},
    tim: {type: mongoose.Schema.Types.ObjectId, ref: "tim"},
    slika: {type: String},
    odigraniMecevi: {type: Number, required: true},
    dobijeniMecevi: {type: Number, required: true},
    odigraniSetovi: {type: Number, required: true},
    dobijeniSetovi: {type: Number, required: true},
    odigraniPoeni: {type: Number, required: true},
    dobijeniPoeni: {type: Number, required: true}
})

var IgracModel = mongoose.model("igrac", IgracSchema);

IgracModel.dodajIgraca = async function(igrac)
{
    let noviIgrac = new IgracModel({
        imeIprezime: igrac.body.ime,
        tim: igrac.body.tim,
        odigraniMecevi: 0,
        dobijeniMecevi: 0,
        odigraniSetovi: 0,
        dobijeniSetovi: 0,
        odigraniPoeni: 0,
        dobijeniPoeni: 0
    });
    
    if(igrac.file != null){
        noviIgrac.slika = igrac.file.path
    }
    else{
        noviIgrac.slika = "uploads\\default.jpg"
    }
    noviIgrac.save().then(igrac=>{
        return TimModel.findOneAndUpdate(igrac.tim,
        {
            $push: {igraci: noviIgrac._id}
        })
    });
    return noviIgrac;
}

IgracModel.addPhoto = async function(req)
{
    var igrac = await IgracModel.findById(req.body._id);
    if(req.file != null)
    {
        igrac.slika = req.file.path;
    }
    return igrac.save();
}

IgracModel.updateIgrac = async function(body)
{
    var igrac = await IgracModel.findById(body._id);
    if(body.imeIprezime!=null)
    {
        igrac.imeIprezime = body.imeIprezime;
    }

    if(body.tim != null)
    {
        pom = igrac.tim;

        igrac.tim = new mongoose.Types.ObjectId(body.tim);
        console.log(body.tim);
        igrac.save()        
        .then(body=>{
            return TimModel.findOneAndUpdate(body.tim,
            {
                $push: {igraci: igrac._id}
            })
        })

        var tim = TimModel.findOneAndUpdate(pom, {
            $pullAll : {igraci: [igrac._id.toString()]}
        })
        return tim;
    }
    return igrac.save();
}

IgracModel.dodajPartiju = async function(body)
{
    for(i=1;i<=10;i++)
    {
        if(i==4)
        {
            TimModel.dodajDubl(igrac1.tim, igrac2.tim, parseInt(body["m"+i+"set1"]), parseInt(body["m"+i+"set2"]))
            continue;
        }
        var igrac1 = await IgracModel.findById(body["m"+i+"id1"]);
        var igrac2 = await IgracModel.findById(body["m"+i+"id2"]);
        console.log(igrac1);
        igrac1.odigraniMecevi += 1;
        igrac2.odigraniMecevi += 1;
        
        if(parseInt(body["m"+i+"set1"]) > parseInt(body["m"+i+"set2"]))
        {
            igrac1.dobijeniMecevi+=1;
        }
        else
        {
            igrac2.dobijeniMecevi+=1;
        }

        var ukupnoSetova = parseInt(body["m"+i+"set1"])+parseInt(body["m"+i+"set2"]);
        igrac1.odigraniSetovi +=  ukupnoSetova;
        igrac2.odigraniSetovi += ukupnoSetova;

        igrac1.dobijeniSetovi += parseInt(body["m"+i+"set1"]);
        igrac2.dobijeniSetovi += parseInt(body["m"+i+"set2"]);

        var ukupnoPoena = 0;
        for(j=1;j<=ukupnoSetova;j++)
        {
            ukupnoPoena += parseInt(body["m"+i+"set"+j+"poen1"]) + parseInt(body["m"+i+"set"+j+"poen2"]);
            igrac1.dobijeniPoeni += parseInt(body["m"+i+"set"+j+"poen1"]);
            igrac2.dobijeniPoeni += parseInt(body["m"+i+"set"+j+"poen2"]);
        }

        igrac1.odigraniPoeni += ukupnoPoena;
        igrac2.odigraniPoeni += ukupnoPoena;

        await igrac1.save();
        await igrac2.save();
    }
    return 1;
}

IgracModel.deleteById = async function(id)
{
    var status = await IgracModel.findByIdAndDelete(id).then(async function(igrac){
        if(typeof igrac !== "undefined" && igrac)
        {
            var tim = await TimModel.findOneAndUpdate(igrac.tim, {
                $pullAll : {igraci: [igrac._id.toString()]}
            })
            return true;
        }
        return false;
    })

    return status;
}

IgracModel.obrisiTim = async function(id)
{
    var pom = new mongoose.Types.ObjectId("65612a9411858499b38a4c6a");
    var igrac = await IgracModel.findById(id);
    igrac.tim = new mongoose.Types.ObjectId("65612a9411858499b38a4c6a");
    igrac.save()
    .then(pom=>{
        console.log(pom);
        return TimModel.findByIdAndUpdate("65612a9411858499b38a4c6a",
            {
                $push: {igraci: id}
            })
    })

    return igrac;
}
module.exports = IgracModel;