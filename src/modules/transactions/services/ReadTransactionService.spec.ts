import 'reflect-metadata';

import ReadTransactionService from './ReadTransactionService';
import CreateTransactionService from './CreateTransactionService';
import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';

describe('CreateTransaction', () => {
  it('should be able to create new transaction', async () => {
    const fakeTransactionsRepository = new FakeTransactionsRepository();

    const readTransaction = new ReadTransactionService(
      fakeTransactionsRepository,
    );

    const createTransaction = new CreateTransactionService(
      fakeTransactionsRepository,
    );

    await createTransaction.execute({
      title: 'salário',
      value: 3000,
      type: 'entrada',
      category: 'funcionario',
    });

    await createTransaction.execute({
      title: 'pagamento de fatura',
      value: 500,
      type: 'saida',
      category: 'cartão',
    });

    const findTransactions = await readTransaction.execute();

    expect(findTransactions.transactions).toBeInstanceOf(Array);
    expect(findTransactions.total).toBe(2500);
  });
});
