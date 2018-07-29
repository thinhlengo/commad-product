import * as moment from 'moment';
import {Column, BaseEntity} from 'typeorm';
class BaseModel extends BaseEntity {
    @Column({
        type: Date,
        default: moment.utc().toDate()
    })
    createdDate: Date;

    @Column({
        type: Date,
        nullable: true
    })
    updatedDate: Date;

    @Column({
        type: Boolean,
        nullable: true
    })
    isDeleted: boolean;

    constructor() {
        super();
        this.createdDate = moment.utc().toDate();
    }
}

export default BaseModel;
