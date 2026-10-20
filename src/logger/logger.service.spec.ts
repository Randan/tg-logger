import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  const spies = {
    log: jest.spyOn(console, 'log').mockImplementation(() => undefined),
    warn: jest.spyOn(console, 'warn').mockImplementation(() => undefined),
    error: jest.spyOn(console, 'error').mockImplementation(() => undefined),
  };
  const logger = (level?: string) => new LoggerService({ get: () => level } as never);
  const emitAll = (service: LoggerService) => {
    service.log('l');
    service.warn('w');
    service.error('e');
  };
  const counts = () => [spies.log, spies.warn, spies.error].map(spy => spy.mock.calls.length);

  beforeEach(() => Object.values(spies).forEach(spy => spy.mockClear()));
  afterAll(() => Object.values(spies).forEach(spy => spy.mockRestore()));

  it.each([
    ['info', [1, 1, 1]],
    ['warn', [0, 1, 1]],
    ['error', [0, 0, 1]],
    ['silent', [0, 0, 0]],
  ])('LOG_LEVEL=%s prints log/warn/error %j times', (level, expected) => {
    emitAll(logger(level));
    expect(counts()).toEqual(expected);
  });

  it('defaults to info when LOG_LEVEL is unset or unknown, trimming and ignoring case', () => {
    emitAll(logger(undefined));
    emitAll(logger('verbose'));
    expect(counts()).toEqual([2, 2, 2]);
    Object.values(spies).forEach(spy => spy.mockClear());
    emitAll(logger(' ERROR '));
    expect(counts()).toEqual([0, 0, 1]);
  });

  it('passes all the arguments through', () => {
    logger('info').log('message', { chatId: 1 });
    expect(spies.log).toHaveBeenCalledWith('message', { chatId: 1 });
  });
});
