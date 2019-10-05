import {HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkedInController } from './token/linked-in.controller';
import { LinkedInService } from './token/linked-in.service';
import { CoreBaseController } from './core-base/core-base.controller';
import { CoreBaseService } from './core-base/core-base.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, LinkedInController, CoreBaseController],
  providers: [AppService, LinkedInService, CoreBaseService],
})
export class AppModule {}
