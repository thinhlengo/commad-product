import {EntityRepository, Repository} from 'typeorm';
import {Device} from '../entity/DeviceEntity';

@EntityRepository(Device)
export class DeviceRepository extends Repository<Device> {}
