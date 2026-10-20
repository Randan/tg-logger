import { NotifyAdminService } from './notify-admin.service';

describe('NotifyAdminService', () => {
  let sendMessage: jest.Mock;
  const service = (env: Record<string, string>) =>
    new NotifyAdminService({ telegram: { sendMessage } } as never, { get: (key: string) => env[key] } as never);

  beforeEach(() => {
    sendMessage = jest.fn().mockResolvedValue(undefined);
  });

  it('sends the message to ADMIN_TELEGRAM_ID with the options', () => {
    service({ ADMIN_TELEGRAM_ID: '100', NODE_ENV: 'production' }).send('hi', { parse_mode: 'HTML' });
    expect(sendMessage).toHaveBeenCalledWith('100', 'hi', { parse_mode: 'HTML' });
  });

  it('sends without options too', () => {
    service({ ADMIN_TELEGRAM_ID: '100' }).send('hi');
    expect(sendMessage).toHaveBeenCalledWith('100', 'hi', {});
  });

  it('sends nothing in development or without an admin', () => {
    service({ ADMIN_TELEGRAM_ID: '100', NODE_ENV: 'development' }).send('hi');
    service({}).send('hi');
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('never throws when Telegram refuses', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    sendMessage.mockRejectedValue(new Error('403'));
    expect(() => service({ ADMIN_TELEGRAM_ID: '100' }).send('hi')).not.toThrow();
    await new Promise(setImmediate);
    expect(error).toHaveBeenCalledWith('Failed to send admin notification:', new Error('403'));
    error.mockRestore();
  });
});
