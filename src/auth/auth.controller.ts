import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, responseMessage } from '@/decorator/customize';
import { ChangePasswordAuthDto, CodeAuthDto, CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/login-auth.dto';

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
  handleLogin(@Body(ValidationPipe) loginDto: AuthLoginDto)  {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handlRegister(registerDto);
  }

  @Post('check-code')
  @Public()
  checkCode(@Body() registerDto: CodeAuthDto) {
    return this.authService.checkCode(registerDto);
  }

  @Post('retry-active')
  @Public()
  retryActive(@Body("email") email: string) {
    return this.authService.retryActive(email);
  }

  @Post('retry-password')
  @Public()
  retryPassword(@Body() data: ChangePasswordAuthDto) {
    return this.authService.changePassword(data);
  }

  @Post('change-password')
  @Public()
  changePassword(@Body("email") email: string) {
    return this.authService.retryPassword(email);
  }


  @Get('mail')
  @ApiBearerAuth()
  @Public()
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
}
