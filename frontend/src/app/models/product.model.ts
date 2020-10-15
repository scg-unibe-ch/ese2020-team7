export class Product{

  constructor(
    public productId: number,
    public title: string,
    public type: string,
    public price: number,
    public description: string,
    public location: string,
    public isSelling: boolean,
    public isAvailable: boolean,
    public isDeliverable: boolean
  ) {}
}
