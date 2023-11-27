interface Sim {
     carica: number;
     numeroChiamate: number;
     costoMinuto: number;
     registroChiamate: {
          id: number;
          durata: number;
          dataOra: Date;
     }[];
     ricarica(euro: number): void;
     numero404(): string;
     getNumeroChiamate(): number;
     chiamata(numeroTelefono: number, min: number): void;
     azzeraChiamate(): void;
     mostraRegistroChiamate(): { id: number; durata: number; dataOra: string }[];
     filtraChiamatePerDataOra(filtro: FiltroData): { id: number; durata: number; dataOra: string }[];
}


interface FiltroData {
     day?: number;
     month?: number;
     year?: number;
     hours?: number;
     minutes?: number;
}


class Smartphone implements Sim {
     carica: number;
     numeroChiamate: number;
     costoMinuto: number;
     registroChiamate: {
          id: number;
          durata: number;
          dataOra: Date;
     }[];

     constructor() {
          this.carica = 0;
          this.numeroChiamate = 0;
          this.costoMinuto = 0.21;
          this.registroChiamate = [];
     }

     formatDateTime(date: Date): string {
          return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
     }

     ricarica(euro: number): void {
          this.carica += euro;
     }

     numero404(): string {
          return `Credito residuo: ${this.carica.toFixed(2)} €`;
     }

     getNumeroChiamate(): number {
          return this.numeroChiamate;
     }

     chiamata(numeroTelefono: number, min: number): void {
          if (typeof numeroTelefono !== 'number' || typeof min !== 'number' || min <= 0) {
              throw new Error("Chiamata non valida");
          }
          
          const costoChiamata = min * this.costoMinuto;
          
          if (this.carica < costoChiamata) {
              throw new Error("Credito insufficiente per effettuare la chiamata");
          }
      
          this.carica -= costoChiamata;
          this.numeroChiamate++;
          const nuovaChiamata = {
              id: numeroTelefono,
              durata: min,
              dataOra: new Date(Date.now() + 3600000)
          };
          this.registroChiamate.push(nuovaChiamata);
      }

     azzeraChiamate(): void {
          this.numeroChiamate = 0;
          this.registroChiamate = [];
     }

     mostraRegistroChiamate(): { id: number; durata: number; dataOra: string }[] {
          return this.registroChiamate.map(chiamata => ({
              id: chiamata.id,
              durata: chiamata.durata,
              dataOra: this.formatDateTime(chiamata.dataOra)
          }));
      }

     filtraChiamatePerDataOra(filtro: FiltroData): { id: number; durata: number; dataOra: string }[] {
        const { day, month, year, hours, minutes } = filtro;

        const chiamateFormattate = this.registroChiamate
            .filter(chiamata => {
                const dataChiamata = chiamata.dataOra;
                return (
                    (day === undefined || dataChiamata.getDate() === day) &&
                    (month === undefined || dataChiamata.getMonth() + 1 === month) &&
                    (year === undefined || dataChiamata.getFullYear() === year) &&
                    (hours === undefined || dataChiamata.getHours() === hours) &&
                    (minutes === undefined || dataChiamata.getMinutes() === minutes)
                );
            })
            .map(chiamata => ({
                id: chiamata.id,
                durata: chiamata.durata,
                dataOra: this.formatDateTime(chiamata.dataOra)
            }));

        return chiamateFormattate;
    }
}




