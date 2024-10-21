import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../../dto/class-validator/create-user-request.dto';
import { CreateUserResponseDto } from '../../dto/class-validator/create-user-response.dto';
import { FindUserResponseDto } from '../../dto/class-validator/find-user-response.dto';
import { UserRepository } from '../user.repository';
import { randomUUID } from 'node:crypto';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: FindUserResponseDto[] = [];

  public async create(
    request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const newUser: CreateUserResponseDto = {
      id: randomUUID(),
      email: request.email,
      name: request.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  public async findMany(): Promise<FindUserResponseDto[]> {
    return this.users;
  }

  public async findById(id: string): Promise<FindUserResponseDto | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  public async findByEmail(email: string): Promise<FindUserResponseDto | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}
