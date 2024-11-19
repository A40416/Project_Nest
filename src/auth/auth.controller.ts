import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, responseMessage } from '@/decorator/customize';
import {  CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/login-auth.dto';
import { retryActiveDto } from './dto/retry-active.dto';
import { CodeAuthDto } from './dto/check-code.dto';
import { ChangePasswordAuthDto, SendCodeDto } from './dto/changepassword-auth.dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}


  @Post('login')
  @ApiResponse({
    type: String,
    status: 201,
    description: 'Success',
  })
  @ApiOperation({ summary: `Đăng nhập` })
  @Public()
  @UseGuards((LocalAuthGuard))
  @responseMessage("Fetch login")
  handleLogin(
    @Body(ValidationPipe) loginDto: AuthLoginDto,
  ):Promise<any> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @Public()
  @ApiResponse({
    type: String,
    status: 201,
    description: 'Success',
  })
  @ApiOperation({ summary: `Đăng kí` })
  register(
    @Body() registerDto: CreateAuthDto,
  ):Promise<any> {
    return this.authService.handlRegister(registerDto);
  }


  @Post('retry-active')
  @Public()
  @ApiOperation({ summary: `Send code kích hoạt tài khoản` })
  @ApiResponse({
    type: String,
    status: 201,
    description: 'Đã gửi code',
  })
  retryActive(
    @Body() emailDto: retryActiveDto,
  ):Promise<any> {
    const email = emailDto.email;
    return this.authService.retryActive(email);
  }

  @Post('check-code')
  @ApiResponse({
    type: String,
    status: 201,
    description: 'Đã kích hoạt tài khoản',
  })
  @ApiOperation({ summary: `Check code -  kích hoạt tài khoản` })
  @Public()
  checkCode(
    @Body() registerDto: CodeAuthDto,
  ):Promise<any> {
    return this.authService.checkCode(registerDto);
  }

  @Post('retry-password')
  @Public()
  @ApiOperation({ summary: `Quên mật khẩu tài khoản - send code` })
  @ApiResponse({
    type: String,
    status: 201,
    description: 'Code đã được gửi',
  })
  retryPassword(
    @Body() emailDto: SendCodeDto,
  ):Promise<any> {
    const email = emailDto.email;
    return this.authService.retryPassword(email);
  }

  @Post('change-password')
  @Public()
  @ApiOperation({ summary: `Thay đổi mật khẩu tài khoản`})
  @ApiResponse({
    type: String,
    status: 201,
    description: 'Mật khẩu đã được thay đổi',
  })
  changePassword(
    @Body() data: ChangePasswordAuthDto,
  ):Promise<any> {
    return this.authService.changePassword(data);
  }

  @ApiTags('MAIL')
  @Get('mail')
  @Public()
  @ApiOperation({ summary: `Gửi email test ^^`})
  testMail() {
    this.mailerService
      .sendMail({
        to: 'leevinh.cntt@gmail.com', // list of receivers
        subject: 'Hellu Vinh Sôkiuu', // Subject line
        text: 'welcome', // plaintext body
        template: "mails",
        context: {
          name: "Vinh",
          activationCode: 123
        }
      })
    return "ok";
  }

  @ApiTags('MAIL')
  @Get('test')
  @Public()
  @ApiOperation({ summary: `Gửi email test theo lịch`})
  testMailschedule() {
    this.authService.sendTestEmail();
    return 'ok';
  }
}
