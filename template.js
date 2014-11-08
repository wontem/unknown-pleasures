// Generated by CoffeeScript 1.7.1
var createDOM;

createDOM = (function() {
  function createDOM(wrapper, template) {
    this.storage = {};
    this.el = this.parseQuery(wrapper);
    this.renderTemplate(template, this.el);
  }

  createDOM.prototype.renderTemplate = function(template, parentNode) {
    var key, node, value, _results;
    node = null;
    _results = [];
    for (key in template) {
      value = template[key];
      if (key === '$') {
        _results.push(this.storage[value] = parentNode);
      } else {
        node = this.parseQuery(key);
        parentNode.appendChild(node);
        _results.push(this.renderTemplate(value, node));
      }
    }
    return _results;
  };

  createDOM.prototype.parseQuery = function(query) {
    var attr, c, elem, node, parseAttr, token, tokens, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
    tokens = query.split(/(?=\.)|(?=#)|(?=\[)/);
    elem = {
      tag: 'div',
      id: null,
      classes: [],
      attrs: []
    };
    parseAttr = function(token) {
      var attr;
      attr = token.slice(1, -1).split('=');
      attr[0] = attr[0].trim();
      attr[1] = attr[1].trim();
      attr[1] = attr[1].replace(/"/g, '');
      return attr;
    };
    for (_i = 0, _len = tokens.length; _i < _len; _i++) {
      token = tokens[_i];
      switch (token[0]) {
        case '#':
          elem.id = token.slice(1);
          break;
        case '.':
          elem.classes.push(token.slice(1));
          break;
        case '[':
          elem.attrs.push(parseAttr(token));
          break;
        default:
          elem.tag = token;
      }
    }
    node = document.createElement(elem.tag);
    if (elem.id) {
      node.id = elem.id;
    }
    _ref = elem.classes;
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      c = _ref[_j];
      node.classList.add(c);
    }
    _ref1 = elem.attrs;
    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
      attr = _ref1[_k];
      node.setAttribute(attr[0], attr[1]);
    }
    return node;
  };

  return createDOM;

})();

//# sourceMappingURL=template.map