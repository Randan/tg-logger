# @randan/tg-logger

Shared NestJS modules for Telegram bots: environment-aware logger and admin notification service.

## Installation

```bash
npm install @randan/tg-logger
```

### Peer dependencies

```bash
npm install @nestjs/common @nestjs/config nestjs-telegraf telegraf
```

## Modules

### LoggerModule

Global NestJS module providing `LoggerService`.

- `log(...args)` — logs only in development (`NODE_ENV=development`)
- `error(...args)` — always logs to stderr
- `warn(...args)` — always logs to stderr

### NotifyAdminModule

Global NestJS module providing `NotifyAdminService`.

Sends Telegram messages to the admin user specified by `ADMIN_TELEGRAM_ID` env variable. Silently skips if the variable is not set.

- `send(message, options?)` — sends a message with optional `parse_mode` (`'Markdown'` | `'HTML'`)

## Usage

### 1. Import modules in `app.module.ts`

```typescript
import { LoggerModule, NotifyAdminModule } from '@randan/tg-logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegramModule,
    LoggerModule,
    NotifyAdminModule,
  ],
})
export class AppModule {}
```

Both modules are `@Global()`, so services are available everywhere without extra imports.

### 2. Inject services

```typescript
import type { LoggerService, NotifyAdminService } from '@randan/tg-logger';

@Injectable()
export class MyService {
  constructor(
    private readonly logger: LoggerService,
    private readonly notifyAdmin: NotifyAdminService,
  ) {}

  doWork(): void {
    this.logger.log('Processing started');
    this.notifyAdmin.send('Something happened', { parse_mode: 'HTML' });
  }
}
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NODE_ENV` | No | Set to `development` to enable `log()` output |
| `ADMIN_TELEGRAM_ID` | No | Telegram user ID for admin notifications |

## License

MIT
