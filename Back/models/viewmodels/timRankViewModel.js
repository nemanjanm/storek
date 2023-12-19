class timRankViewModel
{
    constructor(idekipe, nazivEkipe, kapiten, kontakt, ukupnoMeceva, pobede, nereseno, porazi, dobijeniSetovi, izgubljeniSetovi, bodovi)
    {
        this.idekipe = idekipe;
        this.nazivEkipe = nazivEkipe;
        this.kapiten = kapiten;
        this.kontakt = kontakt;
        this.ukupnoMeceva = ukupnoMeceva;
        this.pobede = pobede;
        this.nereseno = nereseno;
        this.porazi = porazi;
        this.dobijeniSetovi = dobijeniSetovi;
        this.izgubljeniSetovi = izgubljeniSetovi;
        this.bodovi = bodovi;
    }
}
module.exports = timRankViewModel;