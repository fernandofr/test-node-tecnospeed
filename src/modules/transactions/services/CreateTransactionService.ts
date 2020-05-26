import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  title: string;
  value: number;
  type: 'entrada' | 'saida';
  category: string;
  user_id: string;
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Transaction> {
    const transaction = await this.transactionsRepository.create(data);

    return transaction;
  }
}

export default CreateTransactionService;
