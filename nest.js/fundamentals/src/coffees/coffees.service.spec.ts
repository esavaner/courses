import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entities';
import { Flavor } from './entities/flavor.entitiy';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const tModule: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = tModule.get<CoffeesService>(CoffeesService);
    coffeeRepository = tModule.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the coffee object', async () => {
      const id = '1';
      const expectedCoffee = {};
      coffeeRepository.findOne.mockReturnValue(expectedCoffee);
      const coffee = await service.findOne(id);
      expect(coffee).toEqual(expectedCoffee);
    });
    it('should throw NotFoundException', async () => {
      const coffeeId = '1';
      coffeeRepository.findOne.mockReturnValue(undefined);

      try {
        await service.findOne(coffeeId);
        expect(false).toBeTruthy();
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
      }
    });
  });
});
