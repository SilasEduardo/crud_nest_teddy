import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppError } from 'src/shared/Error/AppError';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async cpfAreadyExists(cpf: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: {
        cpf
      }
    })

    return user
  }

  async emailAreadyExists(email: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: {
        email
      }
    })
    return user
  }

  async idAreadyExists(id: number): Promise<User> {
    const user = this.userRepository.findOne({
      where: {
        id
      }
    })
    return user
  }


  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {

    const user = await this.idAreadyExists(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    return this.userRepository.findOne({ where: { id } });
  }




  async create(createUserDto: CreateUserDto,): Promise<User> {

    const { email, cpf } = createUserDto

    const userEmail = await this.emailAreadyExists(email)
    if (userEmail) {
      throw new AppError('user already exists with email', 400)
    }

    const userCPF = await this.cpfAreadyExists(cpf)
    if (userCPF) {
      throw new AppError('user already exists with cpf', 400)
    }

    const newuser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newuser);
  }



  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    const { email } = updateUserDto

    const user = await this.idAreadyExists(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userEmail = await this.emailAreadyExists(email)

    if (userEmail && user.email !== email) {
      throw new AppError('user already exists with email', 400)
    }


    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const user = await this.idAreadyExists(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    await this.userRepository.delete(id);
  }
}