import {Post, Get, Body, JsonController, QueryParams, Param, Put, Delete} from 'routing-controllers';
import DeviceBusiness from '../app/business/DeviceBusiness';

@JsonController("/device")
class DeviceController {
    constructor() {
    }

    @Get("/:id/detail")
    async getById(@Param("id") id: number): Promise<any> {
        return await DeviceBusiness.instance.getById(Number(id));
    }

    @Get("/")
    async getList(@QueryParams() query: {userId: number, ownerId: number, keyword: string, page: number, limit: number}): Promise<any> {
        return await DeviceBusiness.instance.getList(Number(query.userId), Number(query.ownerId), query.keyword, Number(query.page), Number(query.limit));
    }

    @Post("/create")
    async create(@Body({ validate: true }) data: any): Promise<any> {
        return await DeviceBusiness.instance.create(data);
    }

    @Put("/:id/update-info")
    async updateById(@Param("id") id: number, @Body({ validate: true }) data: any): Promise<any> {
        return await DeviceBusiness.instance.updateInfo(Number(id), data);
    }

    @Delete("/:id/delete")
    async deleteById(@Param("id") id: number): Promise<any> {
        return await DeviceBusiness.instance.delete(Number(id));
    }
}

Object.seal(DeviceController);
export default DeviceController;
