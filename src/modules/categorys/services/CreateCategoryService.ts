import { injectable, inject } from 'tsyringe';

import Category from '@modules/categorys/infra/typeorm/entities/Category';
import ICategorysRepository from '../repositories/ICategorysRepository';

interface IRequest {
  title: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategorysRepository')
    private categorysRepository: ICategorysRepository,
  ) {}

  public async execute({ title }: IRequest): Promise<Category> {
    const category = await this.categorysRepository.create(title);

    return category;
  }
}

export default CreateCategoryService;
