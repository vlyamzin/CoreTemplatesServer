import {HttpService, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {clientId, clientSecret} from '../main';
import {catchError, map, tap} from 'rxjs/operators';
import * as querystring from 'querystring';
import * as fs from 'fs';

@Injectable()
export class TokenService {
    private $token: string;
    constructor(private readonly http: HttpService) {}

    getAccessToken(code: string, redirect: string): Observable<any> {
        const data = querystring.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirect,
            client_id: clientId,
            client_secret: clientSecret,
        });

        return this.http.post('https://www.linkedin.com/oauth/v2/accessToken', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).pipe(
            map((response) => {
                this.$token = response.data.access_token;
                this.saveToken(this.$token);
                return response.data;
            }),
            catchError(err => {
                console.log(err);
                return err;
            }),
        );
    }

    get token() {
        return this.$token;
    }

    private saveToken(token: string): void {
        fs.writeFile('./token.txt', token, {
            encoding: 'utf8',
        }, (err) => { if (err) { console.log(err); }});
    }
}
