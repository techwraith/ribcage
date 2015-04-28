#!/usr/bin/env node
'use strict'

var preview = require('ribcage-preview')
  , gen = require('ribcage-gen')
  , docs = require('ribcage-docs')
  , path = require('path')
  , argv = require('minimist')(process.argv.slice(2))
  , fs = require('fs')
  , type = argv.t || argv.type || 'backbone'
  , cwd = process.cwd()
  , options

switch (process.argv[2]) {
  case 'preview':
    options = {
      dir: path.join(cwd, argv._[1])
      , debug: !argv['no-debug']
      , enableClientJSX: argv.s || argv['client-jsx']
      , enableReactRouter: argv.r || argv['react-router']
      , autoprefix: argv.autoprefix
    }
    preview(options)
    break
  case 'gen':
    gen({target: argv._[1], type: type}, function (err) {
      if (err) console.error(err)
      else {
        console.info('created. starting preview server')
        console.info('ribcage preview', argv._[1])
        preview(path.join(cwd, argv._[1]))
      }
    })
    break
  case 'docs':
    docs(argv._[1] || 'components')
    break
  default:
    fs.createReadStream(path.join(__dirname, 'help.txt')).pipe(process.stdout)
}
