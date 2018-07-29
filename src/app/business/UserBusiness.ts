import {UserRepository} from '../repository/UserRepository';
import {PermissionRepository} from '../repository/PermissionRepository';
import {ErrorCommon} from '../model/common/Error';
import UserModel from '../model/user/UserModel';
import {getCustomRepository, getConnection} from 'typeorm';
import {User} from '../entity/UserEntity';
import {Permission} from '../entity/PermissionEntity';
import {Message} from '../model/common/Message';

class UserBusiness {
    private userRepository = getCustomRepository(UserRepository);
    private permissionRepository = getCustomRepository(PermissionRepository);

    private static _instance: UserBusiness;

    constructor() {
        // this.userRepository = new UserRepository();
    }
    static get instance() {
        if (!UserBusiness._instance)
            UserBusiness._instance = new UserBusiness();
        return UserBusiness._instance;
    }
    async getList(name?: string, page?: number, limit?: number): Promise<User[]> {
        let users = await this.userRepository.find();
        // let listUser:User[] = [];
        // for (let index = 0; index < 10; index++) {
        //     let item : any = {
        //         firstName: 'Kenry',
        //         lastName: 'Phyam ' + index
        //     };
        //     listUser.push(item);
        // }
        return users;
    }

    async create(data: UserModel): Promise<any> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();

        // const users = await queryRunner.manager.create(User);
        // const permissions = await queryRunner.manager.create(Permission);

        // lets now open a new transaction:
        await queryRunner.startTransaction();

        try {
            const user = await this.userRepository.create(data);
            // let result = await this.userRepository.save(user);

            // const user = await queryRunner.manager.preload(User, data);
            let result = await queryRunner.manager.save(user);

            if (result) {
                let body = {
                    user: result.id,
                    level: 1,
                    name: 'Client'
                };

                const permission = this.permissionRepository.create(body);
                // const permission = await queryRunner.manager.preload(Permission, body);
                let permissionResult = await queryRunner.manager.save(permission);

                // const permission = this.permissionRepository.create(body);
                // await this.permissionRepository.save(permission);
            }
            // commit transaction now:
            await queryRunner.commitTransaction();

            // let msg = new Message(1, 'Crated user was success!');
            // if (!result) {
            //     msg.id = -1;
            //     msg.message = 'Create user unsuccess!';
            // }
            // return msg;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            // throw new ErrorCommon(101, error);
        }
    }
}
export default UserBusiness;
