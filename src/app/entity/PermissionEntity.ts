import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn} from 'typeorm';
import * as moment from 'moment';
import BaseModel from '../model/common/interfaces/BaseModel';
import {User} from './UserEntity';

@Entity()
export class Permission extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({name: 'userId', referencedColumnName: 'id'})
    user: number;

    @Column({
        type: 'integer'
    })
    level: number;

    @Column({
        type: 'varchar'
    })
    name: string;
}
