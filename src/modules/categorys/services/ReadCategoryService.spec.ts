import 'reflect-metadata';

import ReadCategoryService from './ReadCategoryService';
import CreateCategoryService from './CreateCategoryService';
import FakeCategoryRepository from '../repositories/fakes/FakeCategorysRepository';

describe('ReadCategory', () => {
  it('should be able to list categorys', async () => {
    const fakeCategoryRepository = new FakeCategoryRepository();

    const readCategory = new ReadCategoryService(fakeCategoryRepository);
    const createCategory = new CreateCategoryService(fakeCategoryRepository);

    await createCategory.execute({ title: 'salário' });
    await createCategory.execute({ title: 'alimentação' });

    const categorys = await readCategory.execute();

    expect(categorys).toBeInstanceOf(Array);
    expect(categorys).toHaveLength(2);
  });
});
