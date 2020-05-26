import { uuid } from 'uuidv4';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ITransactionsDTO from '@modules/transactions/dtos/ITransactionsDTO';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import IBalance from '@modules/transactions/dtos/IBalanceDTO';

import Transaction from '../../infra/typeorm/entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private transactions: Transaction[] = [];

  private async getBalance(id: string): Promise<IBalance> {
    const { entrada, saida } = this.transactions.reduce(
      (accumulator: IBalance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'entrada':
            accumulator.entrada += Number(transaction.value);
            break;
          case 'saida':
            accumulator.saida += Number(transaction.value);
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        entrada: 0,
        saida: 0,
        total: 0,
      },
    );

    const total = entrada - saida;

    return { entrada, saida, total };
  }

  public async findAllTransactionsByUser(
    id: string,
  ): Promise<ITransactionsDTO> {
    const { total } = await this.getBalance(id);
    const transactions = this.transactions.filter(
      transaction => transaction.user_id === id,
    );

    return { total, transactions };
  }

  public async create({
    title,
    value,
    type,
    category,
    user_id,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction();

    Object.assign(transaction, {
      id: uuid(),
      title,
      value,
      type,
      category_id: category,
      user_id,
    });

    this.transactions.push(transaction);

    return transaction;
  }

  public async deleteTransactionById((transactionId: string, userId: string): Promise<void> {
    this.transactions.filter(transaction => (transaction.id !== transactionId && transaction.user_id === userId));
  }
}

export default TransactionsRepository;
