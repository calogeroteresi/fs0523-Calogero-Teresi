var Smartphone = /** @class */ (function () {
    function Smartphone() {
        this.carica = 0;
        this.numeroChiamate = 0;
        this.costoMinuto = 0.21;
        this.registroChiamate = [];
    }
    Smartphone.prototype.formatDateTime = function (date) {
        return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    };
    Smartphone.prototype.ricarica = function (euro) {
        this.carica += euro;
    };
    Smartphone.prototype.numero404 = function () {
        return "Credito residuo: ".concat(this.carica.toFixed(2), " \u20AC");
    };
    Smartphone.prototype.getNumeroChiamate = function () {
        return this.numeroChiamate;
    };
    Smartphone.prototype.chiamata = function (numeroTelefono, min) {
        if (typeof numeroTelefono !== 'number' || typeof min !== 'number' || min <= 0) {
            throw new Error("Chiamata non valida");
        }
        var costoChiamata = min * this.costoMinuto;
        if (this.carica < costoChiamata) {
            throw new Error("Credito insufficiente per effettuare la chiamata");
        }
        this.carica -= costoChiamata;
        this.numeroChiamate++;
        var nuovaChiamata = {
            id: numeroTelefono,
            durata: min,
            dataOra: new Date(Date.now() + 3600000)
        };
        this.registroChiamate.push(nuovaChiamata);
    };
    Smartphone.prototype.azzeraChiamate = function () {
        this.numeroChiamate = 0;
        this.registroChiamate = [];
    };
    Smartphone.prototype.mostraRegistroChiamate = function () {
        var _this = this;
        return this.registroChiamate.map(function (chiamata) { return ({
            id: chiamata.id,
            durata: chiamata.durata,
            dataOra: _this.formatDateTime(chiamata.dataOra)
        }); });
    };
    Smartphone.prototype.filtraChiamatePerDataOra = function (filtro) {
        var _this = this;
        var day = filtro.day, month = filtro.month, year = filtro.year, hours = filtro.hours, minutes = filtro.minutes;
        var chiamateFormattate = this.registroChiamate
            .filter(function (chiamata) {
            var dataChiamata = chiamata.dataOra;
            return ((day === undefined || dataChiamata.getDate() === day) &&
                (month === undefined || dataChiamata.getMonth() + 1 === month) &&
                (year === undefined || dataChiamata.getFullYear() === year) &&
                (hours === undefined || dataChiamata.getHours() === hours) &&
                (minutes === undefined || dataChiamata.getMinutes() === minutes));
        })
            .map(function (chiamata) { return ({
            id: chiamata.id,
            durata: chiamata.durata,
            dataOra: _this.formatDateTime(chiamata.dataOra)
        }); });
        return chiamateFormattate;
    };
    return Smartphone;
}());
var phone1 = new Smartphone();
var phone2 = new Smartphone();
var phone3 = new Smartphone();
phone1.ricarica(20);
phone1.chiamata(3895554352, 5);
phone1.chiamata(3335489452, 5);
phone1.chiamata(3902511475, 5);
console.log(phone1.mostraRegistroChiamate());
console.log(phone1.getNumeroChiamate());
console.log("Numero di chiamate phone1:", phone1.getNumeroChiamate());
phone1.azzeraChiamate();
console.log(phone1.mostraRegistroChiamate());
console.log("Credito residuo phone1:", phone1.numero404());
phone2.ricarica(15);
phone2.chiamata(3215452311, 8);
console.log(phone2.filtraChiamatePerDataOra({ year: 2023, month: 11, day: 24 }));
console.log("Numero di chiamate phone2:", phone2.getNumeroChiamate());
console.log("Credito residuo phone2:", phone2.numero404());
phone3.ricarica(30);
phone3.chiamata(3715896789, 10);
console.log(phone3.filtraChiamatePerDataOra({ hours: 10, minutes: 30 }));
console.log("Numero di chiamate phone3:", phone3.getNumeroChiamate());
console.log("Credito residuo phone3:", phone3.numero404());
