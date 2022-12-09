import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  // Partial -  User 객체의 적어도 하나, None, 모든 속성을 갖고 있음을 표시.
  async update(id: number, attrs: Partial<User>) {
    var user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs); // 객체 속성 모두 user로 복사
    return this.repo.save(user); // save vs (insert, update)
  }

  async remove(id: number) {
    // remove(Entity)- twoRoundTrip , Entity 를 fetch 해야 함.
    //  vs delete(id)- 빠름 그러나, entity 는 실행되지 않아서,
    // hook- logRemove 이 실행되지 않는다.
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
