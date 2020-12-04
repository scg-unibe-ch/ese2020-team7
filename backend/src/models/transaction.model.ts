import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface TransactionAttributes {
    transactionId: number;
    productId: number;
    buyerId: number;
    transactionStatus: number;
    complete: boolean;
    deliveryStreet: string;
    deliveryPinCode: number;
    deliveryCity: string;
    deliveryCountry: string;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'transactionId'> { }

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    transactionId!: number;
    productId!: number;
    buyerId!: number;
    transactionStatus!: number;
    complete!: boolean;
    deliveryStreet!: string;
    deliveryPinCode!: number;
    deliveryCity!: string;
    deliveryCountry!: string;

    public static initialize(sequelize: Sequelize) {
        Transaction.init({
            transactionId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            buyerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            transactionStatus: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            complete: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            deliveryStreet: {
                type: DataTypes.STRING
            },
            deliveryPinCode: {
                type: DataTypes.INTEGER
            },
            deliveryCity: {
                type: DataTypes.STRING
            },
            deliveryCountry: {
                type: DataTypes.STRING
            }
        },
            {
                sequelize,
                tableName: 'transactions'
            }
        );
    }
}
