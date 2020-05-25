import { getRepository, Repository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import ICategorysRepository from '@modules/categorys/repositories/ICategorysRepository';

import Category from '../entities/Category';

class CategorysRepository implements ICategorysRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findAllCategorys(): Promise<Category[]> {
    return this.ormRepository.find();
  }

  public async create(title: string): Promise<Category> {
    if (!title) {
      throw new AppError('Informe uma categoria válida');
    }

    let category = await this.ormRepository.findOne({
      where: { title },
    });

    if (!category) {
      category = this.ormRepository.create({
        title,
      });

      await this.ormRepository.save(category);
    }

    return category;
  }
}

export default CategorysRepository;
