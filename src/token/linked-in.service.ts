import {HttpService, Injectable} from '@nestjs/common';
import {Observable, zip} from 'rxjs';
import {clientId, clientSecret} from '../main';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import * as querystring from 'querystring';
import * as fs from 'fs';
import {LiImageDto, PictureData} from '../dto/li-image.dto';
import {ILiProfile} from '../dto/li-profile.dto';

@Injectable()
export class LinkedInService {
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

    getInfo(): Observable<any> {
        return zip(this.getLiteInfo(), this.getImage())
            .pipe(
                map(res => {
                    const profile = res[0] as ILiProfile;
                    const img = res[1] as string;

                    return {
                        firstName: profile.localizedFirstName,
                        lastName: profile.localizedLastName,
                        picture: img,
                    };
                }),
            );
    }

    private getLiteInfo(): Observable<ILiProfile> {
        return this.http.get('https://api.linkedin.com/v2/me', {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        }).pipe(
            map(res => res.data as ILiProfile),
        );
    }

    getImage(): Observable<any> {
        return this.http.get('https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))', {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        }).pipe(
            switchMap(res => {
                const img = res.data as LiImageDto;
                const pictureData = img.profilePicture['displayImage~'] as PictureData;
                const url = pictureData.elements[0].identifiers[0].identifier;

                return this.imageToBase64(url);
            }),
        );
    }

    get token() {
        if (this.$token) {
            return this.$token;
        } else {
            this.$token = fs.readFileSync('./token.txt', {
                encoding: 'utf8',
            });

            return this.$token;
        }
    }

    private saveToken(token: string): void {
        fs.writeFile('./token.txt', token, {
            encoding: 'utf8',
        }, (err) => { if (err) { console.log(err); }});
    }

    private imageToBase64(url): Observable<string> {
        return this.http.get(url)
            .pipe(
                map(res => {
                    return new Buffer(res.data).toString('base64');
                }),
            );
    }
}
