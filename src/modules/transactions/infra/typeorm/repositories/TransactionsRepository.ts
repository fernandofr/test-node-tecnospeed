import { getRepository, Repository } from 'typeorm';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ITransactionsDTO from '@modules/transactions/dtos/ITransactionsDTO';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import IBalance from '@modules/transactions/dtos/IBalanceDTO';

import Transaction from '../entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  private async getBalance(): Promise<IBalance> {
    const transactions = await this.ormRepository.find();

    const { entrada, saida } = transactions.reduce(
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

  public async findAllTransactions(): Promise<ITransactionsDTO> {
    const transactions = await this.ormRepository.find();
    const { total } = await this.getBalance();

    return { total, transactions };
  }

  public async create({
    title,
    value,
    type,
    category,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create({
      title,
      type,
      value,
      category_id: category,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async deleteTransactionById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TransactionsRepository;
