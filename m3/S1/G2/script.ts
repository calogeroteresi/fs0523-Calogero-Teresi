class Account {
    public name: string;
    public surname: string;
    protected codiceFiscale: string;
    protected codiceConto: string;
    protected balance: number;

    static tipoConto: string[] = ['ordinario', 'convenzione', 'base', 'pacchetto'];

    constructor(
        balanceInit: number = 0,
        _name: string,
        _surname: string,
        _codiceFiscale: string,
        _codiceConto: string
    ) {
        this.balance = balanceInit;
        this.name = _name;
        this.codiceFiscale = _codiceFiscale;
        this.codiceConto = _codiceConto;
        this.surname = _surname;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount <= this.balance) {
            this.balance -= amount;
        } else {
            console.log('Fondi insufficienti.');
        }
    }

    getBalance(): number {
        return this.balance;
    }
}

class SonAccount extends Account {
    constructor(
         balanceInit: number = 0,
         _name: string,
         _surname: string,
         _codiceFiscale: string,
         _codiceConto: string
     ) {
        super(balanceInit, _name, _surname, _codiceFiscale, _codiceConto);
    }

    oneDeposit(amount: number): void {
        this.deposit(amount);
    }

    oneWithdraw(amount: number): void {
        this.withdraw(amount);
    }

    twoDeposit(amount: number): void {
         this.deposit(amount);
     }
 
     twoWithdraw(amount: number): void {
         this.withdraw(amount);
     }
}

class MotherAccount extends Account {
    constructor(
         balanceInit: number = 0,
         _name: string,
         _surname: string,
         _codiceFiscale: string,
         _codiceConto: string
     ) {
        super(balanceInit, _name, _surname, _codiceFiscale, _codiceConto);
    }
    oneDeposit(amount: number): void {
         this.deposit(amount);
     }
 
     oneWithdraw(amount: number): void {
         this.withdraw(amount);
     } 
    twoDeposit(amount: number): void {
        this.deposit(amount);
    }

    twoWithdraw(amount: number): void {
        this.withdraw(amount);
    }

    addInterest(): void {
        const interest = this.balance * 0.1; // 10% interest
        this.deposit(interest);
    }
}

// Esempio di utilizzo:
const sonAccount = new SonAccount(0, 'Mario', 'Rossi', 'TTVVCYCBBC', '451Q');
const motherAccount = new MotherAccount(0, 'Giulia', 'Tramontana', 'VAGAYGYA788AH', '541U');

sonAccount.oneDeposit(100);
sonAccount.oneWithdraw(20);
sonAccount.twoDeposit(100);
sonAccount.twoWithdraw(20);
motherAccount.oneDeposit(100);
motherAccount.oneWithdraw(20);
motherAccount.twoDeposit(500);
motherAccount.twoWithdraw(50);
motherAccount.addInterest();

console.log('Saldo conto figlio:', sonAccount.getBalance());
console.log('Saldo conto madre:', motherAccount.getBalance());

// Funzione per cercare l'account e mostrare i dettagli
function searchAccount(accountId: string): void {
   const accountIdInput = document.getElementById('accountId') as HTMLInputElement;
   const currentBalanceSpan = document.getElementById('currentBalance') as HTMLSpanElement;

   accountId = accountIdInput.value;
   let account: Account | undefined;

   // Esempio di ricerca dell'account in base all'ID inserito
   if (accountId === '451Q') {
       account = sonAccount;
   } else if (accountId === '541Q') {
       account = motherAccount;
   }

   if (account) {
       // Mostra il saldo attuale dell'account trovato
       currentBalanceSpan.textContent = account.getBalance().toString();
       const accountDetailsDiv = document.getElementById('accountDetails') as HTMLDivElement;
       accountDetailsDiv.style.display = 'block';
   } else {
       // Se l'account non è stato trovato, mostra un messaggio di errore
       alert('Account non trovato.');
   }
}

// Funzione per depositare
function deposit(): void {
   const depositAmountInput = document.getElementById('depositAmount') as HTMLInputElement;
   const amount = parseFloat(depositAmountInput.value);

   // Esempio di deposito sull'account attivo (preso in base all'ID)
   // Aggiungi qui la logica per depositare l'importo sull'account attivo
   sonAccount.oneDeposit(amount); // Esempio: deposito sull'account figlio

   // Pulisci l'input dopo il deposito
   depositAmountInput.value = '';

   // Aggiorna il saldo attuale
   updateBalance();
}

// Funzione per prelevare
function withdraw(): void {
   const withdrawAmountInput = document.getElementById('withdrawAmount') as HTMLInputElement;
   const amount = parseFloat(withdrawAmountInput.value);

   // Esempio di prelievo dall'account attivo (preso in base all'ID)
   // Aggiungi qui la logica per prelevare l'importo dall'account attivo
   sonAccount.oneWithdraw(amount); // Esempio: prelievo dall'account figlio

   // Pulisci l'input dopo il prelievo
   withdrawAmountInput.value = '';

   // Aggiorna il saldo attuale
   updateBalance();
}


function handleSubmit(event: Event): void {
   event.preventDefault(); // Previeni il comportamento di default del form

   const accountIdInput = document.getElementById('accountId') as HTMLInputElement;
   const accountId = accountIdInput.value;

   // Eseguire l'operazione di ricerca dell'account in base all'ID inserito
   searchAccount(accountId);
}


function updateBalance(): void {
   const currentBalanceSpan = document.getElementById('currentBalance') as HTMLSpanElement;

   // Esempio di aggiornamento del saldo dell'account attivo (preso in base all'ID)
   // Aggiungi qui la logica per ottenere il saldo dell'account attivo
   const currentBalance = sonAccount.getBalance(); // Esempio: ottenere il saldo dell'account figlio

   // Aggiorna il saldo mostrato nell'interfaccia utente
   currentBalanceSpan.textContent = currentBalance.toString();
}


// Aggiungi un listener per l'evento di invio del form
const accountForm = document.getElementById('accountForm') as HTMLFormElement;
accountForm.addEventListener('submit', handleSubmit);