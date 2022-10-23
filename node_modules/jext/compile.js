var var_regexp = /(\{\{.+?\}\})/g,
    compile_template = require('fs')
      .readFileSync(
        require.resolve('./compile.template.js'),
        {encoding: 'utf8'}
      );

var direct_attributes = [
  '*.id', '*.title',
  'input.name', 'input.value', 'input.type',
  'a.href', 'a.target', 'form.method', 'form.action',
  'img.src', 'img.srcset', 'img.alt', 'img.width', 'img.height',
  'input.checked', 'input.selected'
];

var is_direct_attribute = function (element, attribute) {
  return direct_attributes.indexOf(element + '.' + attribute) > -1
    || direct_attributes.indexOf('*.' + attribute) > -1;
};

var svg_elements = [
  'svg', 'rect', 'circle', 'ellipse', 'line',
  'polyline', 'polygon', 'path', 'text', 'g', 'use',
  'defs'
];

var Compile = function (xml_tree, templates) {
  var lid = 0;
  function new_id() {
    return (lid++).toString(16);
  }

  var collector = {
    vars: {},
    children: [],
    funcs: [],
    init: [],
    dom: []
  };

  function var_name(token) {
    return token.substring(2).split('}}').shift().trim();
  }

  function parse_tokens(str) {
    return str.match(var_regexp) || [];
  }

  function collect_vars(tokens, collector, update_code) {
    var replacement = {};
    tokens.forEach(function(token) {
      var param = var_name(token);
      var key = param.split('.').shift();
      if (!collector.vars[key]) {
        collector.vars[key] = {
          names: {},
          funcs: []
        };
      }

      if (!collector.vars[key].names[param]) {
        collector.vars[key].names[param] = 'v' + Object.keys(collector.vars).length;
        if (key !== param) { // Object var?
           collector.vars[key].names[param] += '_' + Object.keys(collector.vars[key].names).length;
        }
      }

      replacement[token] = collector.vars[key].names[param];
    });

    var func_index = collector.funcs.push(update_code.replace(
      var_regexp,
      function (m) {
        return '"+' + replacement[m] + '+"';
      }
    ).replace('""+', '').replace('+""', '')) - 1;

    var token, key, param;
    for (token in replacement) {
      param = var_name(token);
      key = param.split('.').shift();
      collector.vars[key].funcs.push(func_index);
    }
  }

  function string(str) {
    return '"' + str
      .replace(/(?:\r\n|\r|\n)/g, '')
      .replace(/^\s+|\s+$/g, '') + '"'
    ;
  }

  function trim_vars(str) {
    return str.replace(var_regexp, '');
  }

  function node(n, p_name, collector) {
    var n_id = new_id(),
      n_name = 'n' + n_id,
      text, has_plain_text,
      a, i, l, child
    ;

    switch (n.nodeType) {
      case 9: // Document
        node(n.firstChild, p_name, collector);
        break;

      case 3: // Text
        text = string(n.nodeValue);

        collect_vars(parse_tokens(text), collector, n_name + '.textContent=' + text);
        collector.init.push(n_name + '=document.createTextNode(' + trim_vars(text) + ')');
        collector.dom.push(p_name + '.appendChild(' + n_name + ')');

        break;

      case 1: // Element
        var p, attr, k, children_var, after_name, render_method, is_svg;
        for (a = n.attributes, i = 0, l = n.attributes.length; i < l; i++) {
          switch (a[i].nodeName) {
            case 'if':
            case 'for':
              attr = a[i].nodeName;
              p = n.getAttribute(attr);
              n.removeAttribute(attr);
              k = attr + (Object.keys(templates).length - 1);
              children_var = k + 'c';
              new Compile(n, templates).build(k);

              // We need this element to insert new nodes relative to it
              after_name = 'a' + n_id;
              collector.init.push(after_name + '=document.createTextNode("")');
              collector.dom.push(p_name + '.appendChild(' + after_name + ')');

              render_method = (attr === 'if' ? 'render_child' : 'render_children');
              collect_vars(
                ['{{' + p + '}}'],
                collector,
                'jext.' + render_method + '("' + k + '",' + after_name + ',"{{' + p + '}}",pool,' + children_var + ')'
              );
              collector.children.push(children_var);
              break;
          }
        }

        if (!p) {
          is_svg = svg_elements.indexOf(n.tagName) > -1;
          if (is_svg) {
            collector.init.push(n_name + '=document.createElementNS("http://www.w3.org/2000/svg", "' + n.tagName + '")');
          } else {
            collector.init.push(n_name + '=document.createElement("' + n.tagName + '")');
          }

          if (n.attributes) {
            for (a = n.attributes, i = 0, l = n.attributes.length; i < l; i++) {
              text = string(a[i].value);
              has_plain_text = (trim_vars(text) !== '""');
              collect_vars(
                parse_tokens(text),
                collector,
                (has_plain_text
                  ? ''
                  : 'if (' + text + ' === false) {' + n_name + '.removeAttribute("' + a[i].name + '"); return;}'
                ) + (!is_svg && is_direct_attribute(n.nodeName, a[i].name)
                  ? (n_name + '.' + a[i].name + ' = ' + text)
                  : (a[i].name === 'xlink:href'
                    ? n_name + '.setAttributeNS("http://www.w3.org/1999/xlink", "href",' + text + ')'
                    : n_name + '.setAttribute("' + a[i].name + '",' + text + ')'
                  )
                )
              );

              if (has_plain_text) {
                collector.dom.push(a[i].name === 'xlink:href'
                  ? n_name + '.setAttributeNS("http://www.w3.org/1999/xlink", "href",' + trim_vars(text) + ')'
                  : n_name + '.setAttribute("' + a[i].name + '",' + trim_vars(text) + ')'
                );
              }
            }
          }
          collector.dom.push(p_name + '.appendChild(' + n_name + ')');

          if (n.childNodes) {
            for (i = 0, child = n.childNodes, l = n.childNodes.length; i < l; i++) {
              node(child[i], n_name, collector);
            }
          }
        }
        break;
    }
  }


  // Generate DOM
  this.build = function(template) {
    templates[template] = '';
    node(xml_tree, 'root', collector);

    // Generate variable set functions
    var update_code = [], init_code = [];

    var param, name, def_name, parts;
    var def_code;
    for (param in collector.vars) {
      def_code = [];

      for (name in collector.vars[param].names) {
        def_name = collector.vars[param].names[name];
        parts = name.split('.');
        parts[0] = 'a';

        def_code.push(def_name + '=' + parts.join('.'));
        collector.init.push(def_name + "=''");
      }

      update_code.push(
        '"' + param + '":' +
        'function(a){' +
          def_code.join(';') + ';' +
          'f[' +
            collector.vars[param].funcs.join(']();f[') +
          ']();' +
        '}'
      );
    }

    // Collect update function definition
    var func, func_code = [];
    for (func in collector.funcs) {
      func_code.push(
        func + ':function(){' + collector.funcs[func] + '}'
      );
    }

    // Collect children variables
    collector.children.forEach(function(child) {
      collector.init.push(child + '=[]');
    });

    // Generate result
    templates[template] = compile_template.replace(
      /\{\{[a-z\_]+\}\}/g,
      function(m) {
        return {
          '{{var_code}}': collector.init.join(','),
          '{{func_code}}': func_code.join(','),
          '{{update_code}}': update_code.join(','),
          '{{dom_code}}': collector.dom.join(';')
        }[m];
      }
    );
  };
};
module.exports = Compile;
