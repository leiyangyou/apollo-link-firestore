"use strict";
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var graphql_subscriptions_1 = require("graphql-subscriptions");
exports.pubsub = new graphql_subscriptions_1.PubSub();
function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}
function getBaseTypename(type) {
    if (type.kind === "NonNullType" || type.kind === "ListType") {
        return getBaseTypename(type.type);
    }
    else {
        return type.name.value;
    }
}
function createFieldType(type, typeMapping) {
    if (type.kind === "NonNullType") {
        return new graphql_1.GraphQLNonNull(createFieldType(type.type, typeMapping));
    }
    else if (type.kind === "ListType") {
        return new graphql_1.GraphQLList(createFieldType(type.type, typeMapping));
    }
    else {
        return typeMapping[type.name.value];
    }
}
function createObjectType(definition, typeMapping) {
    var typename = definition.name.value;
    if (!typeMapping[typename]) {
        typeMapping[typename] = new graphql_1.GraphQLObjectType({
            name: typename,
            fields: function () {
                var e_1, _a;
                var fields = {};
                if (definition.fields) {
                    try {
                        for (var _b = __values(definition.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var field = _c.value;
                            fields[field.name.value] = { type: createFieldType(field.type, typeMapping) };
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                return fields;
            },
        });
    }
    return typeMapping[typename];
}
function createInputFieldType(type, typeMapping, objectDefinitions) {
    if (type.kind === "NonNullType") {
        return new graphql_1.GraphQLNonNull(createFieldType(type.type, typeMapping));
    }
    else if (type.kind === "ListType") {
        return new graphql_1.GraphQLList(createFieldType(type.type, typeMapping));
    }
    else {
        var baseType = typeMapping[type.name.value];
        if (graphql_1.isLeafType(baseType)) {
            return baseType;
        }
        return createCreateInputObjectType(objectDefinitions[type.name.value], typeMapping, objectDefinitions);
    }
}
function createCreateInputObjectType(definition, typeMapping, objectDefinitions) {
    var e_2, _a;
    var typename = definition.name.value;
    var fields = {};
    if (definition.fields) {
        try {
            for (var _b = __values(definition.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                var field = _c.value;
                var baseType = typeMapping[getBaseTypename(field.type)];
                if (graphql_1.isLeafType(baseType) && baseType !== graphql_1.GraphQLID) {
                    fields[field.name.value] = { type: createInputFieldType(field.type, typeMapping, objectDefinitions) };
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    var inputType = new graphql_1.GraphQLInputObjectType({
        name: "Create" + typename + "Input",
        fields: fields,
    });
    return inputType;
}
function createCreateMutation(definition, typeMapping, objectDefinitions) {
    var typename = definition.name.value;
    var inputType = createCreateInputObjectType(definition, typeMapping, objectDefinitions);
    return {
        type: typeMapping[typename],
        args: {
            input: { type: inputType },
        },
        resolve: function (_, _a, context) {
            var input = _a.input;
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, context.database.collection(typename).add(input)];
                        case 1:
                            result = _b.sent();
                            return [2 /*return*/, __assign({ id: result.id }, input)];
                    }
                });
            });
        },
    };
}
function createAddAndRemoveMutations(definition, typeMapping) {
    var e_3, _a;
    var typename = definition.name.value;
    var mutations = new Map();
    if (definition.fields) {
        var _loop_1 = function (field) {
            var _a;
            var fieldTypename = getBaseTypename(field.type);
            if (!graphql_1.isLeafType(typeMapping[fieldTypename])) {
                var primaryId_1 = typename.toLowerCase() + "Id";
                var secondaryId_1 = typename.toLowerCase() + "Id";
                mutations.set("add" + toTitleCase(field.name.value) + "To" + typename, {
                    type: typeMapping[typename],
                    args: (_a = {},
                        _a[primaryId_1] = { type: graphql_1.GraphQLID },
                        _a[secondaryId_1] = { type: graphql_1.GraphQLID },
                        _a),
                    resolve: function (_, args, context) {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, context.database.collection(fieldTypename).doc(args[secondaryId_1]).update((_a = {},
                                            _a["__relations." + typename + "." + field.name.value] = args[primaryId_1],
                                            _a))];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/, args[primaryId_1]];
                                }
                            });
                        });
                    },
                });
            }
        };
        try {
            for (var _b = __values(definition.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                var field = _c.value;
                _loop_1(field);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    return mutations;
}
function createFullSchema(partialSchema) {
    var e_4, _a;
    var objectDefinitions = Object.assign.apply(Object, __spread([{}], partialSchema.definitions
        .filter(function (definition) { return definition.kind === "ObjectTypeDefinition"; })
        .map(function (definition) {
        var _a;
        return (_a = {},
            _a[definition.name.value] = definition,
            _a);
    })));
    var typeMapping = {
        String: graphql_1.GraphQLString,
        Int: graphql_1.GraphQLInt,
        ID: graphql_1.GraphQLID,
        Boolean: graphql_1.GraphQLBoolean,
        Float: graphql_1.GraphQLFloat,
    };
    try {
        for (var _b = __values(partialSchema.definitions), _c = _b.next(); !_c.done; _c = _b.next()) {
            var definition = _c.value;
            if (definition.kind === "ObjectTypeDefinition") {
                createObjectType(definition, typeMapping);
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_4) throw e_4.error; }
    }
    var queryType = new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: function () {
            var e_5, _a;
            var fields = {};
            var _loop_2 = function (definition) {
                if (definition.kind === "ObjectTypeDefinition") {
                    var typename_1 = definition.name.value;
                    fields[typename_1.toLowerCase()] = {
                        type: typeMapping[typename_1],
                        args: {
                            id: { type: graphql_1.GraphQLID },
                        },
                        resolve: function (_, _a, context) {
                            var id = _a.id;
                            return __awaiter(this, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, context.database.collection(typename_1).doc(id).get()];
                                        case 1:
                                            result = _b.sent();
                                            if (result.exists) {
                                                return [2 /*return*/, __assign({ id: id }, result.data())];
                                            }
                                            else {
                                                return [2 /*return*/, null];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                    };
                }
            };
            try {
                for (var _b = __values(partialSchema.definitions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var definition = _c.value;
                    _loop_2(definition);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return fields;
        },
    });
    var mutationType = new graphql_1.GraphQLObjectType({
        name: "Mutation",
        fields: function () {
            var e_6, _a, e_7, _b;
            var fields = {};
            try {
                for (var _c = __values(partialSchema.definitions), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var definition = _d.value;
                    if (definition.kind === "ObjectTypeDefinition") {
                        var typename = definition.name.value;
                        fields["create" + typename] = createCreateMutation(definition, typeMapping, objectDefinitions);
                        try {
                            for (var _e = __values(createAddAndRemoveMutations(definition, typeMapping)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var _g = __read(_f.value, 2), fieldKey = _g[0], field = _g[1];
                                fields[fieldKey] = field;
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return fields;
        },
    });
    var subscriptionType = new graphql_1.GraphQLObjectType({
        name: "Subscription",
        fields: function () {
            var e_8, _a;
            var fields = {};
            var _loop_3 = function (definition) {
                if (definition.kind === "ObjectTypeDefinition") {
                    var typename_2 = definition.name.value;
                    fields[typename_2.toLowerCase() + "Updated"] = {
                        type: typeMapping[typename_2],
                        args: {
                            id: { type: graphql_1.GraphQLID },
                        },
                        subscribe: function (_, _a, context) {
                            var id = _a.id;
                            var topic = typename_2.toLowerCase() + "Updated:" + id;
                            var iterator = exports.pubsub.asyncIterator(topic);
                            context.database.collection(typename_2).doc(id)
                                .onSnapshot(function (doc) {
                                exports.pubsub.publish(topic, __assign({ id: id }, doc.data()));
                            });
                            return iterator;
                        },
                    };
                }
            };
            try {
                for (var _b = __values(partialSchema.definitions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var definition = _c.value;
                    _loop_3(definition);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return fields;
        },
    });
    return new graphql_1.GraphQLSchema({
        query: queryType,
        mutation: mutationType,
        subscription: subscriptionType,
    });
}
exports.createFullSchema = createFullSchema;
