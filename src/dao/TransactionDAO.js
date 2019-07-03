const { filter, remove, sortBy } = require("lodash");

class TransactionDAORaw {
	constructor() {
		this.key = "agile-2019";
		this.transactions = [];
		this.balance = 0;
	}

	save(data) {
		this.transactions.push(data);
		this.setBalance(data.amount, data.type);
		return this.balance;
	}

	setBalance(amount, type) {
		this.balance =
			type === "deposit" ? this.balance + amount : this.balance - amount;
	}

	getAll() {
		return this.transactions;
	}

	filterBy(data) {
		return filter(this.transactions, [data.field, data.value]);
	}

	removeTransaction(data) {
		const { amount } = data;
		remove(this.transactions, transaction => {
			return transaction._id === data._id;
		});
		this.balance =
			data.type === "deposit" ? this.balance - amount : this.balance + amount;
		return this.transactions;
	}

	sortTransactions(fields) {
		sortBy(this.transactions, fields.length ? [...fields] : "date");
	}

	getBalance() {
		return this.balance;
	}

	isTransactionPosible(amount, type) {
		return type === "deposit" ? true : this.balance >= amount;
	}
}

const TransactionDAO = new TransactionDAORaw();

module.exports = TransactionDAO;
