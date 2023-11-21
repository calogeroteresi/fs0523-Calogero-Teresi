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
function searchAccount(accountId) {
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
function deposit() {
    const depositAmountInput = document.getElementById('depositAmount');
    const amount = parseFloat(depositAmountInput.value);
    sonAccount.oneDeposit(amount);
    depositAmountInput.value = '';
    updateBalance();
}
function withdraw() {
    const withdrawAmountInput = document.getElementById('withdrawAmount');
    const amount = parseFloat(withdrawAmountInput.value);
    sonAccount.oneWithdraw(amount);
    withdrawAmountInput.value = '';
    updateBalance();
}
function handleSubmit(event) {
    event.preventDefault();
    const accountIdInput = document.getElementById('accountId');
    const accountId = accountIdInput.value;
    searchAccount(accountId);
}
function updateBalance() {
    const currentBalanceSpan = document.getElementById('currentBalance');
    const currentBalance = sonAccount.getBalance();
    currentBalanceSpan.textContent = currentBalance.toString();
}
const accountForm = document.getElementById('accountForm');
accountForm.addEventListener('submit', handleSubmit);
