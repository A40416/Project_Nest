import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service'; 
import { comparePasswordHelper } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { retryActiveDto } from './dto/retry-active.dto';
import { CodeAuthDto } from './dto/check-code.dto';
import { ChangePasswordAuthDto } from './dto/changepassword-auth.dto';
import { Cron } from '@nestjs/schedule';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if(!user) return null;
    const isValidPassword=await comparePasswordHelper(pass, user.password)
    if(!isValidPassword) return null;
    return user;
  }
  async login(user: any):Promise<any> {
    const payload = { username: user.email, sub: user._id };
    return {
      user:{
        email: user.email,
        _id:  user._id,
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
  handlRegister= async(registerDto: CreateAuthDto):Promise<any> => {
    return await this.usersService.handleRegister(registerDto);
  }
  checkCode= async(data: CodeAuthDto):Promise<any> => {
    return await this.usersService.handleActive(data);
  }
  retryActive = async(data: string):Promise<any> => {
    return await this.usersService.retryActive(data);
  }
  retryPassword = async(data: string):Promise<any> => {
    return await this.usersService.retryPassword(data);
  }
  changePassword = async(data: ChangePasswordAuthDto):Promise<any> => {
    return await this.usersService.changePassword(data);
  }
  sendTestEmail = async() => {
    return await this.usersService.sendTestEmail();
  }
  @Cron('0 30 11 * * 1-5') 
  async scheduleTestEmail() {
    await this.sendTestEmail();
    console.log('Scheduled email sent every minute!');
  }
}
