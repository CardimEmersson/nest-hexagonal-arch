import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { ListsService } from './lists.service';
import { of } from 'rxjs';
// import { List } from './entities/list.entity';

// const mockList = {
//   // create: jest.fn().mockReturnValue(Promise.resolve(new List('my list', 1)),
// }

const mockHttpService = {
  post: jest.fn().mockReturnValue(of(null)),
}

describe('ListsService', () => {
  // let service: ListsService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ListsService],
  //   }).compile();

  //   service = module.get<ListsService>(ListsService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  let service: ListsService;
  let listPersistenceGateway: ListGatewayInMemory;
  let listIntergrationGateway: ListGatewayInMemory;


  beforeEach(async () => {
    listPersistenceGateway = new ListGatewayInMemory();
    listIntergrationGateway = new ListGatewayInMemory();
    service = new ListsService(listPersistenceGateway, listIntergrationGateway);
  });

  it('deve criar uma lista', async () => {
    const list = await service.create({ name: 'my list' });

    expect(listPersistenceGateway.lists).toEqual([list]);
    expect(listIntergrationGateway.lists).toEqual([list]);
  })
});
