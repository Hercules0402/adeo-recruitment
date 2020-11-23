#!/usr/bin/env node
const data = require('./data');

/**
 * Allows to read arguments from command-line and processes those arguments in object (ex: {flag1: value, flag2: value})
 * @returns object
 */
function getArgs() {
    const args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach( arg => {
            // long arg
            if (arg.slice(0,2) === '--') {
                const longArg = arg.split('=');
                const longArgFlag = longArg[0].slice(2,longArg[0].length);
                const longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            // flags
            else if (arg[0] === '-') {
                const flags = arg.slice(1,arg.length).split('');
                flags.forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}

/**
 * Help function
 */
function help() {
    console.info('node app.js <option>\n\n');
    console.info('--filter=<value> . . . . . . Filter a list of elements containing a pattern');
    console.info('--count  . . . . . . . . . . Print the counts of People and Animals by counting the number of children and appending it in the name, eg. `Satanwi [2]`');
}

/**
 * Filter function. Filters data with the pattern. The order is kept intact and print the result only if the result isn't empty.
 * @param pattern: pattern to use for filtering the data.
 */
function filter(pattern) {
    const countries = data['data'];
    const filterArray = [];
    for (let i = 0; i < countries.length; i++) {
        const country = {name: countries[i]['name'], people: []};
        for (let j = 0 ; j < countries[i]['people'].length; j++) {
            const people = {
                name: countries[i]['people'][j]['name'],
                animals: countries[i]['people'][j]['animals'].filter(animal => animal['name'].toLowerCase().includes(pattern))
            };
            if (people.animals.length > 0) {
                country.people.push(people);
            }
        }
        if (country.people.length > 0) {
            filterArray.push(country);
        }
    }
    if (filterArray.length > 0) {
        console.dir(filterArray, {depth: null, colors: true, compact: false});
    }
}

/**
 * Count function. Print the counts of People and Animals by counting the number of children and appending it in the
 * name, eg. `Satanwi [2]`
 */
function count() {
    for (let i = 0; i < data['data'].length; i++) {
        for (let j = 0 ; j < data['data'][i]['people'].length; j++) {
            data['data'][i]['people'][j]['name'] += ` [${data['data'][i]['people'][j]['animals'].length}]`;
        }
        data['data'][i]['name'] += ` [${data['data'][i]['people'].length}]`;
    }
    console.dir(data['data'], {depth: null, colors: true, compact: false});
}

/**
 * Main function. This function calls a specific function according to the arguments provided.
 * @param args: arguments to provide in object format
 */
function main(args) {
    if ('filter' in args) {
        filter(args['filter']);
    }
    else if ('count' in args) {
        count();
    }
    else if ('help' in args || 'h' in args) {
        help();
    } else {
        console.log('Invalid command');
    }
}

main(getArgs());

