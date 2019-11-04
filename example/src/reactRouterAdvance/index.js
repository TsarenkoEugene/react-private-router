/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect, Route, matchPath } from 'react-router-dom';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 10px;\n  color: red;\n"], ["\n  padding: 10px;\n  color: red;\n"])));
var TestComponent = function (_a) {
    var text = _a.text;
    return (React.createElement(Wrapper, null, text ? text : 'Test Component'));
};
var templateObject_1;

// import classNames from 'classnames';
// const ExtentedRouterStatus = {
//   INITIAL: 'initial',
//   LOADING: 'loading',
//   SUCCESS: 'success',
//   FAIL: 'fail',
// };
var ExtentedRouterStatus;
(function (ExtentedRouterStatus) {
    ExtentedRouterStatus[ExtentedRouterStatus["INITIAL"] = 0] = "INITIAL";
    ExtentedRouterStatus[ExtentedRouterStatus["LOADING"] = 1] = "LOADING";
    ExtentedRouterStatus[ExtentedRouterStatus["SUCCESS"] = 2] = "SUCCESS";
    ExtentedRouterStatus[ExtentedRouterStatus["FAIL"] = 3] = "FAIL";
})(ExtentedRouterStatus || (ExtentedRouterStatus = {}));
var CustomRoute = function (_a) {
    var _b;
    var path = _a.path, component = _a.component, redirectUrl = _a.redirectUrl, _c = _a.guards, guards = _c === void 0 ? [] : _c, _d = _a.resolvers, resolvers = _d === void 0 ? [] : _d, _e = _a.debounceWaitTime, debounceWaitTime = _e === void 0 ? 500 : _e, _f = _a.childs, childs = _f === void 0 ? [] : _f, redirectToChild = _a.redirectToChild, 
    // exact,
    location = _a.location;
    // console.log(path, component);
    if (typeof location === 'undefined') {
        throw new Error('Extended router must be wrapper in usual router!');
    }
    var savedTimer = useRef(0);
    var savedTime = useRef(Date.now());
    var _g = useState(ExtentedRouterStatus.INITIAL), status = _g[0], setStatus = _g[1];
    var resultComponents = (_b = {},
        _b[ExtentedRouterStatus.INITIAL] = null,
        _b[ExtentedRouterStatus.LOADING] = null,
        _b[ExtentedRouterStatus.FAIL] = React.createElement(Redirect, { to: redirectUrl || '/' }),
        _b);
    var checkGuards = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _i, guards_1, guard, guardResult, e_1, isOk;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = [];
                    _i = 0, guards_1 = guards;
                    _a.label = 1;
                case 1:
                    if (!(_i < guards_1.length)) return [3 /*break*/, 6];
                    guard = guards_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, guard.CanActivate()];
                case 3:
                    guardResult = _a.sent();
                    result.push(guardResult);
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    result.push(false);
                    console.error('Error in guards');
                    console.error(e_1);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    isOk = !result.some(function (i) { return !i; });
                    return [2 /*return*/, isOk ? ExtentedRouterStatus.SUCCESS : ExtentedRouterStatus.FAIL];
            }
        });
    }); };
    var startTimer = function () {
        savedTimer.current = setInterval(function () {
            if (savedTime.current + debounceWaitTime < Date.now()) {
                setStatus(ExtentedRouterStatus.LOADING);
            }
        }, 30);
    };
    var clearTimer = function (guardStatus) {
        if (guardStatus === ExtentedRouterStatus.SUCCESS || guardStatus === ExtentedRouterStatus.FAIL) {
            clearInterval(savedTimer.current);
        }
    };
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var match, guardStatus, _a, promises;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        match = matchPath(location.pathname, {
                            path: path,
                            exact: false,
                            strict: true,
                        });
                        if (!(match && match.isExact)) return [3 /*break*/, 6];
                        startTimer();
                        if (!guards.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, checkGuards()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = ExtentedRouterStatus.SUCCESS;
                        _b.label = 3;
                    case 3:
                        guardStatus = _a;
                        if (!(status === ExtentedRouterStatus.SUCCESS && resolvers.length)) return [3 /*break*/, 5];
                        promises = resolvers.map(function (resolver) { return resolver.Resolve(); });
                        return [4 /*yield*/, Promise.all(promises).catch(function (e) {
                                console.error('Error in resolvers');
                                console.error(e);
                            })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        setStatus(guardStatus);
                        clearTimer(guardStatus);
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); })();
    }, [location.pathname]);
    var compareChildAndParentPath = function (childPath, parentPath) { return childPath.startsWith(parentPath); };
    var Component = component;
    if (status === ExtentedRouterStatus.SUCCESS) {
        // console.log(childs.length);
        if (childs.length) {
            var childRoutes_1 = childs.map(function (route) {
                var isValidChildPath = compareChildAndParentPath(route.path, path);
                if (!isValidChildPath) {
                    throw new Error("Child must start with parent path; Parent " + path + " Child " + route.path);
                }
                return React.createElement(CustomRoute, __assign({}, route, { exact: false, key: route.path, redirectUrl: redirectUrl, location: location }));
            });
            return (React.createElement(Route, { exact: false, path: path, render: function (props) {
                    if (childs.length && props.location.pathname === path && redirectToChild !== null) {
                        var childRedirectUrl = redirectToChild || childs[0].path;
                        props.history.push(childRedirectUrl);
                        console.log('RETIURM');
                        return;
                    }
                    console.log('NOT RETURN', childRoutes_1);
                    return React.createElement(Component, __assign({}, props, { exact: false, childRoutes: childRoutes_1 }));
                } }));
        }
        console.log('NOT CHILDS', path);
        return React.createElement(Route, { exact: false, path: path, render: function (props) { return React.createElement(Component, __assign({}, props, { exact: false })); } });
    }
    return resultComponents[status];
};

export { CustomRoute, TestComponent };
