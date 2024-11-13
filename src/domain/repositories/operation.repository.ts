export interface OperationRepository {
  create(data: any): Promise<any>;
  findAll(): Promise<any[]>;
  // Outros métodos relevantes
}
