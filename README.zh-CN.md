# Nest Async Cache Dedupe

[![Publish Package to NPM](https://github.com/little-thing/nestjs-async-cache-dedupe/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/little-thing/nestjs-async-cache-dedupe/actions/workflows/publish.yml)

[English](README.md) | [中文](README.zh-CN.md)

一个用于 NestJS 的高性能函数调用缓存和去重解决方案。专门解决在高并发场景下重复函数调用导致的性能问题。

## 特性

- 🚀 支持函数级别的并发调用去重
- ⚡️ 支持瞬时缓存（无 TTL）和持久缓存
- 🔄 自动处理相同参数的并发调用
- 💾 可配置多种存储后端（Memory/Redis）
- 🎯 完美集成 NestJS 装饰器系统

## 安装

```bash
npm install nest-async-cache-dedupe
```

## 快速开始

### 注册模块

```ts
import { AsyncCacheDedupeModule } from 'nest-async-cache-dedupe';

@Module({
  imports: [AsyncCacheDedupeModule.forRoot()],
})
export class AppModule {}
```

### 使用装饰器

```ts
class SomeService {
  // 瞬时缓存示例（并发去重）
  @AsyncCacheDedupe()
  async fetchData(id: string) {
    // 多个相同参数的并发调用只会执行一次
    return await this.heavyOperation(id);
  }

  // 持久缓存示例
  @AsyncCacheDedupe({
    ttl: 60, // 缓存60秒
  })
  async getUserProfile(userId: string) {
    return await this.userRepository.findOne(userId);
  }
}
```

## 使用场景

1. **并发请求优化**：当多个请求同时调用相同的函数和参数时，只执行一次实际操作
2. **核心业务功能复用**：对频繁调用的核心业务函数进行缓存
3. **API 性能优化**：减少对数据库或外部服务的重复调用

## 高级配置

### Redis 存储配置

```ts
AsyncCacheDedupeModule.forRoot({
  storage: {
    type: 'redis',
    options: {
      host: 'localhost',
      port: 6379
    }
  }
})
```

## 开源协议

MIT Licensed 