import { injectable, inject } from 'tsyringe';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import ITransactionsDTO from '../dtos/ITransactionsDTO';

@injectable()
class ReadTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(id: string): Promise<ITransactionsDTO> {
    return this.transactionsRepository.findAllTransactionsByUser(id);
  }
}

export default ReadTransactionService;
