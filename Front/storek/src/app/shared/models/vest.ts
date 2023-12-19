export interface Vest{
    _id: string;
    naslov: string;
    sadrzaj: string;
    datumKreiranja: Date;
    datumIzmene?: Date;
    izmenjeno?: Boolean;
}