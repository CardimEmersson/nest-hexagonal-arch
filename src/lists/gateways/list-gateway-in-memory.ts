import {List} from '../entities/list.entity';
import {ListGatewayInterface} from './list-gateway-interface';

export class ListGatewayInMemory implements ListGatewayInterface {
  lists: List[] = [];

  async create(list: List): Promise<List> {
    list.id = this.lists.length + 1;
    this.lists.push(list);
    return list;
  }

  async findAll(): Promise<List[]> {
    return this.lists;
  }

  async findById(id: number): Promise<List> {
    const list = this.lists.find(list => list.id === id);

    if(!list) {
      throw new Error('List not found!');
    }

    return list;
  }
}