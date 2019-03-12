"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_link_1 = require("apollo-link");
var apollo_utilities_1 = require("apollo-utilities");
var graphql_1 = require("graphql");
var graphql_2 = require("./graphql");
function createFirestoreLink(_a) {
    var _this = this;
    var database = _a.database, partialSchema = _a.partialSchema;
    var schema = graphql_2.createFullSchema(partialSchema);
    return new apollo_link_1.ApolloLink(function (operation, forward) {
        var isFirestore = apollo_utilities_1.hasDirectives(["firestore"], operation.query);
        if (!isFirestore) {
            return forward ? forward(operation) : null;
        }
        var query = operation.query, variables = operation.variables, operationName = operation.operationName;
        var context = { database: database };
        var rootValue = {};
        var mainDefinition = apollo_utilities_1.getMainDefinition(query);
        var operationType = mainDefinition.kind === "OperationDefinition" ? mainDefinition.operation : "query";
        if (operationType === "subscription") {
            return new apollo_link_1.Observable(function (observer) {
                graphql_1.createSourceEventStream(schema, query, rootValue, context, variables, operationName)
                    .then(function (iterator) { var iterator_1, iterator_1_1; return __awaiter(_this, void 0, void 0, function () {
                    var e_1, _a, data, e_1_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 5, 6, 11]);
                                iterator_1 = __asyncValues(iterator);
                                _b.label = 1;
                            case 1: return [4 /*yield*/, iterator_1.next()];
                            case 2:
                                if (!(iterator_1_1 = _b.sent(), !iterator_1_1.done)) return [3 /*break*/, 4];
                                data = iterator_1_1.value;
                                observer.next({ data: data }); // XXX: this may be problematic
                                _b.label = 3;
                            case 3: return [3 /*break*/, 1];
                            case 4: return [3 /*break*/, 11];
                            case 5:
                                e_1_1 = _b.sent();
                                e_1 = { error: e_1_1 };
                                return [3 /*break*/, 11];
                            case 6:
                                _b.trys.push([6, , 9, 10]);
                                if (!(iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return))) return [3 /*break*/, 8];
                                return [4 /*yield*/, _a.call(iterator_1)];
                            case 7:
                                _b.sent();
                                _b.label = 8;
                            case 8: return [3 /*break*/, 10];
                            case 9:
                                if (e_1) throw e_1.error;
                                return [7 /*endfinally*/];
                            case 10: return [7 /*endfinally*/];
                            case 11: return [2 /*return*/];
                        }
                    });
                }); });
            });
        }
        return new apollo_link_1.Observable(function (observer) {
            var result = graphql_1.execute(schema, query, rootValue, context, variables, operationName);
            if ("then" in result) {
                result.then(function (_a) {
                    var data = _a.data, errors = _a.errors;
                    if (errors) {
                        throw { errors: errors };
                    }
                    else {
                        observer.next({ data: data });
                        observer.complete();
                    }
                }).catch(function (err) {
                    if (err.name === "AbortError") {
                        return;
                    }
                    if (err.errors) {
                        observer.next(err);
                    }
                    observer.error(err);
                });
            }
            else {
                var data = result.data, errors = result.errors;
                if (errors) {
                    observer.next(result);
                    observer.error(result);
                }
                else {
                    observer.next({ data: data });
                    observer.complete();
                }
            }
        });
    });
}
exports.createFirestoreLink = createFirestoreLink;
