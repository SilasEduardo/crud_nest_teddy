import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AppError } from '../../../shared/Error/AppError';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }] as User[];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await userService.findAll();

      expect(result).toEqual(users);
    });
  });

  // Write similar tests for other methods such as 'create', 'update', 'remove', etc.
});
