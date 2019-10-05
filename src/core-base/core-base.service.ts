import {Injectable} from '@nestjs/common';
import {UsersDto, UsersLookupPart} from '../dto/users.dto';
import * as fs from 'fs';

@Injectable()
export class CoreBaseService {
    private users: UsersDto[];

    constructor() {
        const json = JSON.parse(fs.readFileSync('./src/models/users.json', {
            encoding: 'utf8',
        }));

        this.users = json.users as UsersDto[];
    }

    lookup(keyword: string): UsersLookupPart[] {
        return this.users
            .filter(user => {
                return user.firstname.indexOf(keyword) > -1 || user.lastname.indexOf(keyword) > -1;
            }).map(user => {
                return {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                };
            });
    }

    getUserById(id: string): UsersDto {
        return this.users.find(user => user.id === Number(id));
    }

}
