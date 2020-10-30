export class Product{

  constructor(
    public productId: number,
    public isApproved: boolean,
    public title: string,
    public type: string,
    public price: number,
    public description: string,
    public location: string,
    public isSelling: boolean,
    public isAvailable: boolean,
    public isDeliverable: boolean,
    public rejectionReason: string,
    public image: Blob,
    public review: string,
    public userId: number
  ) {}
}
