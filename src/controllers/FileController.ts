import {Post, Get, Body, JsonController, UploadedFile, Delete, Param} from 'routing-controllers';
import Project from '../config/Project';
import FileBusiness from '../app/business/FileBusiness';
const is = require('is_js');
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

@JsonController("/file")
class FileController {
    constructor() {
    }

    @Post("/upload")
    async uploadInfo(@UploadedFile("file", {options: fileUploadOptions}) file: any): Promise<any> {
        if (is.empty(file))
            return undefined;

        let bodyFile = {
            name: file.filename,
            url: Project.PROTOTYPE + '://' + Project.HOST + ':' + Project.PORT + '/' + file.filename,
            size: file.size,
            extension: file.mimetype
        };

        return await FileBusiness.instance.create(bodyFile);
    }

    @Delete("/:id/delete")
    async delete(@Param("id") id: number): Promise<any> {
        return await FileBusiness.instance.delete(id);
    }
}

Object.seal(FileController);
export default FileController;
