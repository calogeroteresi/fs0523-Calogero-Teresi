var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Implementazione della classe astratta LavoratoreAutonomo
var LavoratoreAutonomo = /** @class */ (function () {
    function LavoratoreAutonomo(codredd, redditoannuolordo, tasseinps, tasseirpef) {
        this.codredd = codredd;
        this.redditoannuolordo = redditoannuolordo;
        this.tasseinps = tasseinps;
        this.tasseirpef = tasseirpef;
    }
    LavoratoreAutonomo.prototype.getTasseInps = function () {
        return this.redditoannuolordo * (this.tasseinps / 100); // Calcolo delle tasse INPS basato su percentuale
    };
    LavoratoreAutonomo.prototype.getTasseIrpef = function () {
        var scaglioniIRPEF = [15000, 28000, 50000];
        var aliquoteIRPEF = [0.23, 0.25, 0.35, 0.43];
        var tasseIRPEF = 0;
        var redditoRimanente = this.redditoannuolordo;
        for (var i = 0; i < scaglioniIRPEF.length; i++) {
            if (redditoRimanente > scaglioniIRPEF[i]) {
                var trattoReddito = i < scaglioniIRPEF.length - 1 ? Math.min(redditoRimanente - scaglioniIRPEF[i], scaglioniIRPEF[i + 1] - scaglioniIRPEF[i]) : redditoRimanente - scaglioniIRPEF[i];
                tasseIRPEF += trattoReddito * aliquoteIRPEF[i];
            }
            else {
                break;
            }
        }
        return tasseIRPEF;
    };
    LavoratoreAutonomo.prototype.getredditoannuonetto = function () {
        return this.redditoannuolordo - this.getUtileTasse() - this.getContributoPensionistico();
    };
    return LavoratoreAutonomo;
}());
var Lavoratore = /** @class */ (function (_super) {
    __extends(Lavoratore, _super);
    function Lavoratore(codredd, redditoannuolordo, età) {
        var _this = this;
        var tasseinps = 0;
        var tasseirpef = 0;
        _this = _super.call(this, codredd, redditoannuolordo, tasseinps, tasseirpef) || this;
        _this.età = età; // Assegnamento dell'età
        return _this;
    }
    Lavoratore.prototype.getUtileTasse = function () {
        return this.getTasseInps() + this.getTasseIrpef();
    };
    Lavoratore.prototype.getContributoPensionistico = function () {
        var aliquotaPensionisticaMaggiore21 = 24;
        var aliquotaPensionisticaMinore21 = 22.8;
        var aliquotaPensionistica = this.età > 21 ? aliquotaPensionisticaMaggiore21 : aliquotaPensionisticaMinore21;
        return this.redditoannuolordo * (aliquotaPensionistica / 100);
    };
    return Lavoratore;
}(LavoratoreAutonomo));
var lavoratore1 = new Lavoratore(1, 50000, 25);
console.log("Reddito netto lavoratore 1:", lavoratore1.getredditoannuonetto());
var lavoratore2 = new Lavoratore(2, 75000, 30);
console.log("Reddito netto lavoratore 2:", lavoratore2.getredditoannuonetto());
