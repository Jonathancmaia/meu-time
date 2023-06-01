var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
};
import { useContext } from 'react';
import axios from 'axios';
import Context from '../../contexts/context';
import Conf from '../../axios';
import { useNavigate } from 'react-router-dom';
var Request = function (_a) {
    var token = _a.token, path = _a.path, login = _a.login;
    //Call hooks
    var navigate = useNavigate();
    var conf = Conf();
    var context = useContext(Context);
    if (!token) {
        token = localStorage.getItem('token');
    }
    ;
    if (!login) {
        login = false;
    }
    ;
    var request = function () {
        function getResponse() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!context.data[path]) return [3 /*break*/, 2];
                            //Start loading state
                            context.setIsLoading(true);
                            //Set token header
                            conf.axiosConfig.headers = __assign(__assign({}, conf.axiosConfig.headers), { 'x-rapidapi-key': token });
                            //Validating with api the given token
                            return [4 /*yield*/, axios.get(path, conf.axiosConfig)
                                    .then(function (response) {
                                    var _a;
                                    //Verify if token is recognized by API. If yes, save it on session storage
                                    if (login === true) {
                                        if (response.data.errors.token) {
                                            context.setErrors({ "inputToken": "Token inserido está incorreto." });
                                        }
                                        else {
                                            localStorage.setItem('token', token);
                                            context.setIsLogged(true);
                                            navigate('/home');
                                        }
                                    }
                                    else {
                                        //if for some reason the token turn invalid or blocked, logout the user
                                        if (response.data.errors.token) {
                                            if (localStorage.getItem('token')) {
                                                context.setIsLogged(false);
                                                context.setErrors(false);
                                                localStorage.removeItem('token');
                                                navigate('/');
                                            }
                                        }
                                        else if (response.data.errors.requests) {
                                            context.setErrors({ "container": "Você chegou ao máximo de requests diárias." });
                                        }
                                        else {
                                            context.setData(__assign(__assign({}, context.data), (_a = {}, _a[path] = response.data, _a)));
                                        }
                                    }
                                }).catch(function (error) {
                                    context.setErrors({ "container": "Houve algum problema de comunicação. Favor entrar em contato com o suporte. ( " + error + " )" });
                                }).finally(function () {
                                    context.setIsLoading(false);
                                })];
                        case 1:
                            //Validating with api the given token
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        getResponse();
    };
    return (request);
};
export default Request;
