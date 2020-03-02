
import * as _ from 'lodash';
export class TransactionLogic {
    constructor(transactions){
        this.transactions = transactions;
        this.months = ['Jan','Feb','Mar','Apr','May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    }

    getRewards(amount){
        if(amount > 50 && amount <= 100){
            return amount - 50
        }else if (amount > 100){
            return (2 * (amount - 100)) + 50
        }
    }

    getTransactionsByCustomer(){
        const customerObject = [];
        this.transactions.filter((transaction) => {
            const { transactionID , amount, transactionDate, customerName } = transaction;
            return customerObject.push({
               rewards :  this.getRewards(amount),
               transactionMonth: this.months[new Date(transactionDate).getMonth()],
               transactionID,
               amount,
               customerName
            })
        })
        return customerObject
    }

    getTransactionsData(){
        const customerObject = this.getTransactionsByCustomer();
        let formattedCustomerObject = _.groupBy(customerObject, "customerName")
        let formattedData = _.map(formattedCustomerObject,(objs, key)=> {
            var m = {
                total: _.sumBy(objs, "rewards")
            };
            const monthBasedObject = _.groupBy(objs, "transactionMonth");
            _.map(monthBasedObject,(obj,key) => {
                    m[key] = _.sumBy(obj,'rewards')
            })
            return { ...m,
                customerName: key,
            }
        })
        return formattedData;

    }
}