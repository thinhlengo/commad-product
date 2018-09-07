import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import BaseModel from '../model/common/interfaces/BaseModel';

@Entity()
export class Device extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int8'
    })
    ownerId: number;

    @Column({
        type: 'int8'
    })
    userId: number;

    @Column({
        type: 'varchar'
    })
    category: string;

    @Column({
        type: 'varchar'
    })
    model: string;

    @Column({
        type: 'varchar'
    })
    color: string;

    @Column({
        type: 'varchar'
    })
    size: string;

    @Column({
        type: 'int8'
    })
    price: number;

    @Column({
        type: 'varchar'
    })
    firstPictureUrl: string;

    @Column({
        type: 'varchar'
    })
    secondPictureUrl: string;

    @Column({
        type: 'varchar'
    })
    description: string;
}
