import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PublishService {

    saveFile(file, name, ext) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`./cv_files/${name}_${this.getTimestamp()}${ext}`, file.buffer, { encoding: 'binary'}, (err) => {
              if (err) {
                  reject('Failed');
              } else {
                  resolve('Ok');
              }
            });
        });
    }

    private getTimestamp(): string {
        return new Date().getTime().toString();
    }
}
