#!/usr/bin/env node

var preview = require('ribcage-preview')
  , gen = require('ribcage-gen')
  , docs = require('ribcage-docs')
  , path = require('path')
  , argv = require('minimist')(process.argv.slice(2))
  , fs = require('fs')
  , type = argv.t || argv.type || 'backbone'

switch (process.argv[2]) {
  case 'preview':
    preview(path.join(process.cwd(), process.argv[3]))
    break
  case 'gen':
    gen({target: argv._[0], type: type}, function () {
      console.log('created')
    })
    break
  case 'docs':
    docs(process.argv[3] || 'components')
    break
  default:
    fs.createReadStream(path.join(__dirname, 'help.txt')).pipe(process.stdout)
}
