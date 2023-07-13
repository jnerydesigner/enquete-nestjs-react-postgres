import { UsersService } from "@application/services/users.service";
import { UsersController } from "@controllers/users/user.controller";
import { Module } from "@nestjs/common";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
