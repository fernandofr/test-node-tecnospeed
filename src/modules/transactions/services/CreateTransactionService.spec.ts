import 'reflect-metadata';

import CreateTransactionService from './CreateTransactionService';
import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';

describe('CreateTransaction', () => {
  it('should be able to create new transaction', async () => {
    const fakeTransactionsRepository = new FakeTransactionsRepository();

    const createTransaction = new CreateTransactionService(
      fakeTransactionsRepository,
    );

    const transaction = await createTransaction.execute({
      title: 'salário',
      value: 3000,
      type: 'entrada',
      category: 'funcionario',
      user_id: 'b30dfbeb-2849-460c-afea-803b3145554e',
    });

    expect(transaction).toHaveProperty('id');
  });
});
