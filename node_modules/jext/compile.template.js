function(pool) {
  var {{var_code}},
    f = {
      {{func_code}}
    },
    u = {
      {{update_code}}
    }
  ;

  var root = document.createDocumentFragment();
  return {
    dom: function() {
      if (root.childNodes.length) {
        return root;
      }

      {{dom_code}};
      return root;
    },

    update: function(a) {
      if (a !== undefined && typeof(a) === "object") {
        var k;
        for (k in a) {
          if (u[k] === undefined) {
            console.warn('Unused var: {{' + k + '}}');
          } else u[k](a[k]);
        }
      }
    },

    remove: function() {
      n0.parentNode.removeChild(n0);
    }
  };
}
