import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';

import ICategorysRepository from '@modules/categorys/repositories/ICategorysRepository';

import Category from '../../infra/typeorm/entities/Category';

class CategorysRepository implements ICategorysRepository {
  private categorys: Category[] = [];

  public async findAllCategorys(): Promise<Category[]> {
    return this.categorys;
  }

  public async create(title: string): Promise<Category> {
    if (!title) {
      throw new AppError('Informe uma categoria válida');
    }

    let category = await this.categorys.find(
      findCategory => findCategory.title === title,
    );

    if (!category) {
      category = new Category();

      Object.assign(category, {
        id: uuid(),
        title,
      });

      this.categorys.push(category);
    }

    return category;
  }
}

export default CategorysRepository;
