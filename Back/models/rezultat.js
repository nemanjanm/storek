var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RezultatSchema = new Schema({
    tim1: {type: mongoose.Schema.Types.ObjectId, ref: "tim"},
    tim2: {type: mongoose.Schema.Types.ObjectId, ref: "tim"},
    tim1naziv: {type: String, require: true},
    tim2naziv: {type: String, require: true},
    tim1rezultat: {type: Number},
    tim2rezultat: {type: Number},
    kolo: {type: Number, required: true},
    liga: {type: Number, required: true},
    slika: {type: String},
})

var RezultatModel = mongoose.model("rezultat", RezultatSchema);

RezultatModel.dodajParove = async function(timovi)
{
    brojMeceva = (timovi.length*(timovi.length-1))/2;

    for(i=0; i<timovi.length; i++)
    {
        timovi[i].pozicija = i+1;
    }

    znak = 0;
    kola = 0;
    pola = 0;

    if(timovi.length%2==1)
    {
        kola = timovi.length;
        pola = timovi.length/2 + 1; 
    }
    else
    {
        kola = timovi.length-1;
        pola = timovi.length/2; 
    }
    for(i=1;i<=kola;i++) //ovo su kola
    {
        for(j=1;j<=pola;j++)//tim po tim
        {
            znak = 0;
            znak2 = 0;
            pom1 = 0;
            pom2 = 0;
            for(k=0;k<timovi.length;k++)
            {   
                if(timovi[k].pozicija == j)
                {
                    var tim1id = timovi[k]._id;
                    var tim1naziv = timovi[k].naziv;
                    
                    pom1 = k;
                    znak2 = 1;
                }
                //za paran broj timova
                else if(timovi.length%2 == 0 && timovi[k].pozicija == timovi.length+1-j)
                {
                    var tim2id = timovi[k]._id;
                    var tim2naziv = timovi[k].naziv;

                    pom2 = k;
                    znak = 1;
                }
                else if(timovi.length%2 == 1 && timovi[k].pozicija == timovi.length+2-j)
                {
                    var tim2id = timovi[k]._id;
                    var tim2naziv = timovi[k].naziv;

                    pom2 = k;
                    znak = 1;
                }
            }
            if(k==timovi.length && znak==1 && znak2 == 1)
            {
                if(i%2 == 1)
                {
                    timovi[pom1].domacinstva+=1;
                    timovi[pom2].gostovanja+=1;
                }
                else
                {
                    timovi[pom1].gostovanja+=1;
                    timovi[pom2].domacinstva+=1;
                }   
                
                if(i%2==0)
                {
                    let noviPar = new RezultatModel({
                        tim1: tim2id,
                        tim2: tim1id,
                        liga: timovi[j].liga,
                        tim1naziv: tim2naziv,
                        tim2naziv: tim1naziv,
                        kolo: i
                    });
                    await noviPar.save();
                }
                else
                {
                    let noviPar = new RezultatModel({
                        tim1: tim1id,
                        tim2: tim2id,
                        liga: timovi[j].liga,
                        tim1naziv: tim1naziv,
                        tim2naziv: tim2naziv,
                        kolo: i
                    });
                    await noviPar.save();
                }
            }
        }
        
        if(timovi.length%2==1)
        {
            for(j=0;j<timovi.length+1;j++)
            {
                if(timovi[j] && timovi[j].pozicija == 1)
                {
                    continue;
                }
                if(timovi[j] && timovi[j].pozicija == timovi.length+1)
                {
                    timovi[j].pozicija = 2;
                    continue;
                }
                if(timovi[j])
                    timovi[j].pozicija++;
            }
        }

        else{
            for(j=0;j<timovi.length;j++)
            {
                if(timovi[j].pozicija == 1)
                {
                    continue;
                }
                if(timovi[j].pozicija == timovi.length)
                {
                    timovi[j].pozicija = 2;
                    continue;
                }
                timovi[j].pozicija++;
            }
        }
    }

    // for(i=0;i<timovi.length;i++)
    //     console.log(timovi[i]);
    for(i=0;i<timovi.length;i++)
        console.log(timovi[i]);

    //ispitujem da li ima vise domacinstava nego sto bi trebalo
    for(i=0;i<timovi.length;i++)
    {
        if(timovi[i].domacinstva - timovi[i].gostovanja >=2)
        {
            for(j=0;j<timovi.length;j++)
            {
                if(timovi[j].gostovanja - timovi[j].domacinstva >=1)
                {
                    var rezultat = await RezultatModel.findOne({tim1: timovi[i]._id, tim2: timovi[j]._id});
                    if(rezultat == null)
                        continue;
                    pom1ime = rezultat.tim1naziv;
                    pom2ime = rezultat.tim2naziv;

                    pom1id = rezultat.tim1id;
                    pom2id = rezultat.tim2id;

                    rezultat.tim1id = pom2id;
                    rezultat.tim2id = pom1id;
                    rezultat.tim1naziv = pom2ime;
                    rezultat.tim2naziv = pom1ime;

                    await rezultat.save();

                    timovi[i].domacinstva -=1;
                    timovi[i].gostovanja +=1;

                    timovi[j].domacinstva +=1;
                    timovi[j].gostovanja -=1;

                    if(timovi[i].domacinstva - timovi[i].gostovanja >=2)
                        i--;
                    break;
                }
            }
        }
        else if(timovi[i].gostovanja - timovi[i].domacinstva >=2)
        {
            for(j=0;j<timovi.length;j++)
            {
                if(timovi[j].domacinstva - timovi[j].gostovanja >=1)
                {
                    var rezultat = await RezultatModel.findOne({tim1: timovi[j]._id, tim2: timovi[i]._id});
                    if(rezultat == null)
                        continue;
                    pom1ime = rezultat.tim1naziv;
                    pom2ime = rezultat.tim2naziv;

                    pom1id = rezultat.tim1id;
                    pom2id = rezultat.tim2id;

                    rezultat.tim1id = pom2id;
                    rezultat.tim2id = pom1id;
                    rezultat.tim1naziv = pom2ime;
                    rezultat.tim2naziv = pom1ime;

                    await rezultat.save();

                    timovi[i].gostovanja -=1;
                    timovi[i].domacinstva +=1;

                    timovi[j].domacinstva -=1;
                    timovi[j].gostovanja +=1;

                    if(timovi[i].gostovanja - timovi[i].domacinstva >=2)
                        i--;
                    break;
                }
            }
        }
    }
    console.log("-----------------------------------");
    for(i=0;i<timovi.length;i++)
        console.log(timovi[i]);

    return true;
}

RezultatModel.dodajRezultat = async function(req)
{
    var par = await RezultatModel.findOne({liga: 1, tim1: req.body.id1, tim2:req.body.id2});
    par.tim1rezultat = req.body.rez1;
    par.tim2rezultat = req.body.rez2;
    par.slika = req.file.path;
    par.save();

    return 1;
}

RezultatModel.updateIme = async function(body)
{
    var parovi = await RezultatModel.find({tim1: body._id});
    parovi.forEach(par => {
        par.tim1naziv = body.naziv;
        par.save();
    });
    var parovi2 = await RezultatModel.find({tim2: body._id});
    parovi2.forEach(par => {
        par.tim2naziv = body.naziv;
        par.save();
    });
}

RezultatModel.obrisiRezultat = async function(id)
{
    var parovi = await RezultatModel.find({tim1: id});
    parovi.forEach(par => {
        par.deleteOne();
    });
    var parovi2 = await RezultatModel.find({tim2: id});
    parovi2.forEach(par => {
        par.deleteOne();
    });
}
module.exports = RezultatModel;