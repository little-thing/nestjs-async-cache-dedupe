# Nest Async Cache Dedupe

[![Publish Package to NPM](https://github.com/little-thing/nestjs-async-cache-dedupe/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/little-thing/nestjs-async-cache-dedupe/actions/workflows/publish.yml)

[English](README.md) | [中文](README.zh-CN.md)

A high-performance function call caching and deduplication solution for NestJS, specifically designed to solve performance issues caused by duplicate function calls in high-concurrency scenarios.

## Features

- 🚀 Function-level concurrent call deduplication
- ⚡️ Support for instant caching (no TTL) and persistent caching
- 🔄 Automatic handling of concurrent calls with identical parameters
- 💾 Configurable storage backends (Memory/Redis)
- 🎯 Seamless integration with NestJS decorator system

## Installation

```bash
npm install nest-async-cache-dedupe
```

## Quick Start

### Register Module

```ts
import { AsyncCacheDedupeModule } from 'nest-async-cache-dedupe';

@Module({
  imports: [AsyncCacheDedupeModule.forRoot()],
})
export class AppModule {}
```

### Use Decorator

```ts
class SomeService {
  // Instant cache example (concurrent deduplication)
  @AsyncCacheDedupe()
  async fetchData(id: string) {
    // Multiple concurrent calls with same parameters will only execute once
    return await this.heavyOperation(id);
  }

  // Persistent cache example
  @AsyncCacheDedupe({
    ttl: 60, // Cache for 60 seconds
  })
  async getUserProfile(userId: string) {
    return await this.userRepository.findOne(userId);
  }
}
```

## Use Cases

1. **Concurrent Request Optimization**: Execute actual operation only once when multiple requests call the same function with identical parameters
2. **Core Business Function Reuse**: Cache frequently called core business functions
3. **API Performance Optimization**: Reduce duplicate calls to databases or external services

## Advanced Configuration

### Redis Storage Configuration

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

## License

MIT Licensed
