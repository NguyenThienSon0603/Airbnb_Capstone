import { Body, Controller, Post } from '@nestjs/common';
import AuthService from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin-auth.dto';
import { SignUpDto } from './dto/signup-auth.dto';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Auth')
@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signin')
  async signin(@Body() signinDTO: SignInDto) {
    return await this.authService.signin(signinDTO);
  }
  @Public()
  @Post('/signup')
  async signup(@Body() signupDTO: SignUpDto) {
    return await this.authService.signup(signupDTO);
  }
}
export default AuthController;
