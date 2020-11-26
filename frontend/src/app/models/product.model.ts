export class Product{

  constructor(
    public productId: number,
    public isApproved: boolean,
    public title: string,
    public isProduct: boolean,
    public price: number,
    public description: string,
    public location: string,
    public isSelling: boolean,
    public isAvailable: boolean,
    public isDeliverable: boolean,
    public rejectionReason: string,
    public image: Blob,
    public review: string,
    public userId: number,
    public dateBought: Date,
    public deletedAfterSold: boolean
  ) {}
}
