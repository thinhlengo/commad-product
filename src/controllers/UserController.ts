import {Post, Get, Body, JsonController, UseAfter} from 'routing-controllers';
import UserBusiness from '../app/business/UserBusiness';
import {User} from '../app/entity/UserEntity';

@JsonController("/user")
class UserController {
    constructor() {
    }

    @Get("/getlist")
    async getUsers(req): Promise<any> {
        return 'ok'; // sdf
    }

    @Post("/create")
    async create(@Body({ validate: true }) user: User): Promise<any> {
        user.firstName = user.firstName + ' (' + new Date().toDateString() + ')';
        let data = await UserBusiness.instance.create(user);
        return data;
    }
}

Object.seal(UserController);
export default UserController;
