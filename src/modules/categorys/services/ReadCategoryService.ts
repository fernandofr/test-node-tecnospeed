import { injectable, inject } from 'tsyringe';
import ICategorysRepository from '../repositories/ICategorysRepository';
import Category from '../infra/typeorm/entities/Category';

@injectable()
class ReadTransactionService {
  constructor(
    @inject('CategorysRepository')
    private categorysRepository: ICategorysRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    return this.categorysRepository.findAllCategorys();
  }
}

export default ReadTransactionService;
