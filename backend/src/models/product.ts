import {DataTypes,Model} from 'sequelize';
import sequelize from 'sequelize/types/lib/sequelize';
import db from '../config/db.config'
interface productSchema {
    id: number,
    name: string,
    description: string,
    price: number,
    createdAt: Date,
    updatedAt: Date,
}


export class productInstance extends Model<productSchema> {}

productInstance.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: new DataTypes.STRING(128),
            unique: true,
            allowNull: false,
        },
        description:{
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        price:{
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        createdAt:{
            type: new DataTypes.DATE,
            allowNull: false,
        },
        updatedAt:{
            type: new DataTypes.DATE,
            allowNull: false,
        },
        

    },
    {
        sequelize:db,
        tableName: "product"
    }
);