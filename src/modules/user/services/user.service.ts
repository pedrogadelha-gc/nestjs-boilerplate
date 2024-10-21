import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/class-validator/create-user-request.dto';
import { CreateUserResponseDto } from '../dto/class-validator/create-user-response.dto';
import { EMAIL_ALREADY_TAKEN } from '../user.constants';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async create(
    request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const existingUser = await this.userRepo.findByEmail(request.email);

    if (existingUser) {
      // TODO: should this be a constant or a custom exception ?
      // throw new EmailAlreadyTakenException();
      throw new ConflictException(EMAIL_ALREADY_TAKEN);
    }

    return await this.userRepo.create(request);
  }

  public async findByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }

  public async findById(id: string) {
    return this.userRepo.findById(id);
  }
}
