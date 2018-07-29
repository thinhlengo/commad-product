import {EntityRepository, Repository} from 'typeorm';
import {User} from '../entity/UserEntity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

}

