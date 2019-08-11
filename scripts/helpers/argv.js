/**
 * Node.js argv parameters parser
 * 
 * @author Kostiantyn Smyrnov <kostysh@gmail.com>
 * @date 2018
 */

/**
 * argv parameters parser callback
 * @param {Array} argv Argv array to parce
 * @param {Number} skip Count of parameters to skip from beginning of  the array
 */
module.exports.parseArgv = (argv, skip = 0) => {

    if (!Array.isArray(argv)) {
        throw new Error('Invalid ARGV');
    }

    argv = argv.slice(skip);

    let normalised = [];
    const args = {};

    argv.forEach(arg => {
        
        // Splitting and cleananup
        normalised = [...normalised, ...(arg.split('='))];
    });

    for (let i = 0; i < normalised.length; i += 2) {
        args[normalised[i]] = normalised[i+1] ? normalised[i+1] : '';
    }

    return args;
};

/**
 * parameters parser
 * @param {Array} argv Argv array to parce
 * @param {Number} skip Count of parameters to skip from beginning of  the array
 */
module.exports.parseParams = params => {

    if (!params.params || params.params === '') {
        throw new Error('Parameters not found');
    }

    return params.params.split(',').map(p => {
        const template = /^number:/g;
        return p.match(template) ? parseInt(p.replace(template, '')) : p;
    });
};
