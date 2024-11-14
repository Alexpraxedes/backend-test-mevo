export class Operation {
  constructor(
    public from: string,
    public to: string,
    public amount: number,
    public suspected: boolean = false,
  ) {}
}
