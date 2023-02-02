import { Inject, Injectable } from "@nestjs/common";
import { ListGatewayInterface } from "./list-gateway-interface";
import { HttpService } from "@nestjs/axios";
import { List } from "../entities/list.entity";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ListGatewayHttp implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService
  ) {
  }

  async create(list: List): Promise<List> {
    await lastValueFrom(this.httpService.post('/lists', {
      name: list.name
    }));
    return list;
  }

  async findAll(): Promise<List[]> {
    const response = await lastValueFrom(
      this.httpService.get<any[]>('/lists')
    );

    return response.data.map((list: any) => new List(list.name, list.id));
  }

  async findById(id: number): Promise<List> {
    const response = await lastValueFrom(
      this.httpService.get<any>(`/lists/${id}`)
    );

    return new List(response.data.name, response.data.id);
  }
}