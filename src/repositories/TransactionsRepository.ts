import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === 'income') {
        accumulator.value += currentValue.value;
      }
      return accumulator;
    });

    const outcomes = this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === 'outcome') {
        accumulator.value += currentValue.value;
      }
      return accumulator;
    });

    const balance: Balance = {
      income: incomes.value,
      outcome: outcomes.value,
      total: incomes.value - outcomes.value,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
