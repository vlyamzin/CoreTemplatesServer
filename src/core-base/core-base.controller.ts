import {Controller, Get, Param, Query} from '@nestjs/common';
import {UsersDto, UsersLookupPart} from '../dto/users.dto';
import {CoreBaseService} from './core-base.service';

@Controller('core-base')
export class CoreBaseController {

    constructor(private coreBaseService: CoreBaseService) {}

    @Get('lookup')
    lookup(@Query() query): UsersLookupPart[] {
        return this.coreBaseService.lookup(query.keyword);
    }

    @Get('info')
    getInfo(@Query() query): UsersDto {
        return this.coreBaseService.getUserById(query.id);
    }
}
