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

class Cerca{
    static handleSubmit(event: Event): void {
        event.preventDefault();
     
        const accountIdInput = document.getElementById('accountId') as HTMLInputElement;
        const accountId = accountIdInput.value;
     
        Cerca.searchAccount(accountId);
     }
     static searchAccount(accountId: string): void {
        const accountIdInput = document.getElementById('accountId') as HTMLInputElement;
        const currentBalanceSpan = document.getElementById('currentBalance') as HTMLSpanElement;
     
        accountId = accountIdInput.value;
        let account: Account | undefined;
     
        
        if (accountId === '451Q') {
            account = sonAccount;
        } else if (accountId === '541Q') {
            account = motherAccount;
        }
     
        if (account) {
            
            currentBalanceSpan.textContent = account.getBalance().toString();
            const accountDetailsDiv = document.getElementById('accountDetails') as HTMLDivElement;
            accountDetailsDiv.style.display = 'block';
        } else {
            
            alert('Account non trovato.');
        }
     }
     

}

class Gestione {
    static deposit(): void {
        const depositAmountInput = document.getElementById('depositAmount') as HTMLInputElement;
        const amount = parseFloat(depositAmountInput.value);
     
        sonAccount.oneDeposit(amount);
     
        depositAmountInput.value = '';
     
        Gestione.updateBalance();
     }

    static withdraw(): void {
        const withdrawAmountInput = document.getElementById('withdrawAmount') as HTMLInputElement;
        const amount = parseFloat(withdrawAmountInput.value);
     
        sonAccount.oneWithdraw(amount); 
     
        withdrawAmountInput.value = '';
     
        Gestione.updateBalance();
     }
     
     static updateBalance(): void {
        const currentBalanceSpan = document.getElementById('currentBalance') as HTMLSpanElement;
     
        const currentBalance = sonAccount.getBalance(); 
     
        currentBalanceSpan.textContent = currentBalance.toString();
     }


}


// Esempio di utilizzo:
const sonAccount = new SonAccount(0, 'Mario', 'Rossi', 'TTVVCYCBBC', '451Q');
const motherAccount = new MotherAccount(0, 'Giulia', 'Tramontana', 'VAGAYGYA788AH', '541U');


const accountForm = document.getElementById('accountForm') as HTMLFormElement;
accountForm.addEventListener('submit', Cerca.handleSubmit);