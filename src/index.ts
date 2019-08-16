import moduleAlias from 'module-alias';
import path from 'path';

import { createLogger, transports, createTemplate, format } from './loqqer';

moduleAlias.addAliases({
  src: __dirname,
});

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.console({
      level: 'debug',
      colorize: true,
      template: createTemplate(
        format.level(),
        format.text(' :gift:'),
        format.newLine(),
        format.message(),
        format.newLine(),
        format.text('Logged from '),
        format.location(),
        format.text(' :tada:')
      ),
    }),
    new transports.file({
      level: 'info',
      path: path.join(__dirname, '../not-so-important.log'),
      template: createTemplate(
        format.level(),
        format.text(' :tada:'),
        format.newLine(),
        format.message(),
        format.newLine(),
        format.text('Logged from '),
        format.location(),
        format.text(' :tada:')
      ),
    }),
  ],
});
