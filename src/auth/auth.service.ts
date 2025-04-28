import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import { User } from "../users/models/user.model";

const ERROR_MESSAGES = {
  USER_EXISTS: "Bunday emailli foydalanuvchi mavjud",
  INVALID_CREDENTIALS: "Email yoki Password noto'gri",
  NO_ROLE: "Sizda bunday role yo'q"
};

const TOKEN_EXPIRATION = '24h';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
      isActive: user.is_active,
    };
    return {token: this.jwtService.sign(payload)};
  }

  async signUp(createUserDto: CreateUserDto) {
    const condidate = await this.userService.findByEmail(createUserDto.email);
    if (condidate) {
      throw new BadRequestException(ERROR_MESSAGES.USER_EXISTS);
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    createUserDto.password = hashedPassword;

    const newUser = await this.userService.create(createUserDto);
    return this.generateToken(newUser);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    
    const validPassword = await bcrypt.compare(
      signInDto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }
    
    const hasRole = user.roles.some(role => role.value === signInDto.value.toUpperCase());
    if (!hasRole) {
      throw new ForbiddenException(ERROR_MESSAGES.NO_ROLE);
    }
    
    return this.generateToken(user);
  }
}
