export class Result<T> {
  status: string;
  message?: string;
  sumPage?: number;
  unauthorized?: boolean;
  data?: T;
  allData?: number;
  saldo?: number;
  metaData: {
    total: number;
    codeExists: string;
  };
}
