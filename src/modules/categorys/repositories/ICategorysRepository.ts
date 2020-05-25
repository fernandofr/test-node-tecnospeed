import Category from '../infra/typeorm/entities/Category';

export default interface ICategorysRepository {
  create(title: string): Promise<Category>;
  findAllCategorys(): Promise<Category[]>;
}
