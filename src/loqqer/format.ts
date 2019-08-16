import moment from 'moment';
import nodeEmoji from 'node-emoji';

interface Info {
  date: Date;
  location: string;
  message: string;
  level: string;
}

type Formatter = (info: Info) => string;

const format = {
  date: (format: string): Formatter => ({ date }) => moment(date).format(format),
  location: (): Formatter => ({ location }) => location,
  message: (): Formatter => ({ message }) => message,
  text: (message: string): Formatter => () => nodeEmoji.emojify(message),
  level: (): Formatter => ({ level }) => level.toUpperCase(),
  newLine: (): Formatter => () => '\n',
};

const createTemplate = (...fns: Formatter[]) => {
  return (info) => {
    return fns.reduce((prev, curr) => {
      return `${prev}${curr(info)}`;
    }, '');
  };
};

export { createTemplate, format, Info };
