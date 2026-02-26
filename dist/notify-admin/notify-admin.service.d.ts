import type { ConfigService } from '@nestjs/config';
import type { Telegraf } from 'telegraf';
export declare class NotifyAdminService {
    private readonly bot;
    private readonly config;
    constructor(bot: Telegraf, config: ConfigService);
    send(message: string, options?: {
        parse_mode?: 'Markdown' | 'HTML';
    }): void;
}
