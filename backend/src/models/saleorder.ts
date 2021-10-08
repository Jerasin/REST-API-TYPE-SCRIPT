import { DataTypes, Model , Optional } from 'sequelize';
import sequelize from 'sequelize/types/lib/sequelize';
import db from '../config/db.config'

interface saleOrderSchema {
    id: number,
    saleOrderId: number,
    product_name: string,
    qty: string,
    price: string,
    doc_status: string,
    createdBy: string,
    updatedBy: string,
    createdAt: Date,
    updatedAt: Date,
}

interface saleOrderCreationAttributes extends Optional<saleOrderSchema, "id"> {}

export class saleOrderInstance extends Model<saleOrderSchema,saleOrderCreationAttributes> {

    public id!: number;
    public saleOrderId!: number;
    public product_name!: string;
    public qty!: number;
    public price!: number;
    public doc_status!: string;
    public createdBy!: string;
    public updatedBy!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

saleOrderInstance.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        saleOrderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qty: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        doc_status: {
            type: DataTypes.STRING,
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
        tableName: "saleorder",
        updatedAt: false,
    }
);