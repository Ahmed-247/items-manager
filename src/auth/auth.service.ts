import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtservice: JwtService
    ){}

    async validateUser(email:string, password:string){
        const user = await this.userService.findByEmail(email)
        if (!user) throw new UnauthorizedException('user not found')

        const match = await bcrypt.compare(password, user.password) 
        if(!match) throw new UnauthorizedException('invalid credentials')

            return user
    } 

    async login(user:any){
        const payload = {sub: user.id, email: user.email, role:user.role}
        return {access_token: this.jwtservice.sign(payload)}
    }
}
