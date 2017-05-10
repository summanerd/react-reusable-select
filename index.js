(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-reusable-select"] = factory(require("react"));
	else
		root["react-reusable-select"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCleanProps = exports.getDefaultClasses = exports.getSelectedOptions = exports.onToggleClose = exports.onToggleOpen = exports.onSelectOption = exports.SelectOption = exports.SelectLabel = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.SelectLabel = SelectLabel;
exports.SelectOption = SelectOption;
exports.onSelectOption = onSelectOption;
exports.onToggleOpen = onToggleOpen;
exports.onToggleClose = onToggleClose;
exports.getSelectedOptions = getSelectedOptions;
exports.getDefaultClasses = getDefaultClasses;
exports.getCleanProps = getCleanProps;


var validProps = ['defaultLabel', 'pluralLabel', 'options', 'selectedValues', 'onChange'];

function SelectOption(_ref) {
    var option = _ref.option,
        selectedValues = _ref.selectedValues,
        onSelect = _ref.onSelect,
        _ref$classes = _ref.classes,
        classes = _ref$classes === undefined ? [] : _ref$classes;

    var isSelected = selectedValues.indexOf(option.value) > -1;

    if (isSelected) {
        classes = [].concat(classes, ['select__option--is-active']);
    }

    return _react2.default.createElement(
        'div',
        { className: classes.join(' '), 'data-action': 'select', onClick: function onClick() {
                return onSelect(option);
            } },
        _react2.default.createElement(
            'a',
            { className: 'select__option-label', href: '#', onClick: function onClick(ev) {
                    return ev.preventDefault();
                } },
            option.label
        )
    );
}

function SelectLabel(_ref2) {
    var label = _ref2.label,
        _ref2$classes = _ref2.classes,
        classes = _ref2$classes === undefined ? [] : _ref2$classes;


    return _react2.default.createElement(
        'div',
        { className: classes.join(' '), 'data-region': 'select-label' },
        label
    );
}

function onSelectOption(option) {

    this.setState({ selected: [option] }, this.toggleDropDown);
}

function onToggleOpen() {

    var listener = onClickOutsideOfSelect.bind(this);
    document.addEventListener('click', listener, { once: true });
    this.removeBodyClickListener = function () {
        return document.removeEventListener('click', listener);
    };
}

function onToggleClose() {

    if (this.removeBodyClickListener) {
        this.removeBodyClickListener();
        delete this.removeBodyClickListener;
    }

    this.sendChangeNotification();
}

function onClickOutsideOfSelect(event) {

    if (this.selectNode.querySelector(event.target)) {
        return;
    }
    delete this.removeBodyClickListener;
    this.toggleDropDown();
}

function getSelectedOptions(options, selectedValues) {

    var i = 0;

    while (i < options.length) {
        var option = options[i++];
        if (selectedValues.indexOf(option.value) > -1) {
            return [option];
        }
    }

    return [];
}

function getDefaultClasses() {

    return {
        selectClasses: ['select'],
        toggleClasses: ['select__toggle'],
        labelClasses: ['select__label'],
        optionsClasses: ['select__options'],
        optionClasses: ['select__option']
    };
}

function getCleanProps(props) {

    var _props = {};

    validProps.forEach(function (prop) {
        if (props[prop]) {
            _props[prop] = props[prop];
        }
    });

    return _props;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = getSelectComponent;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _selectHelper = __webpack_require__(1);

var selectHelper = _interopRequireWildcard(_selectHelper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {};

function getSelectComponent() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _options$onSelectOpti = options.onSelectOption,
        onSelectOption = _options$onSelectOpti === undefined ? selectHelper.onSelectOption : _options$onSelectOpti,
        _options$onToggleOpen = options.onToggleOpen,
        onToggleOpen = _options$onToggleOpen === undefined ? selectHelper.onToggleOpen : _options$onToggleOpen,
        _options$onToggleClos = options.onToggleClose,
        onToggleClose = _options$onToggleClos === undefined ? selectHelper.onToggleClose : _options$onToggleClos,
        _options$getSelectedO = options.getSelectedOptions,
        getSelectedOptions = _options$getSelectedO === undefined ? selectHelper.getSelectedOptions : _options$getSelectedO,
        _options$getDefaultCl = options.getDefaultClasses,
        getDefaultClasses = _options$getDefaultCl === undefined ? selectHelper.getDefaultClasses : _options$getDefaultCl,
        _options$SelectOption = options.SelectOption,
        SelectOption = _options$SelectOption === undefined ? selectHelper.SelectOption : _options$SelectOption,
        _options$SelectLabel = options.SelectLabel,
        SelectLabel = _options$SelectLabel === undefined ? selectHelper.SelectLabel : _options$SelectLabel;

    var Select = function (_React$Component) {
        _inherits(Select, _React$Component);

        function Select(props) {
            _classCallCheck(this, Select);

            var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

            _this.onSelectOption = onSelectOption.bind(_this);
            _this.onToggleOpen = onToggleOpen.bind(_this);
            _this.onToggleClose = onToggleClose.bind(_this);

            _this.toggleDropDown = function selectToggleDropDown() {
                var isOpen = !this.state.isOpen;
                this.setState({ isOpen: isOpen });
                this[isOpen ? 'onToggleOpen' : 'onToggleClose']();
            }.bind(_this);

            _this.state = {
                isOpen: false,
                selected: getSelectedOptions(props.options, props.selectedValues)
            };

            _this.classes = getDefaultClasses();
            return _this;
        }

        _createClass(Select, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                var options = this.props.options;
                var _classes = this.classes,
                    toggleClasses = _classes.toggleClasses,
                    labelClasses = _classes.labelClasses,
                    optionClasses = _classes.optionClasses;

                var selectClasses = this.classes.selectClasses.slice();
                var optionsClasses = this.classes.optionsClasses.slice();

                if (this.state.isOpen) {
                    selectClasses.push('select--is-open');
                    optionsClasses.push('select__options--is-open');
                }

                return _react2.default.createElement(
                    'div',
                    { className: selectClasses.join(' '), 'data-state': this.state.isOpen ? 'open' : 'closed', 'data-component': 'select' },
                    _react2.default.createElement(
                        'button',
                        { className: toggleClasses.join(' '), 'data-action': 'toggle', onClick: function onClick(ev) {
                                ev.preventDefault();
                                _this2.toggleDropDown();
                            } },
                        _react2.default.createElement(SelectLabel, { label: this.label, classes: labelClasses })
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: optionsClasses.join(' '), 'data-region': 'select-options' },
                        options.map(function (option, index) {
                            return _react2.default.createElement(SelectOption, { key: 'select-' + index,
                                option: option,
                                selectedValues: _this2.selectedValues,
                                onSelect: _this2.onSelectOption,
                                classes: optionClasses
                            });
                        })
                    )
                );
            }
        }, {
            key: 'sendChangeNotification',
            value: function sendChangeNotification() {
                this.props.onChange(this.selectedValues);
            }
        }, {
            key: 'label',
            get: function get() {
                if (!this.state.selected.length) {
                    return this.props.defaultLabel;
                }

                if (this.state.selected.length === 1) {
                    return this.state.selected[0].label;
                }

                return this.state.selected.length + ' ' + this.props.pluralLabel;
            }
        }, {
            key: 'selectedValues',
            get: function get() {
                return this.state.selected.map(function (option) {
                    return option.value;
                });
            }
        }]);

        return Select;
    }(_react2.default.Component);

    Select.defaultProps = {
        defaultLabel: 'All Items',
        pluralLabel: 'Items',
        selectedValues: [],
        options: [],
        onChange: noop
    };


    return Select;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_component_select_jsx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_component_select_jsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_component_select_jsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_component_single_select_single_select__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_component_single_select_single_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_component_single_select_single_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_component_multi_select_multi_select__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_component_multi_select_multi_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_component_multi_select_multi_select__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Select", function() { return __WEBPACK_IMPORTED_MODULE_0__src_component_select_jsx___default.a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleSelect", function() { return SingleSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelect", function() { return MultiSelect; });




const SingleSelect = __WEBPACK_IMPORTED_MODULE_1__src_component_single_select_single_select___default()(),
    MultiSelect = __WEBPACK_IMPORTED_MODULE_2__src_component_multi_select_multi_select___default()();




/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getSingleSelect;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _selectHelper = __webpack_require__(1);

var _select = __webpack_require__(2);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSingleSelect() {

    var Select = (0, _select2.default)();

    return function MultiSelect(props) {
        var _props = (0, _selectHelper.getCleanProps)(props);

        return _react2.default.createElement(Select, _props);
    };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getSingleSelect;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _selectHelper = __webpack_require__(1);

var _select = __webpack_require__(2);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSingleSelect() {

    var Select = (0, _select2.default)();

    return function SingleSelect(props) {
        var _props = (0, _selectHelper.getCleanProps)(props);

        return _react2.default.createElement(Select, _props);
    };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);
});