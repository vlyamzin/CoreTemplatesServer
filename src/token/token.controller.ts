import {Controller, Post, Body} from '@nestjs/common';
import {TokenService} from './token.service';
import {Observable, of} from 'rxjs';

export interface ILITokenQuery {
    code: string;
    state: string;
    redirectUri: string;
    error?: string;
    error_description?: string;
}

@Controller('li-token')
export class TokenController {

    constructor(private tokenService: TokenService) {}

    @Post()
    getToken(@Body() body: ILITokenQuery): Observable<any> {
        if (body.hasOwnProperty('error')) {
            return of(body.error_description);
        } else {
            return this.tokenService.getAccessToken(body.code, body.redirectUri);
        }
    }
}
