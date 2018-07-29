import {EntityRepository, Repository} from 'typeorm';
import {Permission} from '../entity/PermissionEntity';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {

}

