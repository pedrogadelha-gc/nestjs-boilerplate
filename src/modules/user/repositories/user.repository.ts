import { CreateUserRequestDto } from '../dto/class-validator/create-user-request.dto';
import { CreateUserResponseDto } from '../dto/class-validator/create-user-response.dto';
import { FindUserResponseDto } from '../dto/class-validator/find-user-response.dto';

export abstract class UserRepository {
  abstract create(
    request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto>;
  abstract findMany(): Promise<FindUserResponseDto[]>;
  abstract findById(id: string): Promise<FindUserResponseDto | null>;
  abstract findByEmail(email: string): Promise<FindUserResponseDto | null>;
}
