import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { Product } from './product.model';

export interface UserAttributes {
    userId: number;
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    telephoneNumber: number;
    street: string;
    pinCode: number;
    city: string;
    country: string;
    admin: boolean;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    userId!: number;
    userName!: string;
    password!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    gender!: string;
    telephoneNumber!: number;
    street!: string;
    pinCode!: number;
    city!: string;
    country!: string;
    admin!: boolean;

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
            },
            telephoneNumber: {
               type: DataTypes.NUMBER,
            },
            street: {
                type: DataTypes.STRING,
            },
            pinCode: {
                type: DataTypes.NUMBER,
            },
            city: {
                type: DataTypes.STRING,
            },
            country: {
                type: DataTypes.STRING,
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }
    public static createAssociations() {
        User.hasMany(Product, {
            as: 'products',
            foreignKey: 'userId'
        });
    }
}
