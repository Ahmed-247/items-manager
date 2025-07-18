import { IsEmail, IsString, MinLength } from "class-validator";
import { Role } from "../entities/user.entity";

export class CreateUserDto {
    @IsString()
    name:string

    @IsEmail()
    email:string

    @IsString()
    @MinLength(6) 
    password:string

    @IsString()
    role:Role
}
