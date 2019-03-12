"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
var apollo_link_1 = require("apollo-link");
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var firestore_link_1 = require("./firestore-link");
describe("ApolloLinkFirestore", function () {
    var link;
    var database;
    var collection;
    var doc;
    beforeEach(function () {
        database = jasmine.createSpyObj("db", ["collection"]);
        collection = jasmine.createSpyObj("collection", ["doc", "add"]);
        doc = jasmine.createSpyObj("doc", ["get", "onSnapshot"]);
        database.collection.and.returnValue(collection);
        collection.doc.and.returnValue(doc);
        collection.add.and.returnValue(Promise.resolve(null));
        doc.get.and.returnValue(Promise.resolve(null));
        doc.onSnapshot.and.callFake(function (callback) { return callback(null); });
        link = firestore_link_1.createFirestoreLink({
            database: database,
            partialSchema: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                type Person {\n                    id: ID!\n                    name: String!\n                }\n            "], ["\n                type Person {\n                    id: ID!\n                    name: String!\n                }\n            "]))),
        });
    });
    it("should return a new link", function () {
        expect(link instanceof apollo_link_1.ApolloLink).toEqual(true);
    });
    it("should call forward if not a firestore query", function () { return __awaiter(_this, void 0, void 0, function () {
        var operation, nextSpy, linkWithNext;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    operation = {
                        query: graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query { hello }"], ["query { hello }"]))),
                    };
                    nextSpy = jasmine.createSpy("next").and.returnValue(apollo_link_1.Observable.from(["done"]));
                    linkWithNext = link.concat(nextSpy);
                    return [4 /*yield*/, apollo_link_1.makePromise(apollo_link_1.execute(linkWithNext, operation))];
                case 1:
                    _a.sent();
                    expect(nextSpy).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should fetch information from firestore", function () { return __awaiter(_this, void 0, void 0, function () {
        var operation, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    operation = {
                        query: graphql_tag_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["query { person(id: \"id\") @firestore { name } }"], ["query { person(id: \"id\") @firestore { name } }"]))),
                    };
                    doc.get.and.returnValue(Promise.resolve({ exists: true, data: function () { return ({ name: "Bob" }); } }));
                    return [4 /*yield*/, apollo_link_1.makePromise(apollo_link_1.execute(link, operation))];
                case 1:
                    result = _a.sent();
                    expect(doc.get).toHaveBeenCalled();
                    expect(result).toEqual({ data: { person: { name: "Bob" } } });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should mutate information in firestore", function () { return __awaiter(_this, void 0, void 0, function () {
        var operation, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    operation = {
                        query: graphql_tag_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["mutation CreatePerson { createPerson(input: { name: \"Bob\" }) @firestore { name } }"], ["mutation CreatePerson { createPerson(input: { name: \"Bob\" }) @firestore { name } }"]))),
                    };
                    collection.add.and.returnValue(Promise.resolve({ id: "foo" }));
                    return [4 /*yield*/, apollo_link_1.makePromise(apollo_link_1.execute(link, operation))];
                case 1:
                    result = _a.sent();
                    expect(collection.add).toHaveBeenCalled();
                    expect(result).toEqual({ data: { createPerson: { name: "Bob" } } });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should subscribe to updates", function () { return __awaiter(_this, void 0, void 0, function () {
        var operation, expectedValue, firestoreUpdate, firestoreObservable, observable;
        return __generator(this, function (_a) {
            operation = {
                query: graphql_tag_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["subscription { personUpdated(id: \"id\") @firestore { name } }"], ["subscription { personUpdated(id: \"id\") @firestore { name } }"]))),
            };
            expectedValue = 0;
            firestoreObservable = new apollo_link_1.Observable(function (observer) {
                firestoreUpdate = function (update) {
                    observer.next(update);
                };
            });
            doc.onSnapshot.and.callFake(function (callback) {
                firestoreObservable.subscribe(function (update) { return callback({ data: function () { return update; } }); });
            });
            observable = apollo_link_1.execute(link, operation);
            observable.subscribe(function (result) {
                switch (expectedValue) {
                    case 0:
                        expect(result).toEqual({ data: { id: "id", name: "Bob" } });
                        expectedValue++;
                        break;
                    case 1:
                        expect(result).toEqual({ data: { id: "id", name: "Bill" } });
                        expectedValue++;
                        break;
                    case 2:
                        expect(result).toEqual({ data: { id: "id", name: "Roseanna" } });
                        expectedValue++;
                }
            });
            firestoreUpdate({ name: "Bob" });
            firestoreUpdate({ name: "Bill" });
            firestoreUpdate({ name: "Roseanna" });
            return [2 /*return*/];
        });
    }); });
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
