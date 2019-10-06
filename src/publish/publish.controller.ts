import {Controller, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {PublishService} from './publish.service';

@Controller('publish')
export class PublishController {

    constructor(private publishService: PublishService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    publishFile(@UploadedFile() file, @Query() query) {
        return this.publishService.saveFile(file, query.name, query.type);
    }
}
