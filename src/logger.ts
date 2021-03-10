const DEBUG = '[DEBUG]';
const INFO = '[INFO]';
const WARNING = '[WARNING]';
const ERROR = '[ERROR]';

export const getLogger = (prefix: string) => {
	return {
		debug: (...obj: any[]) => {
			console.debug(DEBUG, prefix, ...obj);
		},
		info: (...obj: any[]) => {
			console.info(INFO, prefix, ...obj);
		},
		warn: (...obj: any[]) => {
			console.warn(WARNING, prefix, ...obj);
		},
		error: (...obj: any[]) => {
			console.error(ERROR, prefix, ...obj);
		},
	};
};
