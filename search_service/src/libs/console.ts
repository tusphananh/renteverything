export const logRed = (message: any, ...args: any[]) => {
    console.log('\x1b[31m%s\x1b[0m', message, ...args);
};

export const logYellow = (message: any, ...args: any[]) => {
    console.log('\x1b[33m%s\x1b[0m', message, ...args);
}

export const logCyan = (message: any, ...args: any[]) => {
    console.log('\x1b[36m%s\x1b[0m', message, ...args);
}

export const logGreen = (message: any, ...args: any[]) => {
    console.log('\x1b[32m%s\x1b[0m', message, ...args);
}