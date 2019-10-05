import {Controller, Post, Body, Get} from '@nestjs/common';
import {LinkedInService} from './linked-in.service';
import {Observable, of} from 'rxjs';
import {ILiProfile} from '../dto/li-profile.dto';

export interface ILITokenQuery {
    code: string;
    state: string;
    redirectUri: string;
    error?: string;
    error_description?: string;
}

@Controller('li')
export class LinkedInController {

    constructor(private linkedInService: LinkedInService) {}

    @Post('token')
    getToken(@Body() body: ILITokenQuery): Observable<any> {
        if (body.hasOwnProperty('error')) {
            return of(body.error_description);
        } else {
            return this.linkedInService.getAccessToken(body.code, body.redirectUri);
        }
    }

    @Get('profile')
    getProfile(): Observable<ILiProfile> {
        return this.linkedInService.getInfo();
    }
}
