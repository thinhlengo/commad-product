import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import * as moment from 'moment';
import {IsNotEmpty} from 'class-validator';
import BaseModel from '../model/common/interfaces/BaseModel';
@Entity()
export class User extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    firstName: string;

    @IsNotEmpty()
    @Column({
        type: 'varchar'
    })
    lastName: string;

    @Column({
        type: 'varchar'
    })
    fullName: string;

    @Column({
        type: 'boolean'
    })
    isActive: boolean;
}
