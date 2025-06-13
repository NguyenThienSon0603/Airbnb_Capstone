import { Body, Controller, Get, Post } from '@nestjs/common';
import AuthService from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin-auth.dto';
import { SignUpDto } from './dto/signup-auth.dto';

@ApiTags('Auth')
@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() signinDTO: SignInDto) {
    return await this.authService.signin(signinDTO);
  }

  @Post('/signup')
  async signup(@Body() signupDTO: SignUpDto) {
    return await this.authService.signup(signupDTO);
  }
}
export default AuthController;
