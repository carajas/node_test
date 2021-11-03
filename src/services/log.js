const winston = require('winston');
const pjson = require('./../../package.json');

colors = {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
}

const formatter = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.splat(),
    winston.format.printf((info) => {
        const {
            timestamp,
            level,
            message,
            ...meta
        } = info;

        return `[\x1b[93m${pjson.name}\x1b[0m] \x1b[36m${timestamp}\x1b[0m [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`;
    })
);


const logger = winston.createLogger({
    format: formatter,
    transports: [
        new winston.transports.File({
            filename: `${process.env.LOG_PATH}/error.log`,
            level: 'error'
        }),
        new winston.transports.File({
            filename: `${process.env.LOG_PATH}/info.log`,
            level: 'info'
        }),
        new winston.transports.File({
            filename: `${process.env.LOG_PATH}/debug.log`,
            level: 'debug'
        })
    ],
});

winston.addColors(colors);

if (!(process.env.NODE_ENV === 'production')) {
    logger.add(new winston.transports.Console({
        level: 'debug',
        format: formatter
    }));
} else {
    logger.add(new winston.transports.Console({
        level: 'error',
        format: formatter
    }));
    logger.add(new winston.transports.Console({
        level: 'info',
        format: formatter
    }));
}

module.exports = logger