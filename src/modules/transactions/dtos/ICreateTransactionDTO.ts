export default interface ICreateTransactionDTO {
  title: string;
  value: number;
  type: 'entrada' | 'saida';
  category: string;
}
