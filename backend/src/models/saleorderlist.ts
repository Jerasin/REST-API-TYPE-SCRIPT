import {
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
} from 'sequelize';
import sequelize from 'sequelize/types/lib/sequelize';
import db from '../config/db.config'
import { saleOrderInstance } from './saleorder'
interface saleOrderListSchema {
    id: number,
    saleOrderId: number,
    qtyTotal: number,
    priceTotal: number,
    doc_status: string,
    createdBy: string,
    updatedBy: string,
    createdAt: Date,
    updatedAt: Date,
}

interface SaleOrderListCreationAttributes extends Optional<saleOrderListSchema,
    "id"

> { }

export class saleOrderListInstance extends Model<saleOrderListSchema, SaleOrderListCreationAttributes> implements saleOrderListSchema {

    public id!: number;
    public saleOrderId!: number;
    public qtyTotal!: number;
    public priceTotal!: number;
    public doc_status!: string;
    public createdBy!: string;
    public updatedBy!: string;
    public createdAt!: Date;
    public updatedAt!: Date;


    public getSaleOrder!: HasManyGetAssociationsMixin<saleOrderInstance>;
    public addSaleOrder!: HasManyAddAssociationMixin<saleOrderInstance, number>;
    public hasSaleOrder!: HasManyHasAssociationMixin<saleOrderInstance, number>;
    public countSaleOrder!: HasManyCountAssociationsMixin;
    public createSaleOrder!: HasManyCreateAssociationMixin<saleOrderInstance>;

    public static associations: {
        saleOrder: Association<saleOrderListInstance, saleOrderInstance>;
    };
}


saleOrderListInstance.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        saleOrderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            allowNull: false,
            // references: {
            //     model: 'saleOrderInstance',
            //     key: 'saleOrderId'
            //   },
            //   onDelete: 'CASCADE',
            //   onUpdate: 'CASCADE'
        },
        qtyTotal: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        priceTotal: {
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
        tableName: "saleorderlist",
        updatedAt: false,
    }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
saleOrderListInstance.hasMany(saleOrderInstance, {
    sourceKey: "saleOrderId",
    foreignKey: "saleOrderId",
    as: "saleOrder", // this determines the name in `associations`!
});