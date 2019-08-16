(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["lista-lista-module"],{

/***/ "./node_modules/@ngrx/entity/fesm5/entity.js":
/*!***************************************************!*\
  !*** ./node_modules/@ngrx/entity/fesm5/entity.js ***!
  \***************************************************/
/*! exports provided: createEntityAdapter, Dictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntityAdapter", function() { return createEntityAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dictionary", function() { return Dictionary; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/**
 * @license NgRx 8.2.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */




function getInitialEntityState() {
    return {
        ids: [],
        entities: {},
    };
}
function createInitialStateFactory() {
    function getInitialState(additionalState) {
        if (additionalState === void 0) { additionalState = {}; }
        return Object.assign(getInitialEntityState(), additionalState);
    }
    return { getInitialState: getInitialState };
}

function createSelectorsFactory() {
    function getSelectors(selectState) {
        var selectIds = function (state) { return state.ids; };
        var selectEntities = function (state) { return state.entities; };
        var selectAll = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectIds, selectEntities, function (ids, entities) {
            return ids.map(function (id) { return entities[id]; });
        });
        var selectTotal = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectIds, function (ids) { return ids.length; });
        if (!selectState) {
            return {
                selectIds: selectIds,
                selectEntities: selectEntities,
                selectAll: selectAll,
                selectTotal: selectTotal,
            };
        }
        return {
            selectIds: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectState, selectIds),
            selectEntities: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectState, selectEntities),
            selectAll: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectState, selectAll),
            selectTotal: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createSelector"])(selectState, selectTotal),
        };
    }
    return { getSelectors: getSelectors };
}

var DidMutate;
(function (DidMutate) {
    DidMutate[DidMutate["EntitiesOnly"] = 0] = "EntitiesOnly";
    DidMutate[DidMutate["Both"] = 1] = "Both";
    DidMutate[DidMutate["None"] = 2] = "None";
})(DidMutate || (DidMutate = {}));
function createStateOperator(mutator) {
    return function operation(arg, state) {
        var clonedEntityState = {
            ids: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(state.ids),
            entities: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, state.entities),
        };
        var didMutate = mutator(arg, clonedEntityState);
        if (didMutate === DidMutate.Both) {
            return Object.assign({}, state, clonedEntityState);
        }
        if (didMutate === DidMutate.EntitiesOnly) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, state, { entities: clonedEntityState.entities });
        }
        return state;
    };
}

function selectIdValue(entity, selectId) {
    var key = selectId(entity);
    if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["isDevMode"])() && key === undefined) {
        console.warn('@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
    }
    return key;
}

function createUnsortedStateAdapter(selectId) {
    function addOneMutably(entity, state) {
        var key = selectIdValue(entity, selectId);
        if (key in state.entities) {
            return DidMutate.None;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return DidMutate.Both;
    }
    function addManyMutably(entities, state) {
        var e_1, _a;
        var didMutate = false;
        try {
            for (var entities_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                var entity = entities_1_1.value;
                didMutate = addOneMutably(entity, state) !== DidMutate.None || didMutate;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    function addAllMutably(entities, state) {
        state.ids = [];
        state.entities = {};
        addManyMutably(entities, state);
        return DidMutate.Both;
    }
    function removeOneMutably(key, state) {
        return removeManyMutably([key], state);
    }
    function removeManyMutably(keysOrPredicate, state) {
        var keys = keysOrPredicate instanceof Array
            ? keysOrPredicate
            : state.ids.filter(function (key) { return keysOrPredicate(state.entities[key]); });
        var didMutate = keys
            .filter(function (key) { return key in state.entities; })
            .map(function (key) { return delete state.entities[key]; }).length > 0;
        if (didMutate) {
            state.ids = state.ids.filter(function (id) { return id in state.entities; });
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    function removeAll(state) {
        return Object.assign({}, state, {
            ids: [],
            entities: {},
        });
    }
    function takeNewKey(keys, update, state) {
        var original = state.entities[update.id];
        var updated = Object.assign({}, original, update.changes);
        var newKey = selectIdValue(updated, selectId);
        var hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    function updateManyMutably(updates, state) {
        var newKeys = {};
        updates = updates.filter(function (update) { return update.id in state.entities; });
        var didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            var didMutateIds = updates.filter(function (update) { return takeNewKey(newKeys, update, state); }).length > 0;
            if (didMutateIds) {
                state.ids = state.ids.map(function (id) { return newKeys[id] || id; });
                return DidMutate.Both;
            }
            else {
                return DidMutate.EntitiesOnly;
            }
        }
        return DidMutate.None;
    }
    function mapMutably(map, state) {
        var changes = state.ids.reduce(function (changes, id) {
            var change = map(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id: id, changes: change });
            }
            return changes;
        }, []);
        var updates = changes.filter(function (_a) {
            var id = _a.id;
            return id in state.entities;
        });
        return updateManyMutably(updates, state);
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    function upsertManyMutably(entities, state) {
        var e_2, _a;
        var added = [];
        var updated = [];
        try {
            for (var entities_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(entities), entities_2_1 = entities_2.next(); !entities_2_1.done; entities_2_1 = entities_2.next()) {
                var entity = entities_2_1.value;
                var id = selectIdValue(entity, selectId);
                if (id in state.entities) {
                    updated.push({ id: id, changes: entity });
                }
                else {
                    added.push(entity);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (entities_2_1 && !entities_2_1.done && (_a = entities_2.return)) _a.call(entities_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var didMutateByUpdated = updateManyMutably(updated, state);
        var didMutateByAdded = addManyMutably(added, state);
        switch (true) {
            case didMutateByAdded === DidMutate.None &&
                didMutateByUpdated === DidMutate.None:
                return DidMutate.None;
            case didMutateByAdded === DidMutate.Both ||
                didMutateByUpdated === DidMutate.Both:
                return DidMutate.Both;
            default:
                return DidMutate.EntitiesOnly;
        }
    }
    return {
        removeAll: removeAll,
        addOne: createStateOperator(addOneMutably),
        addMany: createStateOperator(addManyMutably),
        addAll: createStateOperator(addAllMutably),
        updateOne: createStateOperator(updateOneMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        removeOne: createStateOperator(removeOneMutably),
        removeMany: createStateOperator(removeManyMutably),
        map: createStateOperator(mapMutably),
    };
}

function createSortedStateAdapter(selectId, sort) {
    var _a = createUnsortedStateAdapter(selectId), removeOne = _a.removeOne, removeMany = _a.removeMany, removeAll = _a.removeAll;
    function addOneMutably(entity, state) {
        return addManyMutably([entity], state);
    }
    function addManyMutably(newModels, state) {
        var models = newModels.filter(function (model) { return !(selectIdValue(model, selectId) in state.entities); });
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            merge(models, state);
            return DidMutate.Both;
        }
    }
    function addAllMutably(models, state) {
        state.entities = {};
        state.ids = [];
        addManyMutably(models, state);
        return DidMutate.Both;
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    function takeUpdatedModel(models, update, state) {
        if (!(update.id in state.entities)) {
            return false;
        }
        var original = state.entities[update.id];
        var updated = Object.assign({}, original, update.changes);
        var newKey = selectIdValue(updated, selectId);
        delete state.entities[update.id];
        models.push(updated);
        return newKey !== update.id;
    }
    function updateManyMutably(updates, state) {
        var models = [];
        var didMutateIds = updates.filter(function (update) { return takeUpdatedModel(models, update, state); }).length >
            0;
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            var originalIds_1 = state.ids;
            var updatedIndexes_1 = [];
            state.ids = state.ids.filter(function (id, index) {
                if (id in state.entities) {
                    return true;
                }
                else {
                    updatedIndexes_1.push(index);
                    return false;
                }
            });
            merge(models, state);
            if (!didMutateIds &&
                updatedIndexes_1.every(function (i) { return state.ids[i] === originalIds_1[i]; })) {
                return DidMutate.EntitiesOnly;
            }
            else {
                return DidMutate.Both;
            }
        }
    }
    function mapMutably(updatesOrMap, state) {
        var updates = state.ids.reduce(function (changes, id) {
            var change = updatesOrMap(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id: id, changes: change });
            }
            return changes;
        }, []);
        return updateManyMutably(updates, state);
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    function upsertManyMutably(entities, state) {
        var e_1, _a;
        var added = [];
        var updated = [];
        try {
            for (var entities_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                var entity = entities_1_1.value;
                var id = selectIdValue(entity, selectId);
                if (id in state.entities) {
                    updated.push({ id: id, changes: entity });
                }
                else {
                    added.push(entity);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var didMutateByUpdated = updateManyMutably(updated, state);
        var didMutateByAdded = addManyMutably(added, state);
        switch (true) {
            case didMutateByAdded === DidMutate.None &&
                didMutateByUpdated === DidMutate.None:
                return DidMutate.None;
            case didMutateByAdded === DidMutate.Both ||
                didMutateByUpdated === DidMutate.Both:
                return DidMutate.Both;
            default:
                return DidMutate.EntitiesOnly;
        }
    }
    function merge(models, state) {
        models.sort(sort);
        var ids = [];
        var i = 0;
        var j = 0;
        while (i < models.length && j < state.ids.length) {
            var model = models[i];
            var modelId = selectIdValue(model, selectId);
            var entityId = state.ids[j];
            var entity = state.entities[entityId];
            if (sort(model, entity) <= 0) {
                ids.push(modelId);
                i++;
            }
            else {
                ids.push(entityId);
                j++;
            }
        }
        if (i < models.length) {
            state.ids = ids.concat(models.slice(i).map(selectId));
        }
        else {
            state.ids = ids.concat(state.ids.slice(j));
        }
        models.forEach(function (model, i) {
            state.entities[selectId(model)] = model;
        });
    }
    return {
        removeOne: removeOne,
        removeMany: removeMany,
        removeAll: removeAll,
        addOne: createStateOperator(addOneMutably),
        updateOne: createStateOperator(updateOneMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        addAll: createStateOperator(addAllMutably),
        addMany: createStateOperator(addManyMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        map: createStateOperator(mapMutably),
    };
}

function createEntityAdapter(options) {
    if (options === void 0) { options = {}; }
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ sortComparer: false, selectId: function (instance) { return instance.id; } }, options), selectId = _a.selectId, sortComparer = _a.sortComparer;
    var stateFactory = createInitialStateFactory();
    var selectorsFactory = createSelectorsFactory();
    var stateAdapter = sortComparer
        ? createSortedStateAdapter(selectId, sortComparer)
        : createUnsortedStateAdapter(selectId);
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ selectId: selectId,
        sortComparer: sortComparer }, stateFactory, selectorsFactory, stateAdapter);
}

var Dictionary = /** @class */ (function () {
    function Dictionary() {
    }
    return Dictionary;
}());

/**
 * DO NOT EDIT
 *
 * This file is automatically generated at build
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=entity.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/lista/components/compra-list/compra-list.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/lista/components/compra-list/compra-list.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-list>\r\n  <mat-list-item *ngFor=\"let item of items\" routerLink=\"../item-compra\"\r\n                 (click)=\"select(item)\">{{item.nome}}</mat-list-item>\r\n</mat-list>\r\n\r\n<button mat-fab class=\"fab-bottom-right\" routerLink=\"../item-compra\">\r\n  <mat-icon>add</mat-icon>\r\n</button>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/lista/components/item-compra-detail/item-compra-detail.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/lista/components/item-compra-detail/item-compra-detail.component.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" fxLayout=\"column\" fxLayoutAlign=\"start\">\r\n<mat-card>\r\n  <form [formGroup]=\"itemForm\">\r\n    <mat-card-header>\r\n      <mat-card-title>\r\n        {{itemForm.value.nome}}\r\n      </mat-card-title>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n        <mat-form-field>\r\n          <input matInput placeholder=\"Nome\" formControlName=\"nome\">\r\n        </mat-form-field>\r\n    </mat-card-content>\r\n    <mat-card-content>\r\n        <mat-form-field>\r\n          <input matInput placeholder=\"Preço\" formControlName=\"preco\">\r\n        </mat-form-field>\r\n    </mat-card-content>\r\n    <mat-card-actions>\r\n      <button mat-button [disabled]=\"itemForm.invalid\"  (click)=\"update()\" >Salvar</button>\r\n      <button mat-button *ngIf=\"itemForm.get('id').value\"  (click)=\"delete()\" >Remover</button>\r\n      <button mat-button routerLink=\"../lista-compra\" (click)=\"unselect()\">Voltar</button>\r\n    </mat-card-actions>\r\n  </form>\r\n</mat-card>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/lista/containers/item-compra/item-compra.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/lista/containers/item-compra/item-compra.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-item-compra-detail [item]=\"item$ | async\" (actionEmitter)=\"dispatch($event)\"></app-item-compra-detail>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/lista/containers/lista-compra/lista-compra.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/lista/containers/lista-compra/lista-compra.component.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" fxLayout=\"column\" fxLayoutAlign=\"start\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>\r\n        Meus itens\r\n      </mat-card-title>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n      <app-compra-list [items]=\"items$ | async\" (actionEmitter)=\"dispatch($event)\" ></app-compra-list>\r\n    </mat-card-content>\r\n\r\n  </mat-card>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/lista/components/compra-list/compra-list.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/lista/components/compra-list/compra-list.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fab-bottom-right {\n  position: fixed;\n  bottom: 30px;\n  right: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGlzdGEvY29tcG9uZW50cy9jb21wcmEtbGlzdC9DOlxcVXNlcnNcXGFsaXNvXFxlc3R1ZG9zXFx0cmFiYWxob3Bvcy9zcmNcXGFwcFxcbGlzdGFcXGNvbXBvbmVudHNcXGNvbXByYS1saXN0XFxjb21wcmEtbGlzdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvbGlzdGEvY29tcG9uZW50cy9jb21wcmEtbGlzdC9jb21wcmEtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvbGlzdGEvY29tcG9uZW50cy9jb21wcmEtbGlzdC9jb21wcmEtbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mYWItYm90dG9tLXJpZ2h0IHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgYm90dG9tOiAzMHB4O1xyXG4gIHJpZ2h0OiAxNXB4O1xyXG59XHJcbiIsIi5mYWItYm90dG9tLXJpZ2h0IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IDMwcHg7XG4gIHJpZ2h0OiAxNXB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/lista/components/compra-list/compra-list.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/lista/components/compra-list/compra-list.component.ts ***!
  \***********************************************************************/
/*! exports provided: CompraListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompraListComponent", function() { return CompraListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/item.actions */ "./src/app/lista/store/actions/item.actions.ts");



var CompraListComponent = /** @class */ (function () {
    function CompraListComponent() {
        this.actionEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    CompraListComponent.prototype.ngOnInit = function () {
    };
    CompraListComponent.prototype.select = function (item) {
        this.actionEmitter.emit(Object(_store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["selectItem"])({ item: item }));
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
    ], CompraListComponent.prototype, "items", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
    ], CompraListComponent.prototype, "actionEmitter", void 0);
    CompraListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-compra-list',
            template: __webpack_require__(/*! raw-loader!./compra-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/lista/components/compra-list/compra-list.component.html"),
            styles: [__webpack_require__(/*! ./compra-list.component.scss */ "./src/app/lista/components/compra-list/compra-list.component.scss")]
        })
    ], CompraListComponent);
    return CompraListComponent;
}());



/***/ }),

/***/ "./src/app/lista/components/item-compra-detail/item-compra-detail.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/lista/components/item-compra-detail/item-compra-detail.component.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xpc3RhL2NvbXBvbmVudHMvaXRlbS1jb21wcmEtZGV0YWlsL2l0ZW0tY29tcHJhLWRldGFpbC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/lista/components/item-compra-detail/item-compra-detail.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/lista/components/item-compra-detail/item-compra-detail.component.ts ***!
  \*************************************************************************************/
/*! exports provided: ItemCompraDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemCompraDetailComponent", function() { return ItemCompraDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/item.actions */ "./src/app/lista/store/actions/item.actions.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");




var ItemCompraDetailComponent = /** @class */ (function () {
    function ItemCompraDetailComponent(fb) {
        this.fb = fb;
        this.itemForm = this.fb.group({
            id: [''],
            nome: [''],
            preco: ['']
        });
        this.actionEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    Object.defineProperty(ItemCompraDetailComponent.prototype, "item", {
        set: function (item) {
            if (item) {
                this.itemForm.patchValue(item);
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemCompraDetailComponent.prototype.ngOnInit = function () {
    };
    ItemCompraDetailComponent.prototype.unselect = function () {
        this.actionEmitter.emit(Object(_store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["unselectItem"])());
    };
    ItemCompraDetailComponent.prototype.update = function () {
        if (this.itemForm.get('id') && this.itemForm.get('id').value !== '') {
            this.actionEmitter.emit(Object(_store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateItem"])({ item: this.itemForm.value }));
        }
        else {
            this.actionEmitter.emit(Object(_store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["createItem"])({ item: this.itemForm.value }));
        }
    };
    ItemCompraDetailComponent.prototype.delete = function () {
        this.actionEmitter.emit(Object(_store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["deleteItem"])({ id: this.itemForm.get('id').value }));
    };
    ItemCompraDetailComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
    ], ItemCompraDetailComponent.prototype, "actionEmitter", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
    ], ItemCompraDetailComponent.prototype, "item", null);
    ItemCompraDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-item-compra-detail',
            template: __webpack_require__(/*! raw-loader!./item-compra-detail.component.html */ "./node_modules/raw-loader/index.js!./src/app/lista/components/item-compra-detail/item-compra-detail.component.html"),
            styles: [__webpack_require__(/*! ./item-compra-detail.component.scss */ "./src/app/lista/components/item-compra-detail/item-compra-detail.component.scss")]
        })
    ], ItemCompraDetailComponent);
    return ItemCompraDetailComponent;
}());



/***/ }),

/***/ "./src/app/lista/containers/item-compra/item-compra.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/lista/containers/item-compra/item-compra.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xpc3RhL2NvbnRhaW5lcnMvaXRlbS1jb21wcmEvaXRlbS1jb21wcmEuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/lista/containers/item-compra/item-compra.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/lista/containers/item-compra/item-compra.component.ts ***!
  \***********************************************************************/
/*! exports provided: ItemCompraComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemCompraComponent", function() { return ItemCompraComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _store_selectors_item_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/selectors/item.selectors */ "./src/app/lista/store/selectors/item.selectors.ts");




var ItemCompraComponent = /** @class */ (function () {
    function ItemCompraComponent(store) {
        this.store = store;
    }
    ItemCompraComponent.prototype.ngOnInit = function () {
        this.item$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])(_store_selectors_item_selectors__WEBPACK_IMPORTED_MODULE_3__["getSelectItem"]));
    };
    ItemCompraComponent.prototype.dispatch = function (action) {
        this.store.dispatch(action);
    };
    ItemCompraComponent.ctorParameters = function () { return [
        { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
    ]; };
    ItemCompraComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-item-compra',
            template: __webpack_require__(/*! raw-loader!./item-compra.component.html */ "./node_modules/raw-loader/index.js!./src/app/lista/containers/item-compra/item-compra.component.html"),
            styles: [__webpack_require__(/*! ./item-compra.component.scss */ "./src/app/lista/containers/item-compra/item-compra.component.scss")]
        })
    ], ItemCompraComponent);
    return ItemCompraComponent;
}());



/***/ }),

/***/ "./src/app/lista/containers/lista-compra/lista-compra.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/lista/containers/lista-compra/lista-compra.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xpc3RhL2NvbnRhaW5lcnMvbGlzdGEtY29tcHJhL2xpc3RhLWNvbXByYS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/lista/containers/lista-compra/lista-compra.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/lista/containers/lista-compra/lista-compra.component.ts ***!
  \*************************************************************************/
/*! exports provided: ListaCompraComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListaCompraComponent", function() { return ListaCompraComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _store_selectors_item_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/selectors/item.selectors */ "./src/app/lista/store/selectors/item.selectors.ts");




var ListaCompraComponent = /** @class */ (function () {
    function ListaCompraComponent(store) {
        this.store = store;
    }
    ListaCompraComponent.prototype.ngOnInit = function () {
        this.items$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])(_store_selectors_item_selectors__WEBPACK_IMPORTED_MODULE_3__["getAllItems"]));
    };
    ListaCompraComponent.prototype.dispatch = function (action) {
        this.store.dispatch(action);
    };
    ListaCompraComponent.ctorParameters = function () { return [
        { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
    ]; };
    ListaCompraComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-lista-compra',
            template: __webpack_require__(/*! raw-loader!./lista-compra.component.html */ "./node_modules/raw-loader/index.js!./src/app/lista/containers/lista-compra/lista-compra.component.html"),
            styles: [__webpack_require__(/*! ./lista-compra.component.scss */ "./src/app/lista/containers/lista-compra/lista-compra.component.scss")]
        })
    ], ListaCompraComponent);
    return ListaCompraComponent;
}());



/***/ }),

/***/ "./src/app/lista/lista-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/lista/lista-routing.module.ts ***!
  \***********************************************/
/*! exports provided: ListaRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListaRoutingModule", function() { return ListaRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _containers_item_compra_item_compra_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/item-compra/item-compra.component */ "./src/app/lista/containers/item-compra/item-compra.component.ts");
/* harmony import */ var _containers_lista_compra_lista_compra_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/lista-compra/lista-compra.component */ "./src/app/lista/containers/lista-compra/lista-compra.component.ts");





var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'lista-compra' },
    { path: 'item-compra', component: _containers_item_compra_item_compra_component__WEBPACK_IMPORTED_MODULE_3__["ItemCompraComponent"] },
    { path: 'lista-compra', component: _containers_lista_compra_lista_compra_component__WEBPACK_IMPORTED_MODULE_4__["ListaCompraComponent"] }
];
var ListaRoutingModule = /** @class */ (function () {
    function ListaRoutingModule() {
    }
    ListaRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], ListaRoutingModule);
    return ListaRoutingModule;
}());



/***/ }),

/***/ "./src/app/lista/lista.module.ts":
/*!***************************************!*\
  !*** ./src/app/lista/lista.module.ts ***!
  \***************************************/
/*! exports provided: ListaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListaModule", function() { return ListaModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _lista_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lista-routing.module */ "./src/app/lista/lista-routing.module.ts");
/* harmony import */ var _containers_item_compra_item_compra_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/item-compra/item-compra.component */ "./src/app/lista/containers/item-compra/item-compra.component.ts");
/* harmony import */ var _components_item_compra_detail_item_compra_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/item-compra-detail/item-compra-detail.component */ "./src/app/lista/components/item-compra-detail/item-compra-detail.component.ts");
/* harmony import */ var _components_compra_list_compra_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/compra-list/compra-list.component */ "./src/app/lista/components/compra-list/compra-list.component.ts");
/* harmony import */ var _containers_lista_compra_lista_compra_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./containers/lista-compra/lista-compra.component */ "./src/app/lista/containers/lista-compra/lista-compra.component.ts");
/* harmony import */ var _core_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/shared/shared.module */ "./src/app/core/shared/shared.module.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _store_reducers_feature_reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./store/reducers/feature.reducer */ "./src/app/lista/store/reducers/feature.reducer.ts");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var _store_effects_items_effects__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./store/effects/items.effects */ "./src/app/lista/store/effects/items.effects.ts");













var ListaModule = /** @class */ (function () {
    function ListaModule() {
    }
    ListaModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_containers_lista_compra_lista_compra_component__WEBPACK_IMPORTED_MODULE_7__["ListaCompraComponent"], _containers_item_compra_item_compra_component__WEBPACK_IMPORTED_MODULE_4__["ItemCompraComponent"], _components_item_compra_detail_item_compra_detail_component__WEBPACK_IMPORTED_MODULE_5__["ItemCompraDetailComponent"], _components_compra_list_compra_list_component__WEBPACK_IMPORTED_MODULE_6__["CompraListComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _lista_routing_module__WEBPACK_IMPORTED_MODULE_3__["ListaRoutingModule"],
                _core_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
                _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["StoreModule"].forFeature('item', _store_reducers_feature_reducer__WEBPACK_IMPORTED_MODULE_10__["itemReducer"]),
                _ngrx_effects__WEBPACK_IMPORTED_MODULE_11__["EffectsModule"].forFeature([_store_effects_items_effects__WEBPACK_IMPORTED_MODULE_12__["ItemsEffects"]])
            ]
        })
    ], ListaModule);
    return ListaModule;
}());



/***/ }),

/***/ "./src/app/lista/store/actions/item.actions.ts":
/*!*****************************************************!*\
  !*** ./src/app/lista/store/actions/item.actions.ts ***!
  \*****************************************************/
/*! exports provided: updateItemsList, createItem, updateItem, deleteItem, selectItem, unselectItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateItemsList", function() { return updateItemsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createItem", function() { return createItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateItem", function() { return updateItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteItem", function() { return deleteItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectItem", function() { return selectItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unselectItem", function() { return unselectItem; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");

var updateItemsList = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Update Items List', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
var createItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Create Item.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
var updateItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Update Item.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
var deleteItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Delete Item.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
var selectItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Select Item.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
var unselectItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Unselect Item.');


/***/ }),

/***/ "./src/app/lista/store/effects/items.effects.ts":
/*!******************************************************!*\
  !*** ./src/app/lista/store/effects/items.effects.ts ***!
  \******************************************************/
/*! exports provided: ItemsEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemsEffects", function() { return ItemsEffects; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm5/effects.js");
/* harmony import */ var _actions_item_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/item.actions */ "./src/app/lista/store/actions/item.actions.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _store_actions_app_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../store/actions/app.actions */ "./src/app/store/actions/app.actions.ts");
/* harmony import */ var _core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../core/store/actions/core.actions */ "./src/app/core/store/actions/core.actions.ts");









var ItemsEffects = /** @class */ (function () {
    function ItemsEffects(fireStore, actions$) {
        var _this = this;
        this.fireStore = fireStore;
        this.actions$ = actions$;
        this.updateItemsList$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["createEffect"])(function () { return _this.fireStore.collection('items').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (items) { return Object(_actions_item_actions__WEBPACK_IMPORTED_MODULE_4__["updateItemsList"])({ items: items }); })); });
        this.updateItem$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["createEffect"])(function () { return _this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["ofType"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_4__["updateItem"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])(function (action) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(_this.fireStore.doc("items/" + action.item.id).set(action.item)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])([
                Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_7__["navigateTo"])({ commands: ['core', 'layout', 'lista'] }),
                Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({ message: "Item " + action.item.nome + " atualizado", config: {} })
            ]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({
                message: 'Ops, something goes wrong', config: {
                    duration: 5000
                }
            })); }));
        })); });
        this.createItem$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["createEffect"])(function () { return _this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["ofType"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_4__["createItem"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])(function (action) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(_this.fireStore.doc("items/" + _this.createId()).set({
                id: _this.id,
                nome: action.item.nome,
                preco: action.item.preco
            })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])([
                Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_7__["navigateTo"])({ commands: ['core', 'layout', 'lista'] }),
                Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({ message: "Item " + action.item.nome + " criado", config: {} })
            ]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({
                message: 'Ops, something goes wrong.', config: {
                    duration: 5000
                }
            })); }));
        })); });
        this.deleteItem$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["createEffect"])(function () { return _this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["ofType"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_4__["deleteItem"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])(function (action) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(_this.fireStore.doc("items/" + action.id).delete()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])([
                Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_7__["navigateTo"])({ commands: ['core', 'layout', 'lista'] }),
                Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({ message: "Item exclu\u00EDdo", config: {} })
            ]); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({
                message: 'Ops, something goes wrong.', config: {
                    duration: 5000
                }
            })); }));
        })); });
    }
    ItemsEffects.prototype.createId = function () {
        this.id = this.fireStore.createId();
        return this.id;
    };
    ItemsEffects.ctorParameters = function () { return [
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
        { type: _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["Actions"] }
    ]; };
    ItemsEffects = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], ItemsEffects);
    return ItemsEffects;
}());



/***/ }),

/***/ "./src/app/lista/store/reducers/feature.reducer.ts":
/*!*********************************************************!*\
  !*** ./src/app/lista/store/reducers/feature.reducer.ts ***!
  \*********************************************************/
/*! exports provided: itemReducer, getItemsState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "itemReducer", function() { return itemReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItemsState", function() { return getItemsState; });
/* harmony import */ var _item_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item.reducer */ "./src/app/lista/store/reducers/item.reducer.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");


var itemReducer = {
    items: _item_reducer__WEBPACK_IMPORTED_MODULE_0__["reducerItems"]
};
var getItemsState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createFeatureSelector"])('item');


/***/ }),

/***/ "./src/app/lista/store/reducers/item.reducer.ts":
/*!******************************************************!*\
  !*** ./src/app/lista/store/reducers/item.reducer.ts ***!
  \******************************************************/
/*! exports provided: itemAdapter, reducerItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "itemAdapter", function() { return itemAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducerItems", function() { return reducerItems; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _actions_item_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/item.actions */ "./src/app/lista/store/actions/item.actions.ts");
/* harmony import */ var _ngrx_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/entity */ "./node_modules/@ngrx/entity/fesm5/entity.js");




var itemAdapter = Object(_ngrx_entity__WEBPACK_IMPORTED_MODULE_3__["createEntityAdapter"])({ sortComparer: function (a, b) { return a.nome.localeCompare(b.nome); } });
// const pog = [
//   {id: 1, nome: 'cerveja', preco: 5},
//   {id: 2, nome: 'carne', preco: 20},
//   {id: 3, nome: 'carvão', preco: 10},
//   {id: 4, nome: 'gelo', preco: 10}
// ];
// const initialState = itemAdapter.addAll(pog, itemAdapter.getInitialState());
var initialState = itemAdapter.getInitialState();
var reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateItemsList"], function (state, _a) {
    var items = _a.items;
    return itemAdapter.addAll(items, state);
}), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["selectItem"], function (state, _a) {
    var item = _a.item;
    return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { item: item }));
}), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["unselectItem"], _actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateItem"], function (state) {
    var item = state.item, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](state, ["item"]);
    return rest;
}), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["createItem"], function (state, _a) {
    var item = _a.item;
    return itemAdapter.addOne(item, state);
}), 
// on(updateItem, (state, {item}) => itemAdapter.updateOne({id: item.id, changes: item}, state)),
Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["deleteItem"], function (state, _a) {
    var id = _a.id;
    return itemAdapter.removeOne(id, state);
}));
function reducerItems(state, action) {
    return reducer(state, action);
}


/***/ }),

/***/ "./src/app/lista/store/selectors/item.selectors.ts":
/*!*********************************************************!*\
  !*** ./src/app/lista/store/selectors/item.selectors.ts ***!
  \*********************************************************/
/*! exports provided: getItemState, getAllItems, getSelectItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItemState", function() { return getItemState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllItems", function() { return getAllItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectItem", function() { return getSelectItem; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _reducers_feature_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/feature.reducer */ "./src/app/lista/store/reducers/feature.reducer.ts");
/* harmony import */ var _reducers_item_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/item.reducer */ "./src/app/lista/store/reducers/item.reducer.ts");



var getItemState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_reducers_feature_reducer__WEBPACK_IMPORTED_MODULE_1__["getItemsState"], function (state) { return state.items; });
var getAllItems = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getItemState, function (state) { return _reducers_item_reducer__WEBPACK_IMPORTED_MODULE_2__["itemAdapter"].getSelectors().selectAll(state); });
var getSelectItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getItemState, function (state) { return state.item; });


/***/ })

}]);
//# sourceMappingURL=lista-lista-module-es5.js.map