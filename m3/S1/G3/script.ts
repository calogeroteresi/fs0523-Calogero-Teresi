// Definizione dell'interfaccia ILavoratoreAutonomo
interface ILavoratoreAutonomo {
     codredd: number;
     redditoannuolordo: number;
     tasseinps: number;
     tasseirpef: number;
     getUtileTasse(): number;
     getTasseInps(): number;
     getTasseIrpef(): number;
     getContributoPensionistico(): number;
     getredditoannuonetto(): number;
   }
   
   // Implementazione della classe astratta LavoratoreAutonomo
abstract class LavoratoreAutonomo implements ILavoratoreAutonomo {
     constructor(
       public codredd: number,
       public redditoannuolordo: number,
       public tasseinps: number,
       public tasseirpef: number
     ) {}
   
     abstract getUtileTasse(): number;
   
     getTasseInps(): number {
       return this.redditoannuolordo * (this.tasseinps / 100); // Calcolo delle tasse INPS basato su percentuale
     }
   
     getTasseIrpef(): number {
          const scaglioniIRPEF = [15000, 28000, 50000];
          const aliquoteIRPEF = [0.23, 0.25, 0.35, 0.43];
      
          let tasseIRPEF = 0;
          let redditoRimanente = this.redditoannuolordo;
      
          for (let i = 0; i < scaglioniIRPEF.length; i++) {
            if (redditoRimanente > scaglioniIRPEF[i]) {
              const trattoReddito = i < scaglioniIRPEF.length - 1 ? Math.min(redditoRimanente - scaglioniIRPEF[i], scaglioniIRPEF[i + 1] - scaglioniIRPEF[i]) : redditoRimanente - scaglioniIRPEF[i];
              tasseIRPEF += trattoReddito * aliquoteIRPEF[i];
            } else {
              break;
            }
          }
      
          return tasseIRPEF;
        }
   
     abstract getContributoPensionistico(): number;
   
     getredditoannuonetto(): number {
       return this.redditoannuolordo - this.getUtileTasse() - this.getContributoPensionistico();
     }
   }


class Lavoratore extends LavoratoreAutonomo {
     private età: number; 
   
     constructor(codredd: number, redditoannuolordo: number, età: number) {
       const tasseinps = 0; 
       const tasseirpef = 0; 
       super(codredd, redditoannuolordo, tasseinps, tasseirpef);
       this.età = età; // Assegnamento dell'età
     }
   
     getUtileTasse(): number {
          return this.getTasseInps() + this.getTasseIrpef();
        }
      
     getContributoPensionistico(): number {
          const aliquotaPensionisticaMaggiore21 = 24;
          const aliquotaPensionisticaMinore21 = 22.8;
      
          const aliquotaPensionistica = this.età > 21 ? aliquotaPensionisticaMaggiore21 : aliquotaPensionisticaMinore21;
      
          return this.redditoannuolordo * (aliquotaPensionistica / 100);
        }
      }
   
   

   const lavoratore1: ILavoratoreAutonomo = new Lavoratore(1, 50000, 25);
   console.log("Reddito netto lavoratore 1:", lavoratore1.getredditoannuonetto());
   
   const lavoratore2: ILavoratoreAutonomo = new Lavoratore(2, 75000, 30);
   console.log("Reddito netto lavoratore 2:", lavoratore2.getredditoannuonetto());
   