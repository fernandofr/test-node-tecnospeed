import Transaction from '../infra/typeorm/entities/Transaction';

import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import ITransactionsDTO from '../dtos/ITransactionsDTO';

export default interface ITransactionsRepository {
  findAllTransactionsByUser(id: string): Promise<ITransactionsDTO>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  delete(id: string): Promise<void>;
}
