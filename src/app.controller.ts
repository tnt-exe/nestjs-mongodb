import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiAcceptedResponse, ApiBody, ApiConsumes, ApiOkResponse, ApiProduces, ApiTags } from '@nestjs/swagger';

@ApiTags("hmm2")
@Controller()
@ApiConsumes("application/json")
@ApiProduces("application/json")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOkResponse({ description: "this is desc" })
  @ApiBody({ type: String })
  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }
}
