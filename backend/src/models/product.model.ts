import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { User } from './user.model';

export interface ProductAttributes {
    productId: number;
    title: string;
    type: string;
    price: number;
    description: string;
    location: string;
    isSelling: boolean;
    isAvailable: boolean;
    isDeliverable: boolean;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    productId!: number;
    title!: string;
    type!: string;
    price!: number;
    description!: string;
    location!: string;
    isSelling!: boolean;
    isAvailable!: boolean;
    isDeliverable!: boolean;

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
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
