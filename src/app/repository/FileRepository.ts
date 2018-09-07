import {EntityRepository, Repository} from 'typeorm';
import {File} from '../entity/FileEntity';

@EntityRepository(File)
export class FileRepository extends Repository<File> {}
