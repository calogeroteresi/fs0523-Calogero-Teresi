"use strict";
class Account {
    constructor(balanceInit = 0, _name, _surname, _codiceFiscale, _codiceConto) {
        this.balance = balanceInit;
        this.name = _name;
        this.codiceFiscale = _codiceFiscale;
        this.codiceConto = _codiceConto;
        this.surname = _surname;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
        }
        else {
            console.log('Fondi insufficienti.');
        }
    }
    getBalance() {
        return this.balance;
    }
}
Account.tipoConto = ['ordinario', 'convenzione', 'base', 'pacchetto'];
class SonAccount extends Account {
    constructor(balanceInit = 0, _name, _surname, _codiceFiscale, _codiceConto) {
        super(balanceInit, _name, _surname, _codiceFiscale, _codiceConto);
    }
    oneDeposit(amount) {
        this.deposit(amount);
    }
    oneWithdraw(amount) {
        this.withdraw(amount);
    }
    twoDeposit(amount) {
        this.deposit(amount);
    }
    twoWithdraw(amount) {
        this.withdraw(amount);
    }
}
class MotherAccount extends Account {
    constructor(balanceInit = 0, _name, _surname, _codiceFiscale, _codiceConto) {
        super(balanceInit, _name, _surname, _codiceFiscale, _codiceConto);
    }
    oneDeposit(amount) {
        this.deposit(amount);
    }
    oneWithdraw(amount) {
        this.withdraw(amount);
    }
    twoDeposit(amount) {
        this.deposit(amount);
    }
    twoWithdraw(amount) {
        this.withdraw(amount);
    }
    addInterest() {
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
function searchAccount(accountId) {
    const accountIdInput = document.getElementById('accountId');
    const currentBalanceSpan = document.getElementById('currentBalance');
    accountId = accountIdInput.value;
    let account;
    // Esempio di ricerca dell'account in base all'ID inserito
    if (accountId === '451Q') {
        account = sonAccount;
    }
    else if (accountId === '541Q') {
        account = motherAccount;
    }
    if (account) {
        // Mostra il saldo attuale dell'account trovato
        currentBalanceSpan.textContent = account.getBalance().toString();
        const accountDetailsDiv = document.getElementById('accountDetails');
        accountDetailsDiv.style.display = 'block';
    }
    else {
        // Se l'account non è stato trovato, mostra un messaggio di errore
        alert('Account non trovato.');
    }
}
// Funzione per depositare
function deposit() {
    const depositAmountInput = document.getElementById('depositAmount');
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
function withdraw() {
    const withdrawAmountInput = document.getElementById('withdrawAmount');
    const amount = parseFloat(withdrawAmountInput.value);
    // Esempio di prelievo dall'account attivo (preso in base all'ID)
    // Aggiungi qui la logica per prelevare l'importo dall'account attivo
    sonAccount.oneWithdraw(amount); // Esempio: prelievo dall'account figlio
    // Pulisci l'input dopo il prelievo
    withdrawAmountInput.value = '';
    // Aggiorna il saldo attuale
    updateBalance();
}
function handleSubmit(event) {
    event.preventDefault(); // Previeni il comportamento di default del form
    const accountIdInput = document.getElementById('accountId');
    const accountId = accountIdInput.value;
    // Eseguire l'operazione di ricerca dell'account in base all'ID inserito
    searchAccount(accountId);
}
function updateBalance() {
    const currentBalanceSpan = document.getElementById('currentBalance');
    // Esempio di aggiornamento del saldo dell'account attivo (preso in base all'ID)
    // Aggiungi qui la logica per ottenere il saldo dell'account attivo
    const currentBalance = sonAccount.getBalance(); // Esempio: ottenere il saldo dell'account figlio
    // Aggiorna il saldo mostrato nell'interfaccia utente
    currentBalanceSpan.textContent = currentBalance.toString();
}
// Aggiungi un listener per l'evento di invio del form
const accountForm = document.getElementById('accountForm');
accountForm.addEventListener('submit', handleSubmit);
