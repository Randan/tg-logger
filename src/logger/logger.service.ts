import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const LOG_LEVELS = ['silent', 'error', 'warn', 'info'] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

const LEVEL_RANK: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
};

const DEFAULT_LEVEL: LogLevel = 'info';

function parseLogLevel(raw: string | undefined): LogLevel {
  const value = raw?.trim().toLowerCase();
  return LOG_LEVELS.includes(value as LogLevel) ? (value as LogLevel) : DEFAULT_LEVEL;
}

@Injectable()
export class LoggerService {
  private readonly rank: number;

  constructor(private readonly config: ConfigService) {
    this.rank = LEVEL_RANK[parseLogLevel(this.config.get<string>('LOG_LEVEL'))];
  }

  log(...args: unknown[]): void {
    if (this.rank >= LEVEL_RANK.info) {
      console.log(...args);
    }
  }

  warn(...args: unknown[]): void {
    if (this.rank >= LEVEL_RANK.warn) {
      console.warn(...args);
    }
  }

  error(...args: unknown[]): void {
    if (this.rank >= LEVEL_RANK.error) {
      console.error(...args);
    }
  }
}
