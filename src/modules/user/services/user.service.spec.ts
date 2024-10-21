import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserRequestDto } from '../dto/class-validator/create-user-request.dto';
import { ConflictException } from '@nestjs/common';
import { EMAIL_ALREADY_TAKEN } from '../user.constants';
import { InMemoryUserRepository } from '../repositories/impl/in-memory-user.repository';
import { UserRepository } from '../repositories/user.repository';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: InMemoryUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useClass: InMemoryUserRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<InMemoryUserRepository>(UserRepository);
  });

  it('should create a new user', async () => {
    const userRequest: CreateUserRequestDto = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const user = await userService.create(userRequest);

    expect(user).toHaveProperty('id');
    expect(user.email).toEqual(userRequest.email);
    expect(user.name).toEqual(userRequest.name);
  });

  it('should throw a ConflictException if email is already taken', async () => {
    const userRequest: CreateUserRequestDto = {
      email: 'test@example.com',
      name: 'Test User',
    };

    await userService.create(userRequest);

    await expect(userService.create(userRequest)).rejects.toThrow(
      new ConflictException(EMAIL_ALREADY_TAKEN),
    );
  });

  it('should find a user by email', async () => {
    const userRequest: CreateUserRequestDto = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const newUser = await userService.create(userRequest);

    const foundUser = await userService.findByEmail('test@example.com');
    expect(foundUser).toEqual(newUser);
  });

  it('should return null if user by email does not exist', async () => {
    const foundUser = await userService.findByEmail('nonexistent@example.com');
    expect(foundUser).toBeNull();
  });

  it('should find a user by ID', async () => {
    const userRequest: CreateUserRequestDto = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const newUser = await userService.create(userRequest);

    const foundUser = await userService.findById(newUser.id);
    expect(foundUser).toEqual(newUser);
  });

  it('should return null if user by ID does not exist', async () => {
    const foundUser = await userService.findById('nonexistent-id');
    expect(foundUser).toBeNull();
  });
});
