import { injectable, inject } from 'tsyringe';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.transactionsRepository.deleteTransactionById(id);
  }
}

export default DeleteTransactionService;
