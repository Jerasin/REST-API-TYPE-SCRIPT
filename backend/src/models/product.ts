import { DataTypes, Model } from 'sequelize';
import sequelize from 'sequelize/types/lib/sequelize';
import db from '../config/db.config'
interface productSchema {
    id: number,
    product_code: number,
    product_name: string,
    description: string,
    price: number,
    createdBy: string,
    updatedBy: string,
    createdAt: Date,
    updatedAt: Date,
}


export class productInstance extends Model<productSchema> {
    public id!: number;
    public product_code!: number;
    public product_name!: string;
    public description!: string;
    public price!: number;
    public createdBy!: string;
    public updatedBy!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

productInstance.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        product_code: {
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },


    },
    {
        sequelize: db,
        tableName: "product",
        updatedAt: false,
    }
);