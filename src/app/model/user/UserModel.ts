import BaseModel from '../common/interfaces/BaseModel';
class UserModel extends BaseModel {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
}

export default UserModel;
