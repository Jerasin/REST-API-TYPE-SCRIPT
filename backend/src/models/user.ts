import { DataTypes, Model } from 'sequelize';
import sequelize from 'sequelize/types/lib/sequelize';
import db from '../config/db.config'
interface userSchema {
    id: number,
    email: string,
    password: string,
    user_role: string,
    updatedBy: string,
    createdAt: Date,
    updatedAt: Date,
}

export class userInstance extends Model<userSchema> {

    public id!: number;
    public email!: string;
    public password!: string;
    public user_role!: string;
    public updatedBy!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

userInstance.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        user_role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
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
        tableName: "user_info",
        updatedAt: false,
    }
);