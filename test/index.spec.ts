import { Test } from '@nestjs/testing';
import { AsyncCacheDedupeModule } from '../src/index.js';
import { TestService } from './test.service.js';

describe('AsyncCacheDedupeModule', () => {
  let testService: TestService;
  let runSpy: jest.SpyInstance;
  let runWithObjSpy: jest.SpyInstance;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AsyncCacheDedupeModule.forRoot()],
      providers: [TestService],
    }).compile();

    testService = moduleRef.get(TestService);

    // 设置 spy 来追踪内部方法的调用
    runSpy = jest.spyOn(testService as any, '_run');
    runWithObjSpy = jest.spyOn(testService as any, '_runWithObj');
  });

  beforeEach(() => {
    runSpy.mockClear();
    runWithObjSpy.mockClear();
  });

  it('should cache and dedupe function calls with primitive parameters', async () => {
    // 同时发起两个相同参数的调用
    const [result1, result2] = await Promise.all([
      testService.run('aaaa', 12),
      testService.run('aaaa', 12)
    ]);

    // 验证结果相同
    expect(result1).toMatchObject({"age": 12, "myName": "haha", "name": "aaaa"});
    expect(result2).toMatchObject({"age": 12, "myName": "haha", "name": "aaaa"});
    // 验证实际只调用了一次
    expect(runSpy).toHaveBeenCalledTimes(1);
  });

  it('should cache and dedupe function calls with object parameters', async () => {
    const params = { name: 'aaaa', age: 12 };

    // 同时发起三个相同参数的调用
    const [result1, result2, result3] = await Promise.all([
      testService.runWithObj(params),
      testService.runWithObj(params),
      testService.runWithObj(params)
    ]);

    // 验证结果相同
    expect(result1).toBe(true);
    expect(result2).toBe(true);
    expect(result3).toBe(true);
    // 验证实际只调用了一次
    expect(runWithObjSpy).toHaveBeenCalledTimes(1);
  });

  it('should not dedupe calls with different parameters', async () => {
    await testService.run('aaaa', 12);
    await testService.run('bbbb', 12);

    expect(runSpy).toHaveBeenCalledTimes(2);
  });
});
