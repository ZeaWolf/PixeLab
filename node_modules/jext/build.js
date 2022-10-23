var DOMParser = require('xmldom').DOMParser;
var Compile = require('./compile.js');
var fs = require('fs');

var Parser = new DOMParser();

module.exports = function(files, as_module) {
  if (!(files instanceof Array)) {
    files = [files];
  }

  var pool = {};
  files.forEach(function(file) {
    new Compile(
      Parser.parseFromString(
        fs.readFileSync(file, {encoding: 'utf8'})
      ), pool
    ).build(file.split('/').pop().split('.')[0]);
  });

  var template, pool_code = [];
  for (template in pool) {
    pool_code.push('"' + template + '":' + pool[template]);
  }

  return {
    m: [
      'var jext = require("jext");',
      'module.exports = {' + pool_code.join(',') + '}'
    ],
    w: [
      'var template_list = {' + pool_code.join(',') + '};',
      'window.templates = jext.pool(template_list);'
    ]
  }[as_module ? 'm' : 'w'].join("\n");
};
