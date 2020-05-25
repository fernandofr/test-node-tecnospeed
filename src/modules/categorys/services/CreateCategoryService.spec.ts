import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateCategoryService from './CreateCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategorysRepository';

describe('CreateCategory', () => {
  it('should be able to create new category', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();

    const createCategory = new CreateCategoryService(fakeCategoryRepository);

    const category = await createCategory.execute({
      title: 'salário',
    });

    expect(category).toHaveProperty('id');
  });

  it('not should be able to create category with title empty', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();

    const createCategory = new CreateCategoryService(fakeCategoryRepository);

    expect(
      createCategory.execute({
        title: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
