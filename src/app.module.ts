import {HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkedInController } from './token/linked-in.controller';
import { LinkedInService } from './token/linked-in.service';
import { CoreBaseController } from './core-base/core-base.controller';
import { CoreBaseService } from './core-base/core-base.service';
import { PublishController } from './publish/publish.controller';
import { PublishService } from './publish/publish.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, LinkedInController, CoreBaseController, PublishController],
  providers: [AppService, LinkedInService, CoreBaseService, PublishService],
})
export class AppModule {}
