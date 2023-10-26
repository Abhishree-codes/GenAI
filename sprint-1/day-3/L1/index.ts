class BankAccount {
    accountNumber: string
    accountHolder: string
    balance: number
    transactions: Transaction[]

    constructor(initialBal:number,accNo:string,name:string){
        this.balance=initialBal
        this.transactions = []
        this.accountNumber= accNo
        this.accountHolder=name
    }

     deposit(amount: number){
     
        this.balance = amount + this.balance
        this.transactions.push({type:"Deposit",amount:amount,timestamp:new Date()})
     }
     withdraw(amount: number){
        if(amount> this.balance){
            console.log("Insufficient funds")
            return 
        }
        this.balance = this.balance-amount
        this.transactions.push({type:"Withdrawal",amount:amount,timestamp:new Date()})
     }
     getBalance(){
        console.log(this.balance)
     }
   
}

interface Transaction{
    type: string,
    amount: number,
    timestamp: Date
}

const testObject = new BankAccount(100,"001","Abhishree")

//Instantiating a BankAccount object
console.log(testObject)

//Deposit 
testObject.deposit(200)
//logged in transactions array
console.log(testObject.transactions)
//current balance 
console.log(testObject.balance)

//Withdrawal 
testObject.withdraw(100)
//logged in transactions array
console.log(testObject.transactions)
//current balance 
console.log(testObject.balance)

//When withdrawal exceeds the available balance
testObject.withdraw(500)
//current balance 
console.log(testObject.balance)
