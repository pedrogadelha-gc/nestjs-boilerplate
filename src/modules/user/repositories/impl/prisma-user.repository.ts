import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/database/prisma/prisma.service';
import { CreateUserRequestDto } from '../../dto/class-validator/create-user-request.dto';
import { CreateUserResponseDto } from '../../dto/class-validator/create-user-response.dto';
import { FindUserResponseDto } from '../../dto/class-validator/find-user-response.dto';
import { UserRepository } from '../user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return await this.prismaService.user.create({
      data: {
        email: request.email,
        name: request.name,
      },
    });
  }
  public findMany(): Promise<FindUserResponseDto[]> {
    return this.prismaService.user.findMany();
  }
  public findById(id: string): Promise<FindUserResponseDto | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
  public findByEmail(email: string): Promise<FindUserResponseDto | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
