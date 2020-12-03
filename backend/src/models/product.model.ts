import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User } from './user.model';

export interface ProductAttributes {
    productId: number;
    isApproved: boolean;
    title: string;
    isProduct: boolean;
    price: number;
    description: string;
    location: string;
    isSelling: boolean;
    isAvailable: boolean;
    isDeliverable: boolean;
    rejectionReason: string;
    userId: number;
    buyerId: number;
    dateBought: Date;
    deletedAfterSold: boolean;
    rentedUntil: Date;
    returnedAfterLoan: boolean;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    isApproved!: boolean;
    title!: string;
    isProduct!: boolean;
    price!: number;
    description!: string;
    location!: string;
    isSelling!: boolean;
    isAvailable!: boolean;
    isDeliverable!: boolean;
    rejectionReason!: string;
    userId!: number;
    buyerId!: number;
    dateBought!: Date;
    deletedAfterSold!: boolean;
    rentedUntil!: Date;
    returnedAfterLoan!: boolean;

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            isApproved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isProduct: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            price: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isSelling: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            isAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            isDeliverable: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            rejectionReason: {
                type: DataTypes.STRING
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            buyerId: {
                type: DataTypes.INTEGER
            },
            dateBought: {
                type: DataTypes.DATE
            },
            deletedAfterSold: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            rentedUntil: {
                type: DataTypes.DATE
            },
            returnedAfterLoan: {
                type: DataTypes.BOOLEAN
            }
        },
            {
                sequelize,
                tableName: 'products'
            }
        );
    }

    public static createAssociations() {
        Product.belongsTo(User, {
            targetKey: 'userId',
            as: 'user',
            onDelete: 'cascade',
            foreignKey: 'userId'
        });
    }
}
