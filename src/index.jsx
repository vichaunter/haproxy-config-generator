"use strict";

const nunjucks = require('nunjucks');
const yaml = require('yaml');
const fs = require('fs');


const fileGlobals = fs.readFileSync(__dirname + '/configs/globals.yaml', 'utf8');
const yamlGlobals = yaml.parse(fileGlobals);

const fileDefaults = fs.readFileSync(__dirname + '/configs/defaults.yaml', 'utf8');
const yamlDefaults = yaml.parse(fileDefaults);

const fileFrontends = fs.readFileSync(__dirname + '/configs/frontends.yaml', 'utf8');
const yamlFrontends = yaml.parse(fileFrontends);

const fileBackends = fs.readFileSync(__dirname + '/configs/backends.yaml', 'utf8');
const yamlBackends = yaml.parse(fileBackends);



const fullConfig = {...yamlGlobals, ...yamlDefaults, ...yamlFrontends, ...yamlBackends};
console.log(fullConfig);


nunjucks.configure(__dirname+'/templates', {autoescape: true});
const confString = nunjucks.render('haproxy.cfg.j2', fullConfig);


console.log(confString)