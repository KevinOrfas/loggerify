import { Info } from '../format';

import { isAllowed, Level } from '../levels';

interface TransportConfig {
  template?: (info: Info) => string;
  format?: (value: any) => string;
  level?: Level;
}

const defaultConfig: Partial<TransportConfig> = {
  template: ({ message }) => message,
  format: JSON.stringify,
  level: 'info',
};

class Transport<T extends TransportConfig = TransportConfig> {
  protected config: T;

  public constructor(config: T) {
    this.config = {
      ...defaultConfig,
      ...(config as any),
    };
  }

  public isAllowed(level: Level): boolean {
    return isAllowed(this.config.level, level);
  }

  public log({ message, level }: { message: string; level: string }): string {
    return message;
  }

  public format(value: any): string {
    return this.config.format(value);
  }

  public getMessage(info: Info): string {
    return this.config.template(info);
  }
}

export { TransportConfig };
export default Transport;
