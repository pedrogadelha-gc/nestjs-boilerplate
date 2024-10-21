import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/class-validator/create-user-request.dto';
import { CreateUserResponseDto } from '../dto/class-validator/create-user-response.dto';
import { FindUserResponseDto } from '../dto/class-validator/find-user-response.dto';
import { UserService } from '../services/user.service';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import { RecoverPasswordRequestDto } from '../dto/zod/recover-password.request.dto';
import { ApiConsumes, ApiNotFoundResponse } from '@nestjs/swagger';
import { USER_NOT_FOUND } from '../user.constants';

@Controller('usuario')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: USER_NOT_FOUND })
  @Post()
  public create(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  public getById(@Param('id') id: string): Promise<FindUserResponseDto> {
    return this.userService.findById(id);
  }

  @Post('/recuperar-senha')
  @UsePipes(new ZodValidationPipe(RecoverPasswordRequestDto))
  public async recoverPassword(
    @Body() body: RecoverPasswordRequestDto,
  ): Promise<{ email: string }> {
    return {
      email: body.email,
    };
  }
}
