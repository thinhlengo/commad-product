import {FileRepository} from '../repository/FileRepository';
import {getCustomRepository, getConnection} from 'typeorm';
import {Message} from '../model/common/Message';
const is = require('is_js');

class FileBusiness {
    private fileRepository = getCustomRepository(FileRepository);

    private static _instance: FileBusiness;

    constructor() {
    }

    static get instance() {
        if (!FileBusiness._instance)
            FileBusiness._instance = new FileBusiness();
        return FileBusiness._instance;
    }

    async create(data: any): Promise<any> {
        if (is.empty(data))
            return undefined;
        try {
            data = this.fileRepository.create(data);
            return await this.fileRepository.save(data);
        }
        catch (e) {
            return e;
        }
    }

    async delete(id: number): Promise<any> {
        if (!is.number(id))
            return false;

        let result = await this.fileRepository.delete(id);
        if (result && result.raw && !result.raw.length)
            return {data: true};
        else
            return {data: false};
    }
}
export default FileBusiness;
