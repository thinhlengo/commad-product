import {DeviceRepository} from '../repository/DeviceRepository';
import {getCustomRepository, Brackets} from 'typeorm';
import Pagination from '../model/common/Pagination';
import * as moment from 'moment';
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

    async getList(userId: number, ownerId: number, keyword: string, page: number, limit: number): Promise<any> {
        try {
            let query = await this.deviceRepository.createQueryBuilder('device')
                .where('device.isDeleted IS NULL OR device.isDeleted IS FALSE');

            if (is.number(userId) && userId > 0)
                query.andWhere('device.userId = :userId', {userId: userId});

            if (is.number(ownerId) && ownerId > 0)
                query.andWhere('device.ownerId = :ownerId', {ownerId: ownerId});

            if (is.string(keyword)) {
                keyword = `%${keyword.trim()}%`;
                query.andWhere(new Brackets(qb => {
                    qb.where(`device.category ILIKE :keyword`, {keyword})
                        .orWhere(`device.model ILIKE :keyword`, {keyword});
                }));
            }

            let [devices, count] = await query
                .orderBy('device.id')
                .skip(new Pagination(page, limit).skip)
                .take(new Pagination(page, limit).limit)
                .getManyAndCount();

            return {
                data: devices,
                total: count
            };
        }
        catch (e) {
            return e;
        }
    }

    async create(data: any): Promise<any> {
        if (is.empty(data))
            return undefined;

        data = this.deviceRepository.create(data);
        return await this.deviceRepository.save(data);
    }

    async updateInfo(id: number, data: any): Promise<any> {
        if (!is.number(id) || id <= 0 || is.empty(data))
            return undefined;

        data.updatedDate = moment.utc().toDate();
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
