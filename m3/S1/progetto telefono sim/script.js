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
