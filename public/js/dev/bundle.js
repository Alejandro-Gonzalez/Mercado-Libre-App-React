/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App() {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

	    _this.state = {
	      items: [],
	      hasMoreItems: false,
	      filtersApplied: {},
	      params: "",
	      total: 0,
	      "filters": [],
	      loaded: false
	    };

	    _this.sort = "";
	    _this.filters = [];
	    _this.query = "tecnologia";
	    _this.offset = 0;

	    _this.filtersOption = {};
	    _this.filtersOptionName = {};

	    _this.params = {};
	    return _this;
	  }

	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setNewItems({});
	    }

	    /*
	      -----------------------------------------------------
	      Functions Filter, removeFilter, Set and SetMore items
	      -----------------------------------------------------
	    */

	  }, {
	    key: 'getItems',
	    value: function getItems() {
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      params = Object.keys(params).reduce(function (acum, key) {
	        return acum + ('&' + key + '=' + params[key]);
	      }, "");
	      return $.get("https://api.mercadolibre.com/sites/MLA/search?q=" + this.query + this.sort + "&offset=" + this.offset + params);
	    }
	  }, {
	    key: 'setNewItems',
	    value: function setNewItems() {
	      var _this2 = this;

	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      this.setState({ loaded: true });

	      this.offset = 0;

	      this.getItems(params).done(function (res) {

	        var filters = res.available_filters;
	        _this2.offset = res.paging.total > 50 ? 50 : res.paging.total;

	        _this2.setState({ total: res.paging.total, filters: filters, hasMoreItems: _this2.offset < res.paging.total, items: res.results, loaded: false });
	      });
	    }
	  }, {
	    key: 'addItems',
	    value: function addItems() {
	      var _this3 = this;

	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      this.setState({ loaded: true });

	      this.getItems(params).done(function (res) {
	        var offset = _this3.offset + 50;
	        var items = [].concat(_toConsumableArray(_this3.state.items), _toConsumableArray(res.results));
	        _this3.offset += 50;

	        _this3.setState({ hasMoreItems: _this3.offset < res.paging.total, loaded: false, items: items });
	      });
	    }
	  }, {
	    key: 'filter',
	    value: function filter(event, id) {
	      var filtersApplied = Object.assign({}, this.state.filtersApplied);
	      filtersApplied[id] = event.target.value;

	      this.filtersOptionName[id] = event.target.selectedOptions[0].text;
	      this.params[id] = filtersApplied[id];

	      this.setState({ filtersApplied: filtersApplied });
	      this.setNewItems(this.params);
	    }
	  }, {
	    key: 'removeFilter',
	    value: function removeFilter(id) {
	      console.log(id);
	      var filtersApplied = Object.assign({}, this.state.filtersApplied);
	      filtersApplied[id] = "";

	      delete this.filtersOptionName[id];
	      delete this.params[id];

	      this.setState({ filtersApplied: filtersApplied });
	      this.setNewItems(this.params);
	    }

	    /*
	      --------------------------
	      Functions search component
	      --------------------------
	    */

	  }, {
	    key: 'setQuery',
	    value: function setQuery(e) {
	      this.query = e.target.value;
	    }
	  }, {
	    key: 'changeSort',
	    value: function changeSort(e) {
	      this.sort = e.target.value;
	      this.setNewItems(this.params);
	    }
	  }, {
	    key: 'handleKeyUp',
	    value: function handleKeyUp(e) {
	      if (e.keyCode == 13 && e.target.value.length) {
	        this.setNewItems(e.target.value);
	      }
	    }

	    /*------------------------------*/

	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      return _react2.default.createElement(
	        'div',
	        { className: 'app' },
	        _react2.default.createElement(
	          'div',
	          { className: 'search-wrapper' },
	          _react2.default.createElement(Search, { onKeyUp: function onKeyUp(e) {
	              _this4.handleKeyUp(e);
	            }, onClick: function onClick() {
	              _this4.setNewItems();
	            }, data: this.query, query: this.setQuery.bind(this) }),
	          _react2.default.createElement(Sorts, { onChange: function onChange(event) {
	              _this4.changeSort(event);
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'content-wrapper' },
	          _react2.default.createElement(
	            'div',
	            { className: 'filters-wrapper' },
	            _react2.default.createElement(Filters, { filters: this.state.filters, filtersApplied: this.state.filtersApplied, onChange: function onChange(event, filterId) {
	                _this4.filter(event, filterId);
	              } }),
	            _react2.default.createElement(FiltersApplied, { optionsName: this.filtersOptionName, onClick: this.removeFilter.bind(this) })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'products-wrapper' },
	            _react2.default.createElement(ProductList, { items: this.state.items }),
	            _react2.default.createElement(ViewMore, { hasMoreItems: this.state.hasMoreItems, onClick: function onClick() {
	                _this4.addItems(_this4.params);
	              } }),
	            _react2.default.createElement(Loader, { loaded: this.state.loaded })
	          )
	        )
	      );
	    }
	  }]);

	  return App;
	}(_react2.default.Component);

	/*
	  ---------------------------------
	  Component Search Input and button
	  ---------------------------------
	*/


	var Search = function Search(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'search-content' },
	    _react2.default.createElement('input', { onChange: props.query, className: 'input-search', onKeyUp: function onKeyUp(e) {
	        props.onKeyUp(e);
	      }, type: 'text' }),
	    _react2.default.createElement(
	      'button',
	      { 'data-query': props.data, onClick: function onClick(e) {
	          props.onClick();
	        }, className: 'btn-search' },
	      _react2.default.createElement('div', { className: 'search icon' })
	    )
	  );
	};

	/*
	  ---------------------------------
	  Component Sortby
	  ---------------------------------
	*/
	var Sorts = function Sorts(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'sortBy' },
	    'ordenar por',
	    _react2.default.createElement(
	      'select',
	      { onChange: function onChange(e) {
	          props.onChange(e);
	        }, id: '' },
	      _react2.default.createElement('option', { value: '' }),
	      _react2.default.createElement(
	        'option',
	        { value: '&sort=price_asc' },
	        'De a menor precio'
	      ),
	      _react2.default.createElement(
	        'option',
	        { value: '&sort=price_desc' },
	        'De a mayor precio'
	      )
	    )
	  );
	};

	/*
	  ---------------------------------
	  Component Product List ===> product-item
	  ---------------------------------
	*/
	var ProductList = function ProductList(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'product-list' },
	    props.items.map(function (product, index) {
	      return _react2.default.createElement(Product, { key: product.id, title: product.title, permalink: product.permalink, price: product.price, thumbnail: product.thumbnail });
	    })
	  );
	};
	/*
	  ---------------------------------
	  Component ProductItem
	  ---------------------------------
	*/
	var Product = function Product(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'product' },
	    _react2.default.createElement('img', { src: props.thumbnail, alt: '' }),
	    _react2.default.createElement(
	      'div',
	      { className: 'data' },
	      _react2.default.createElement(
	        'h5',
	        null,
	        props.title
	      ),
	      _react2.default.createElement(
	        'a',
	        { href: props.permalink },
	        'Ver Producto'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        '$',
	        props.price
	      )
	    )
	  );
	};

	/*
	  ---------------------------------
	  Component viewMore items
	  ---------------------------------
	*/

	var ViewMore = function ViewMore(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'btn-wrapper' },
	    props.hasMoreItems ? _react2.default.createElement(
	      'button',
	      { onClick: function onClick() {
	          props.onClick();
	        } },
	      'ver m\xE1s'
	    ) : ""
	  );
	};

	/*
	  ---------------------------------
	  Component Filters Active
	  ---------------------------------
	*/

	var FiltersApplied = function FiltersApplied(props) {
	  return _react2.default.createElement(
	    'div',
	    null,
	    Object.keys(props.optionsName).map(function (id) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'filterActive', key: id },
	        ' ',
	        _react2.default.createElement(
	          'span',
	          null,
	          props.optionsName[id]
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: function onClick() {
	              props.onClick(id);
	            } },
	          '\xD7'
	        ),
	        ' '
	      );
	    })
	  );
	};

	/*
	  ---------------------------------
	  Component Loader
	  ---------------------------------
	*/
	var Loader = function Loader(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'loader ' + (props.loaded ? "loaded" : "") },
	    _react2.default.createElement(
	      'div',
	      { id: 'fountainG' },
	      _react2.default.createElement('div', { id: 'fountainG_1', className: 'fountainG' }),
	      _react2.default.createElement('div', { id: 'fountainG_2', className: 'fountainG' }),
	      _react2.default.createElement('div', { id: 'fountainG_3', className: 'fountainG' }),
	      _react2.default.createElement('div', { id: 'fountainG_4', className: 'fountainG' }),
	      _react2.default.createElement('div', { id: 'fountainG_5', className: 'fountainG' }),
	      _react2.default.createElement('div', { id: 'fountainG_6', className: 'fountainG' }),
	      _react2.default.createElement('div', { id: 'fountainG_7', className: 'fountainG' }),
	      _react2.default.createElement('div', { id: 'fountainG_8', className: 'fountainG' })
	    )
	  );
	};

	/*
	  ---------------------------------
	  Component Filters items
	  ---------------------------------
	*/
	var Filters = function Filters(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'filters' },
	    props.filters.map(function (filter, index) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'filter', key: filter.name },
	        _react2.default.createElement(Select, { value: filter.id in props.filtersApplied ? props.filtersApplied[filter.id] : "", key: index, filter: filter, onChange: function onChange(event, filterId) {
	            props.onChange(event, filterId);
	          } })
	      );
	    })
	  );
	};

	/*
	  ---------------------------------
	  Component Select ==> options
	  ---------------------------------
	*/

	var Select = function (_React$Component2) {
	  _inherits(Select, _React$Component2);

	  function Select(props) {
	    _classCallCheck(this, Select);

	    return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));
	  }

	  _createClass(Select, [{
	    key: 'renderOptions',
	    value: function renderOptions(id, options) {
	      return options.map(function (value, index) {
	        return _react2.default.createElement(
	          'option',
	          { key: value.id, name: value.name, value: value.id },
	          value.name
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this6 = this;

	      return _react2.default.createElement(
	        'select',
	        { value: this.props.value, onChange: function onChange(event) {
	            _this6.props.onChange(event, _this6.props.filter.id);
	          } },
	        _react2.default.createElement(
	          'option',
	          { value: '', disabled: true },
	          this.props.filter.name
	        ),
	        this.renderOptions(this.props.filter.id, this.props.filter.values)
	      );
	    }
	  }]);

	  return Select;
	}(_react2.default.Component);

	;

	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ }
/******/ ]);