import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICategorysRepository from '@modules/categorys/repositories/ICategorysRepository';
import CategorysRepository from '@modules/categorys/infra/typeorm/repositories/CategorysRepository';

import ITransactionRepository from '@modules/transactions/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/transactions/infra/typeorm/repositories/TransactionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICategorysRepository>(
  'CategorysRepository',
  CategorysRepository,
);

container.registerSingleton<ITransactionRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);
