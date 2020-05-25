import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

export default interface ITransactionsDTO {
  total: number;
  transactions: Transaction[];
}
