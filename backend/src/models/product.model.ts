import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface ProductAttributes {
    productId: number;
    type: string;
    title: string;
    price: number;
    description: string;
    location: string;
    isSelling: boolean;
    isAvailable: boolean;
    isDeliverable: boolean;
}
