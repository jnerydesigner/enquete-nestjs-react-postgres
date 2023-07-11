import { CreateAuthorDto } from "@application/DTOs/create-author.dto";
import { UsersService } from "@application/services/users.service";
import { Body, Controller, Post } from "@nestjs/common";



@Controller("users")
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    createAuthor(@Body() body: CreateAuthorDto) {
        return this.usersService.createUser(body)
    }
}