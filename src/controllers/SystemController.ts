import {Get, JsonController, UseAfter, Param, QueryParam} from 'routing-controllers';

@JsonController('/system')
export class SystemController {
    @Get("/initData")
    getAll() {
        return 'This action returns all users';
    }
    @Get('/get')
    getOne(@QueryParam("id") id: number) {
        return id;
    }
}
