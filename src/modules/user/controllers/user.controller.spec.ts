import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { CreateUserRequestDto } from '../dto/class-validator/create-user-request.dto';
import { CreateUserResponseDto } from '../dto/class-validator/create-user-response.dto';
import { NotFoundException } from '@nestjs/common';
import { InMemoryUserRepository } from '../repositories/impl/in-memory-user.repository';
import { UserRepository } from '../repositories/user.repository';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user and return the user data', async () => {
      const createUserDto: CreateUserRequestDto = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const result = await userController.create(createUserDto);

      expect(result.email).toEqual(createUserDto.email);
      expect(result.name).toEqual(createUserDto.name);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });
  });

  describe('getById', () => {
    it('should return a user by ID', async () => {
      const createUserDto: CreateUserRequestDto = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const createdUser: CreateUserResponseDto =
        await userController.create(createUserDto);

      const result = await userController.getById(createdUser.id);

      expect(result).toEqual(createdUser);
    });
  });
});
