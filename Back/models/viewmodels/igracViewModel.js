class igracViewModel
{
    constructor(
        imeIprezime, 
        idIgraca, 
        slika,
        nazivEkipe, 
        idEkipe, 
        ukupnoMeceva, 
        pobede, 
        porazi, 
        dobijeniSetovi, 
        izgubljeniSetovi,
        dobijeniPoeni,
        izbubljeniPoeni,
    )
    {
        this.imeIprezime = imeIprezime;
        this.idIgraca = idIgraca;
        this.slika = slika;
        this.nazivEkipe = nazivEkipe;
        this.idEkipe = idEkipe;
        this.ukupnoMeceva = ukupnoMeceva;
        this.pobede = pobede;
        this.porazi = porazi;
        this.dobijeniSetovi = dobijeniSetovi;
        this.izgubljeniSetovi = izgubljeniSetovi;
        this.dobijeniPoeni = dobijeniPoeni;
        this.izbubljeniPoeni = izbubljeniPoeni;
    }
}

module.exports = igracViewModel;