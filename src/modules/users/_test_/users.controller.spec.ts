import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UserService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Any } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })
      .compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'New User',
        cpf: '12345678900',
        email: 'newuser@example.com',
        password: 'password',
      };


      const result = await controller.create(createUserDto);

      expect(result).toEqual(createUserDto);
    });

    // Add more tests for validation scenarios here (e.g., duplicate email).
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ] as User[];

      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = 1;
      const user = { id: userId, name: 'User 1' } as User;

      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(String(userId));

      expect(result).toEqual(user);
    });

    // Add tests for scenarios where the user is not found.
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const userId = 1;
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'newpassword',
      };
      const updatedUser = {
        id: userId,
        ...updateUserDto,
      } as User;

      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);

      const result = await controller.update(String(userId), updateUserDto);

      expect(result).toEqual(updatedUser);
    });

    // Add tests for scenarios where the user is not found or validation fails.
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const userId = 1;

      jest.spyOn(userService, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(String(userId));

      expect(result).toBeUndefined();
    });

    // Add tests for scenarios where the user is not found.
  });
});
