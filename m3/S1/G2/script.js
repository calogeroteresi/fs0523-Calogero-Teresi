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
class Cerca {
    static handleSubmit(event) {
        event.preventDefault();
        const accountIdInput = document.getElementById('accountId');
        const accountId = accountIdInput.value;
        Cerca.searchAccount(accountId);
    }
    static searchAccount(accountId) {
        const accountIdInput = document.getElementById('accountId');
        const currentBalanceSpan = document.getElementById('currentBalance');
        accountId = accountIdInput.value;
        let account;
        if (accountId === '451Q') {
            account = sonAccount;
        }
        else if (accountId === '541Q') {
            account = motherAccount;
        }
        if (account) {
            currentBalanceSpan.textContent = account.getBalance().toString();
            const accountDetailsDiv = document.getElementById('accountDetails');
            accountDetailsDiv.style.display = 'block';
        }
        else {
            alert('Account non trovato.');
        }
    }
}
class Gestione {
    static deposit() {
        const depositAmountInput = document.getElementById('depositAmount');
        const amount = parseFloat(depositAmountInput.value);
        sonAccount.oneDeposit(amount);
        depositAmountInput.value = '';
        Gestione.updateBalance();
    }
    static withdraw() {
        const withdrawAmountInput = document.getElementById('withdrawAmount');
        const amount = parseFloat(withdrawAmountInput.value);
        sonAccount.oneWithdraw(amount);
        withdrawAmountInput.value = '';
        Gestione.updateBalance();
    }
    static updateBalance() {
        const currentBalanceSpan = document.getElementById('currentBalance');
        const currentBalance = sonAccount.getBalance();
        currentBalanceSpan.textContent = currentBalance.toString();
    }
}
// Esempio di utilizzo:
const sonAccount = new SonAccount(0, 'Mario', 'Rossi', 'TTVVCYCBBC', '451Q');
const motherAccount = new MotherAccount(0, 'Giulia', 'Tramontana', 'VAGAYGYA788AH', '541U');
const accountForm = document.getElementById('accountForm');
accountForm.addEventListener('submit', Cerca.handleSubmit);
