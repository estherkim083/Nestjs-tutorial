import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getRootRoute() {
    return "hi there";
  }

  @Get("/bye")
  getByeThere() {
    return "bye there!";
  }
}
