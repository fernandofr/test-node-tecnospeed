import Transaction from '../infra/typeorm/entities/Transaction';

import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ITransactionsDTO from '../dtos/ITransactionsDTO';

export default interface ITransactionsRepository {
  findAllTransactions(): Promise<ITransactionsDTO>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  deleteTransactionById(id: string): Promise<void>;
}
