(function(context) {
  var pool = function (pool) {
    var templates = pool;
    var methods = {
      get: function(template, data) {
        var t = templates[template](methods);
        if (data) {
          t.dom();
          t.update(data);
        }
        return t;
      },
      release: function(template, instance) {
        instance.remove();
      }
    };

    return methods;
  };

  var render_child = function(template, node, data, pool, children) {
      render_children(template, node, data ? [data] : [], pool, children);
  };

  var render_children = function(template, node, data, pool, children) {
    var i, lb, ub;

    data = data || [];

    for (i = children.length - data.length; i > 0; i--) {
      pool.release(template, children.pop());
    }

    for (i = children.length - 1; i >= 0; i--) {
      children[i].update(data[i]);
    }

    if (children.length < data.length) {
      var fragment = document.createDocumentFragment();

      var nested;
      for (lb = children.length, ub = data.length; lb < ub; lb++) {
        nested = pool.get(template);

        children.push(nested);
        fragment.appendChild(nested.dom());
        nested.update(data[lb]);
      }

      node.parentNode.insertBefore(fragment, node);
    }
  };

  var container = typeof(module) !== 'undefined' ? module.exports : (window.jext = {});

  container.pool = pool;
  container.render_children = render_children;
  container.render_child = render_child;
})(this);
