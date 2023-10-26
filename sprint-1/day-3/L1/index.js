"use strict";
class BankAccount {
    constructor(initialBal, accNo, name) {
        this.balance = initialBal;
        this.transactions = [];
        this.accountNumber = accNo;
        this.accountHolder = name;
    }
    deposit(amount) {
        this.balance = amount + this.balance;
        this.transactions.push({ type: "Deposit", amount: amount, timestamp: new Date() });
    }
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
            return;
        }
        this.balance = this.balance - amount;
        this.transactions.push({ type: "Withdrawal", amount: amount, timestamp: new Date() });
    }
    getBalance() {
        console.log(this.balance);
    }
}
const testObject = new BankAccount(100, "001", "Abhishree");
//Instantiating a BankAccount object
console.log(testObject);
//Deposit 
testObject.deposit(200);
//logged in transactions array
console.log(testObject.transactions);
//current balance 
console.log(testObject.balance);
//Withdrawal 
testObject.withdraw(100);
//logged in transactions array
console.log(testObject.transactions);
//current balance 
console.log(testObject.balance);
//When withdrawal exceeds the available balance
testObject.withdraw(500);
//current balance 
console.log(testObject.balance);
