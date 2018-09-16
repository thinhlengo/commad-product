import {Post, Get, Body, UseBefore, UploadedFiles, UploadedFile, JsonController, QueryParams, Param, Put, Delete} from 'routing-controllers';
import DeviceBusiness from '../app/business/DeviceBusiness';
const is = require('is_js');
let bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
let path = require('path');
let multer = require('multer');

const fileUploadOptions = {
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, path.join(__dirname, `../../uploads`));
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, uuidv4() + '-' + file.originalname);
        }
    }),
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2
    }
};

// @UseBefore(bodyParser.urlencoded())
@JsonController("/device")
class DeviceController {
    constructor() {
    }

    @Get("/:id/detail")
    async getById(@Param("id") id: number): Promise<any> {
        return await DeviceBusiness.instance.getById(Number(id));
    }

    // @Get("/")
    // async getList(@QueryParams() query: {userId: number, ownerId: number, keyword: string, page: number, limit: number}): Promise<any> {
    //     return await DeviceBusiness.instance.getList(Number(query.userId), Number(query.ownerId), query.keyword, Number(query.page), Number(query.limit));
    // }

    @Post("/")
    async getList(@Body() body: any): Promise<any> {
        return await DeviceBusiness.instance.getList(Number(body.draw), Number(body.start), Number(body.length), body['search[value]']);
    }

    @Post("/create")
    async create(@Body() body: any, @UploadedFiles("files", {options: fileUploadOptions}) files: any[]): Promise<any> {
        let result = await DeviceBusiness.instance.create(body, files);
        return result;
    }

    @Put("/:id/update-info")
    async updateById(@Param("id") id: number, @Body() body: any, @UploadedFiles("files", {options: fileUploadOptions}) files: any[]): Promise<any> {
        return await DeviceBusiness.instance.updateInfo(Number(id), body);
    }

    @Delete("/:id/delete")
    async deleteById(@Param("id") id: number): Promise<any> {
        return await DeviceBusiness.instance.delete(Number(id));
    }
}

Object.seal(DeviceController);
export default DeviceController;
