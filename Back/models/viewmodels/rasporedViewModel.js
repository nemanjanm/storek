class rasporedViewModel
{
    constructor(
        _id, 
        tim1, 
        tim2,
        tim1naziv, 
        tim2naziv, 
        liga, 
        kolo,
        tim1rezultat, 
        tim2rezultat, 
        slika, 
    )
    {
        this._id = _id;
        this.tim1 = tim1;
        this.tim2 = tim2;
        this.tim1naziv = tim1naziv;
        this.tim2naziv = tim2naziv;
        this.liga = liga;
        this.kolo = kolo;
        this.tim1rezultat = tim1rezultat;
        this.tim2rezultat = tim2rezultat;
        this.slika = slika;
    }
}

module.exports = rasporedViewModel;