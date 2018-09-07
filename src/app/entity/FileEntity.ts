import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import BaseModel from '../model/common/interfaces/BaseModel';

@Entity()
export class File extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({
        type: 'varchar'
    })
    size: number;

    @Column({
        type: 'varchar'
    })
    url: string;

    @Column({
        type: 'varchar'
    })
    extension: string;
}
