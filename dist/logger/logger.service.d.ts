import type { ConfigService } from '@nestjs/config';
export declare class LoggerService {
    private readonly config;
    private readonly isDev;
    constructor(config: ConfigService);
    log(...args: unknown[]): void;
    error(...args: unknown[]): void;
    warn(...args: unknown[]): void;
}
