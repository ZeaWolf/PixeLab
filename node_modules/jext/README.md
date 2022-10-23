JEXT - Javascript ex DOM templater
======

JEXT is tool for using html templates as JS files with DOM rendered elements and special helper to manipulate real time data updates.

## Installing
To install JEXT you have to just run npm in your project dir:

```bash
npm install jext ---save-dev
```

## Usage
### Sample usage with bin tool
You have test.html example template. To build it just use jext bin tool:

```bash
./bin/jext examples/simple.jext > templates.js
```

Now merge jext.js lib with generated template

```bash
cat ./jext.js templates.js > bundle.js
```

Well you can do same as above with one command:

```bash
./bin/jext examples/simple.jext -b > bundle.js
```

Finally require in browser just created the bundle.js file.
You got jext variable defined with template pool manipulation helpers and templates variable with your template.

Now just get rendered DOM and append to any element. The key of template same as file name without extension.

```javascript
var t = templates.get('simple');
document.body.appendChild(t.dom());
```

Wanna update some parameters? Easy:

```javascript
t.update({welcome_text: 'JEXT works!'});
```

Now you can see rendered test template on your screen.

### Usage with webpack or whatever
First install loader for webpack. Instruction read here: (https://www.npmjs.com/package/jext-loader).

Install stuff:

```bash
npm install jext
npm install jext-loader
```

Somewhere in your code write to render

```javascript
# First require dependencies
var jext = require('jext');
var simple_tpl = require('examples/simple.jext');

# Make pool of templates, really only one now
var pool = jext.pool(simple_tpl);

# Fetch template and render
var t = pool.get('simple')
document.body.appendChild(t.dom());
t.update({welcome_text: 'JEXT works!'});
```

Build your project and enjoy!

## Template markup
You can use only simple constructs in your html template.

### Variables
Just use {{ var_name }} in attribute or inside element to make it works.
```html
<div title="{{ title }}">{{ body }}</div>
```

### Iteration
When making iteration inside template JEXT switching context inside iterated object. So only possible to access object variables of current iterated item.

```json
  {
    "rows": [
      {"value": 1},
      {"value": 2}
    ]
  }
```

```html
<div for="rows">
  The value is: {{ value }}
</div>
```

You know what will be as result? :)

### Condition
Condition switches context as iteration. Its same easy to use.

```json
  {
    "first": false,
    "second": {
      "value": 2
    }
  }
```

```html
  <div if="first">
    First block wont appear here
  </div>
  <div if="second">
    In context of second condition: {{ value }}
  </div>
```

## Template pool methods
### get(template, data)
Return template object from pool of available templates using the template key.

- *template* - name of template. If your template name as mytemplate.jext it must be mytemplate (without extension).
- *data* - optional. Pass data to render your template as object.

### release(template, instance)
It releases generate template from DOM tree

- *template* - name of template.
- *instance* - generated Node of this template.

## Template object methods
When you get template from created pool, it has several methods to manipulate it.

### dom()
The method returns generated DOM tree for current template as DocumentFragment (see document.createDocumentFragment).

### update(data)
- *data* - object to update and rerender current loaded template's DOM.

### remove()
This method removes rendered element from DOM tree.

## Loaders for JEXT
Webpack: (https://www.npmjs.com/package/jext-loader).
