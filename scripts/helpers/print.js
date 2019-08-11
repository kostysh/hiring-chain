// Prints a double line
module.exports.doubleLine = () => console.log(`\x1b[36m${'='.repeat(80)}\x1b[0m`);

// Prints a line with text
module.exports.print = text => console.log(`\x1b[36m${text}\x1b[0m`);;

// Prints error message
module.exports.printError = text => console.log(`\x1b[31m${text}\x1b[0m`);;