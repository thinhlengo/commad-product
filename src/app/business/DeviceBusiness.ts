import FileBusiness from './FileBusiness';
import {DeviceRepository} from '../repository/DeviceRepository';
import {getCustomRepository, Brackets} from 'typeorm';
import Pagination from '../model/common/Pagination';
import * as moment from 'moment';
import Project from '../../config/Project';
const is = require('is_js');

class DeviceBusiness {
    private deviceRepository = getCustomRepository(DeviceRepository);

    private static _instance: DeviceBusiness;

    constructor() {
    }

    static get instance() {
        if (!DeviceBusiness._instance)
            DeviceBusiness._instance = new DeviceBusiness();
        return DeviceBusiness._instance;
    }

    async getById(id: number): Promise<any> {
        let query = await this.deviceRepository.createQueryBuilder('device')
            .where('device.id = :id', {id: id})
            .andWhere('device.isDeleted IS NULL OR device.isDeleted IS FALSE')
            .orderBy('device.id')
            .getOne();
        if (query)
            return query;
        else
            return {data: null};
    }

    async getList(draw: number, start: number, length: number, keyword: string): Promise<any> {
        let query = await this.deviceRepository.createQueryBuilder('device')
            .andWhere(new Brackets(qb => {
                qb.where('device.isDeleted IS NULL')
                    .orWhere('device.isDeleted IS FALSE');
            }));

        if (is.string(keyword) && keyword.length > 0) {
            keyword = `%${keyword.trim()}%`;
            query = query.andWhere(new Brackets(qb => {
                qb.where(`device.category ILIKE :keyword`, {keyword})
                    .orWhere(`device.model ILIKE :keyword`, {keyword});
            }));
        }

        let [devices, count] = await query
            .orderBy('device.id')
            .skip(start)
            .take(length)
            .getManyAndCount();

        return {
            draw: draw,
            data: devices,
            recordsTotal: count,
            recordsFiltered: count
        };
    }

    // async getList(userId: number, ownerId: number, keyword: string, page: number, limit: number): Promise<any> {
    //     try {
    //         let query = await this.deviceRepository.createQueryBuilder('device')
    //             .where('device.isDeleted IS NULL OR device.isDeleted IS FALSE');

    //         if (is.number(userId) && userId > 0)
    //             query.andWhere('device.userId = :userId', {userId: userId});

    //         if (is.number(ownerId) && ownerId > 0)
    //             query.andWhere('device.ownerId = :ownerId', {ownerId: ownerId});

    //         if (is.string(keyword)) {
    //             keyword = `%${keyword.trim()}%`;
    //             query.andWhere(new Brackets(qb => {
    //                 qb.where(`device.category ILIKE :keyword`, {keyword})
    //                     .orWhere(`device.model ILIKE :keyword`, {keyword});
    //             }));
    //         }

    //         let [devices, count] = await query
    //             .orderBy('device.id')
    //             .skip(new Pagination(page, limit).skip)
    //             .take(new Pagination(page, limit).limit)
    //             .getManyAndCount();

    //         return {
    //             data: devices,
    //             total: count
    //         };
    //     }
    //     catch (e) {
    //         return e;
    //     }
    // }

    async create(data: any, files: any[]): Promise<any> {
        if (is.empty(data) || is.empty(files))
            return undefined;

        let bodyFiles: any[] = [];
        files.forEach(file => {
            let bodyFile = {
                name: file.filename,
                url: Project.PROTOTYPE + '://' + Project.HOST + ':' + Project.PORT + '/' + file.filename,
                size: file.size,
                extension: file.mimetype
            };
            bodyFiles.push(bodyFile);
        });

        files = await FileBusiness.instance.create(bodyFiles);

        data.firstPictureUrl = files[0].url;
        data.secondPictureUrl = files[1].url;

        data = this.deviceRepository.create(data);
        return await this.deviceRepository.save(data);
    }

    async updateInfo(id: number, data: any): Promise<any> {
        if (!is.number(id) || id <= 0 || is.empty(data))
            return undefined;

        data.updatedDate = moment.utc().toDate();
        // let body = {
        //     ownerId: data.ownerId,
        //     category: data.category,
        //     model: data.model,
        //     color: data.color,
        //     size: data.size,
        //     price: data.price,
        //     description: data.description,
        //     updatedDate: moment.utc().toDate()
        // };
        let result = await this.deviceRepository.createQueryBuilder('device')
            .update()
            .set(data)
            .whereInIds([id])
            .execute();

        if (result && result.raw && !result.raw.length)
            return {data: true};
        else
            return {data: false};
    }

    async delete(id: number): Promise<any> {
        if (!is.number(id) || id <= 0)
            return undefined;

        let data = {
            updatedDate: moment.utc().toDate(),
            isDeleted: true
        };
        let result = await this.deviceRepository.createQueryBuilder('device')
            .update()
            .set(data)
            .whereInIds([id])
            .execute();

        if (result && result.raw && !result.raw.length)
            return {data: true};
        else
            return {data: false};
    }
}
export default DeviceBusiness;
