import {DataTypes,Model , Optional} from 'sequelize';
import sequelize from 'sequelize/types/lib/sequelize';
import db from '../config/db.config'
interface userSchema {
    id: number,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

export class userInstance extends Model<userSchema> {

  public id!: number; 
  public email!: string;
  public password!: string;
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
        email:{
            type: new DataTypes.STRING(128),
            unique: true,
            allowNull: false,
        },
        password:{
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
        tableName: "user_info"
    }
);