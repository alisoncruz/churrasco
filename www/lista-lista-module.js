(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["lista-lista-module"],{

/***/ "./node_modules/@ngrx/entity/fesm2015/entity.js":
/*!******************************************************!*\
  !*** ./node_modules/@ngrx/entity/fesm2015/entity.js ***!
  \******************************************************/
/*! exports provided: createEntityAdapter, Dictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntityAdapter", function() { return createEntityAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dictionary", function() { return Dictionary; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/**
 * @license NgRx 8.2.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template V
 * @return {?}
 */
function getInitialEntityState() {
    return {
        ids: [],
        entities: {},
    };
}
/**
 * @template V
 * @return {?}
 */
function createInitialStateFactory() {
    /**
     * @param {?=} additionalState
     * @return {?}
     */
    function getInitialState(additionalState = {}) {
        return Object.assign(getInitialEntityState(), additionalState);
    }
    return { getInitialState };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @return {?}
 */
function createSelectorsFactory() {
    /**
     * @param {?=} selectState
     * @return {?}
     */
    function getSelectors(selectState) {
        /** @type {?} */
        const selectIds = (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.ids);
        /** @type {?} */
        const selectEntities = (/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.entities);
        /** @type {?} */
        const selectAll = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectIds, selectEntities, (/**
         * @param {?} ids
         * @param {?} entities
         * @return {?}
         */
        (ids, entities) => ids.map((/**
         * @param {?} id
         * @return {?}
         */
        (id) => ((/** @type {?} */ (entities)))[id]))));
        /** @type {?} */
        const selectTotal = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectIds, (/**
         * @param {?} ids
         * @return {?}
         */
        ids => ids.length));
        if (!selectState) {
            return {
                selectIds,
                selectEntities,
                selectAll,
                selectTotal,
            };
        }
        return {
            selectIds: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectState, selectIds),
            selectEntities: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectState, selectEntities),
            selectAll: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectState, selectAll),
            selectTotal: Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectState, selectTotal),
        };
    }
    return { getSelectors };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const DidMutate = {
    EntitiesOnly: 0,
    Both: 1,
    None: 2,
};
DidMutate[DidMutate.EntitiesOnly] = 'EntitiesOnly';
DidMutate[DidMutate.Both] = 'Both';
DidMutate[DidMutate.None] = 'None';
/**
 * @template V, R
 * @param {?} mutator
 * @return {?}
 */
function createStateOperator(mutator) {
    return (/**
     * @template S
     * @param {?} arg
     * @param {?} state
     * @return {?}
     */
    function operation(arg, state) {
        /** @type {?} */
        const clonedEntityState = {
            ids: [...state.ids],
            entities: Object.assign({}, state.entities),
        };
        /** @type {?} */
        const didMutate = mutator(arg, clonedEntityState);
        if (didMutate === DidMutate.Both) {
            return Object.assign({}, state, clonedEntityState);
        }
        if (didMutate === DidMutate.EntitiesOnly) {
            return Object.assign({}, state, { entities: clonedEntityState.entities });
        }
        return state;
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} entity
 * @param {?} selectId
 * @return {?}
 */
function selectIdValue(entity, selectId) {
    /** @type {?} */
    const key = selectId(entity);
    if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])() && key === undefined) {
        console.warn('@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.', 'You should probably provide your own `selectId` implementation.', 'The entity that was passed:', entity, 'The `selectId` implementation:', selectId.toString());
    }
    return key;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} selectId
 * @return {?}
 */
function createUnsortedStateAdapter(selectId) {
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function addOneMutably(entity, state) {
        /** @type {?} */
        const key = selectIdValue(entity, selectId);
        if (key in state.entities) {
            return DidMutate.None;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return DidMutate.Both;
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(entities, state) {
        /** @type {?} */
        let didMutate = false;
        for (const entity of entities) {
            didMutate = addOneMutably(entity, state) !== DidMutate.None || didMutate;
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function addAllMutably(entities, state) {
        state.ids = [];
        state.entities = {};
        addManyMutably(entities, state);
        return DidMutate.Both;
    }
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    function removeOneMutably(key, state) {
        return removeManyMutably([key], state);
    }
    /**
     * @param {?} keysOrPredicate
     * @param {?} state
     * @return {?}
     */
    function removeManyMutably(keysOrPredicate, state) {
        /** @type {?} */
        const keys = keysOrPredicate instanceof Array
            ? keysOrPredicate
            : state.ids.filter((/**
             * @param {?} key
             * @return {?}
             */
            (key) => keysOrPredicate(state.entities[key])));
        /** @type {?} */
        const didMutate = keys
            .filter((/**
         * @param {?} key
         * @return {?}
         */
        (key) => key in state.entities))
            .map((/**
         * @param {?} key
         * @return {?}
         */
        (key) => delete state.entities[key])).length > 0;
        if (didMutate) {
            state.ids = state.ids.filter((/**
             * @param {?} id
             * @return {?}
             */
            (id) => id in state.entities));
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    /**
     * @template S
     * @param {?} state
     * @return {?}
     */
    function removeAll(state) {
        return Object.assign({}, state, {
            ids: [],
            entities: {},
        });
    }
    /**
     * @param {?} keys
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function takeNewKey(keys, update, state) {
        /** @type {?} */
        const original = state.entities[update.id];
        /** @type {?} */
        const updated = Object.assign({}, original, update.changes);
        /** @type {?} */
        const newKey = selectIdValue(updated, selectId);
        /** @type {?} */
        const hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
    }
    /**
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    /**
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        /** @type {?} */
        const newKeys = {};
        updates = updates.filter((/**
         * @param {?} update
         * @return {?}
         */
        update => update.id in state.entities));
        /** @type {?} */
        const didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            /** @type {?} */
            const didMutateIds = updates.filter((/**
             * @param {?} update
             * @return {?}
             */
            update => takeNewKey(newKeys, update, state))).length > 0;
            if (didMutateIds) {
                state.ids = state.ids.map((/**
                 * @param {?} id
                 * @return {?}
                 */
                (id) => newKeys[id] || id));
                return DidMutate.Both;
            }
            else {
                return DidMutate.EntitiesOnly;
            }
        }
        return DidMutate.None;
    }
    /**
     * @param {?} map
     * @param {?} state
     * @return {?}
     */
    function mapMutably(map, state) {
        /** @type {?} */
        const changes = state.ids.reduce((/**
         * @param {?} changes
         * @param {?} id
         * @return {?}
         */
        (changes, id) => {
            /** @type {?} */
            const change = map(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }), []);
        /** @type {?} */
        const updates = changes.filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ id }) => id in state.entities));
        return updateManyMutably(updates, state);
    }
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function upsertManyMutably(entities, state) {
        /** @type {?} */
        const added = [];
        /** @type {?} */
        const updated = [];
        for (const entity of entities) {
            /** @type {?} */
            const id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            }
            else {
                added.push(entity);
            }
        }
        /** @type {?} */
        const didMutateByUpdated = updateManyMutably(updated, state);
        /** @type {?} */
        const didMutateByAdded = addManyMutably(added, state);
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
        removeAll,
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} selectId
 * @param {?} sort
 * @return {?}
 */
function createSortedStateAdapter(selectId, sort) {
    const { removeOne, removeMany, removeAll } = createUnsortedStateAdapter(selectId);
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function addOneMutably(entity, state) {
        return addManyMutably([entity], state);
    }
    /**
     * @param {?} newModels
     * @param {?} state
     * @return {?}
     */
    function addManyMutably(newModels, state) {
        /** @type {?} */
        const models = newModels.filter((/**
         * @param {?} model
         * @return {?}
         */
        model => !(selectIdValue(model, selectId) in state.entities)));
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            merge(models, state);
            return DidMutate.Both;
        }
    }
    /**
     * @param {?} models
     * @param {?} state
     * @return {?}
     */
    function addAllMutably(models, state) {
        state.entities = {};
        state.ids = [];
        addManyMutably(models, state);
        return DidMutate.Both;
    }
    /**
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    /**
     * @param {?} models
     * @param {?} update
     * @param {?} state
     * @return {?}
     */
    function takeUpdatedModel(models, update, state) {
        if (!(update.id in state.entities)) {
            return false;
        }
        /** @type {?} */
        const original = state.entities[update.id];
        /** @type {?} */
        const updated = Object.assign({}, original, update.changes);
        /** @type {?} */
        const newKey = selectIdValue(updated, selectId);
        delete state.entities[update.id];
        models.push(updated);
        return newKey !== update.id;
    }
    /**
     * @param {?} updates
     * @param {?} state
     * @return {?}
     */
    function updateManyMutably(updates, state) {
        /** @type {?} */
        const models = [];
        /** @type {?} */
        const didMutateIds = updates.filter((/**
         * @param {?} update
         * @return {?}
         */
        update => takeUpdatedModel(models, update, state))).length >
            0;
        if (models.length === 0) {
            return DidMutate.None;
        }
        else {
            /** @type {?} */
            const originalIds = state.ids;
            /** @type {?} */
            const updatedIndexes = [];
            state.ids = state.ids.filter((/**
             * @param {?} id
             * @param {?} index
             * @return {?}
             */
            (id, index) => {
                if (id in state.entities) {
                    return true;
                }
                else {
                    updatedIndexes.push(index);
                    return false;
                }
            }));
            merge(models, state);
            if (!didMutateIds &&
                updatedIndexes.every((/**
                 * @param {?} i
                 * @return {?}
                 */
                (i) => state.ids[i] === originalIds[i]))) {
                return DidMutate.EntitiesOnly;
            }
            else {
                return DidMutate.Both;
            }
        }
    }
    /**
     * @param {?} updatesOrMap
     * @param {?} state
     * @return {?}
     */
    function mapMutably(updatesOrMap, state) {
        /** @type {?} */
        const updates = state.ids.reduce((/**
         * @param {?} changes
         * @param {?} id
         * @return {?}
         */
        (changes, id) => {
            /** @type {?} */
            const change = updatesOrMap(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }), []);
        return updateManyMutably(updates, state);
    }
    /**
     * @param {?} entity
     * @param {?} state
     * @return {?}
     */
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    /**
     * @param {?} entities
     * @param {?} state
     * @return {?}
     */
    function upsertManyMutably(entities, state) {
        /** @type {?} */
        const added = [];
        /** @type {?} */
        const updated = [];
        for (const entity of entities) {
            /** @type {?} */
            const id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            }
            else {
                added.push(entity);
            }
        }
        /** @type {?} */
        const didMutateByUpdated = updateManyMutably(updated, state);
        /** @type {?} */
        const didMutateByAdded = addManyMutably(added, state);
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
    /**
     * @param {?} models
     * @param {?} state
     * @return {?}
     */
    function merge(models, state) {
        models.sort(sort);
        /** @type {?} */
        const ids = [];
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        let j = 0;
        while (i < models.length && j < state.ids.length) {
            /** @type {?} */
            const model = models[i];
            /** @type {?} */
            const modelId = selectIdValue(model, selectId);
            /** @type {?} */
            const entityId = state.ids[j];
            /** @type {?} */
            const entity = state.entities[entityId];
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
        models.forEach((/**
         * @param {?} model
         * @param {?} i
         * @return {?}
         */
        (model, i) => {
            state.entities[selectId(model)] = model;
        }));
    }
    return {
        removeOne,
        removeMany,
        removeAll,
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?=} options
 * @return {?}
 */
function createEntityAdapter(options = {}) {
    const { selectId, sortComparer } = Object.assign({ sortComparer: false, selectId: (/**
         * @param {?} instance
         * @return {?}
         */
        (instance) => instance.id) }, options);
    /** @type {?} */
    const stateFactory = createInitialStateFactory();
    /** @type {?} */
    const selectorsFactory = createSelectorsFactory();
    /** @type {?} */
    const stateAdapter = sortComparer
        ? createSortedStateAdapter(selectId, sortComparer)
        : createUnsortedStateAdapter(selectId);
    return Object.assign({ selectId,
        sortComparer }, stateFactory, selectorsFactory, stateAdapter);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
class Dictionary {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

module.exports = ".fab-bottom-right {\n  position: fixed;\n  bottom: 30px;\n  right: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGlzdGEvY29tcG9uZW50cy9jb21wcmEtbGlzdC9DOlxcVXNlcnNcXGNsYXl0b24uY2hhZ2FzXFxXZWJzdG9ybVByb2plY3RzXFxjaHVycmFzY28vc3JjXFxhcHBcXGxpc3RhXFxjb21wb25lbnRzXFxjb21wcmEtbGlzdFxcY29tcHJhLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2xpc3RhL2NvbXBvbmVudHMvY29tcHJhLWxpc3QvY29tcHJhLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2xpc3RhL2NvbXBvbmVudHMvY29tcHJhLWxpc3QvY29tcHJhLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmFiLWJvdHRvbS1yaWdodCB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGJvdHRvbTogMzBweDtcclxuICByaWdodDogMTVweDtcclxufVxyXG4iLCIuZmFiLWJvdHRvbS1yaWdodCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAzMHB4O1xuICByaWdodDogMTVweDtcbn0iXX0= */"

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/item.actions */ "./src/app/lista/store/actions/item.actions.ts");



let CompraListComponent = class CompraListComponent {
    constructor() {
        this.actionEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
    }
    select(item) {
        this.actionEmitter.emit(Object(_store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["selectItem"])({ item }));
    }
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/item.actions */ "./src/app/lista/store/actions/item.actions.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");




let ItemCompraDetailComponent = class ItemCompraDetailComponent {
    constructor(fb) {
        this.fb = fb;
        this.itemForm = this.fb.group({
            id: [''],
            nome: [''],
            preco: ['']
        });
        this.actionEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    set item(item) {
        if (item) {
            this.itemForm.patchValue(item);
        }
    }
    ngOnInit() {
    }
    unselect() {
        this.actionEmitter.emit(Object(_store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["unselectItem"])());
    }
    update() {
        if (this.itemForm.get('id') && this.itemForm.get('id').value !== '') {
            this.actionEmitter.emit(Object(_store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateItem"])({ item: this.itemForm.value }));
        }
        else {
            this.actionEmitter.emit(Object(_store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["createItem"])({ item: this.itemForm.value }));
        }
    }
    delete() {
        this.actionEmitter.emit(Object(_store_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["deleteItem"])({ id: this.itemForm.get('id').value }));
    }
};
ItemCompraDetailComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }
];
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _store_selectors_item_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/selectors/item.selectors */ "./src/app/lista/store/selectors/item.selectors.ts");




let ItemCompraComponent = class ItemCompraComponent {
    constructor(store) {
        this.store = store;
    }
    ngOnInit() {
        this.item$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])(_store_selectors_item_selectors__WEBPACK_IMPORTED_MODULE_3__["getSelectItem"]));
    }
    dispatch(action) {
        this.store.dispatch(action);
    }
};
ItemCompraComponent.ctorParameters = () => [
    { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
];
ItemCompraComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-item-compra',
        template: __webpack_require__(/*! raw-loader!./item-compra.component.html */ "./node_modules/raw-loader/index.js!./src/app/lista/containers/item-compra/item-compra.component.html"),
        styles: [__webpack_require__(/*! ./item-compra.component.scss */ "./src/app/lista/containers/item-compra/item-compra.component.scss")]
    })
], ItemCompraComponent);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _store_selectors_item_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/selectors/item.selectors */ "./src/app/lista/store/selectors/item.selectors.ts");




let ListaCompraComponent = class ListaCompraComponent {
    constructor(store) {
        this.store = store;
    }
    ngOnInit() {
        this.items$ = this.store.pipe(Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__["select"])(_store_selectors_item_selectors__WEBPACK_IMPORTED_MODULE_3__["getAllItems"]));
    }
    dispatch(action) {
        this.store.dispatch(action);
    }
};
ListaCompraComponent.ctorParameters = () => [
    { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }
];
ListaCompraComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-lista-compra',
        template: __webpack_require__(/*! raw-loader!./lista-compra.component.html */ "./node_modules/raw-loader/index.js!./src/app/lista/containers/lista-compra/lista-compra.component.html"),
        styles: [__webpack_require__(/*! ./lista-compra.component.scss */ "./src/app/lista/containers/lista-compra/lista-compra.component.scss")]
    })
], ListaCompraComponent);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _containers_item_compra_item_compra_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers/item-compra/item-compra.component */ "./src/app/lista/containers/item-compra/item-compra.component.ts");
/* harmony import */ var _containers_lista_compra_lista_compra_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/lista-compra/lista-compra.component */ "./src/app/lista/containers/lista-compra/lista-compra.component.ts");





const routes = [
    { path: '', pathMatch: 'full', redirectTo: 'lista-compra' },
    { path: 'item-compra', component: _containers_item_compra_item_compra_component__WEBPACK_IMPORTED_MODULE_3__["ItemCompraComponent"] },
    { path: 'lista-compra', component: _containers_lista_compra_lista_compra_component__WEBPACK_IMPORTED_MODULE_4__["ListaCompraComponent"] }
];
let ListaRoutingModule = class ListaRoutingModule {
};
ListaRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ListaRoutingModule);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _lista_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lista-routing.module */ "./src/app/lista/lista-routing.module.ts");
/* harmony import */ var _containers_item_compra_item_compra_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/item-compra/item-compra.component */ "./src/app/lista/containers/item-compra/item-compra.component.ts");
/* harmony import */ var _components_item_compra_detail_item_compra_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/item-compra-detail/item-compra-detail.component */ "./src/app/lista/components/item-compra-detail/item-compra-detail.component.ts");
/* harmony import */ var _components_compra_list_compra_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/compra-list/compra-list.component */ "./src/app/lista/components/compra-list/compra-list.component.ts");
/* harmony import */ var _containers_lista_compra_lista_compra_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./containers/lista-compra/lista-compra.component */ "./src/app/lista/containers/lista-compra/lista-compra.component.ts");
/* harmony import */ var _core_shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/shared/shared.module */ "./src/app/core/shared/shared.module.ts");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _store_reducers_feature_reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./store/reducers/feature.reducer */ "./src/app/lista/store/reducers/feature.reducer.ts");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm2015/effects.js");
/* harmony import */ var _store_effects_items_effects__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./store/effects/items.effects */ "./src/app/lista/store/effects/items.effects.ts");













let ListaModule = class ListaModule {
};
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
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");

const updateItemsList = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Update Items List', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const createItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Create Item.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const updateItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Update Item.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const deleteItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Delete Item.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const selectItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Select Item.', Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["props"])());
const unselectItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createAction"])('[Items] Unselect Item.');


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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/effects */ "./node_modules/@ngrx/effects/fesm2015/effects.js");
/* harmony import */ var _actions_item_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/item.actions */ "./src/app/lista/store/actions/item.actions.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _store_actions_app_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../store/actions/app.actions */ "./src/app/store/actions/app.actions.ts");
/* harmony import */ var _core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../core/store/actions/core.actions */ "./src/app/core/store/actions/core.actions.ts");









let ItemsEffects = class ItemsEffects {
    constructor(fireStore, actions$) {
        this.fireStore = fireStore;
        this.actions$ = actions$;
        this.updateItemsList$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["createEffect"])(() => this.fireStore.collection('items').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(items => Object(_actions_item_actions__WEBPACK_IMPORTED_MODULE_4__["updateItemsList"])({ items }))));
        this.updateItem$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["createEffect"])(() => this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["ofType"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_4__["updateItem"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])((action) => Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(this.fireStore.doc(`items/${action.item.id}`).set(action.item)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])([
            Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_7__["navigateTo"])({ commands: ['core', 'layout', 'lista'] }),
            Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({ message: `Item ${action.item.nome} atualizado`, config: {} })
        ])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({
            message: 'Ops, something goes wrong', config: {
                duration: 5000
            }
        })))))));
        this.createItem$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["createEffect"])(() => this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["ofType"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_4__["createItem"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])((action) => Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(this.fireStore.doc(`items/${this.createId()}`).set({
            id: this.id,
            nome: action.item.nome,
            preco: action.item.preco
        })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])([
            Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_7__["navigateTo"])({ commands: ['core', 'layout', 'lista'] }),
            Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({ message: `Item ${action.item.nome} criado`, config: {} })
        ])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({
            message: 'Ops, something goes wrong.', config: {
                duration: 5000
            }
        })))))));
        this.deleteItem$ = Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["createEffect"])(() => this.actions$.pipe(Object(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["ofType"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_4__["deleteItem"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["exhaustMap"])((action) => Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(this.fireStore.doc(`items/${action.id}`).delete()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["concatMap"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])([
            Object(_store_actions_app_actions__WEBPACK_IMPORTED_MODULE_7__["navigateTo"])({ commands: ['core', 'layout', 'lista'] }),
            Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({ message: `Item excluído`, config: {} })
        ])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(Object(_core_store_actions_core_actions__WEBPACK_IMPORTED_MODULE_8__["showSnackBar"])({
            message: 'Ops, something goes wrong.', config: {
                duration: 5000
            }
        })))))));
    }
    createId() {
        this.id = this.fireStore.createId();
        return this.id;
    }
};
ItemsEffects.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
    { type: _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__["Actions"] }
];
ItemsEffects = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], ItemsEffects);



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
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");


const itemReducer = {
    items: _item_reducer__WEBPACK_IMPORTED_MODULE_0__["reducerItems"]
};
const getItemsState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createFeatureSelector"])('item');


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
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _actions_item_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/item.actions */ "./src/app/lista/store/actions/item.actions.ts");
/* harmony import */ var _ngrx_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/entity */ "./node_modules/@ngrx/entity/fesm2015/entity.js");




const itemAdapter = Object(_ngrx_entity__WEBPACK_IMPORTED_MODULE_3__["createEntityAdapter"])({ sortComparer: (a, b) => a.nome.localeCompare(b.nome) });
// const pog = [
//   {id: 1, nome: 'cerveja', preco: 5},
//   {id: 2, nome: 'carne', preco: 20},
//   {id: 3, nome: 'carvão', preco: 10},
//   {id: 4, nome: 'gelo', preco: 10}
// ];
// const initialState = itemAdapter.addAll(pog, itemAdapter.getInitialState());
const initialState = itemAdapter.getInitialState();
const reducer = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["createReducer"])(initialState, Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateItemsList"], (state, { items }) => itemAdapter.addAll(items, state)), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["selectItem"], (state, { item }) => (Object.assign({}, state, { item }))), Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["on"])(_actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["unselectItem"], _actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["updateItem"], _actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["createItem"], _actions_item_actions__WEBPACK_IMPORTED_MODULE_2__["deleteItem"], (state) => {
    const { item } = state, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](state, ["item"]);
    return rest;
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
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var _reducers_feature_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducers/feature.reducer */ "./src/app/lista/store/reducers/feature.reducer.ts");
/* harmony import */ var _reducers_item_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/item.reducer */ "./src/app/lista/store/reducers/item.reducer.ts");



const getItemState = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_reducers_feature_reducer__WEBPACK_IMPORTED_MODULE_1__["getItemsState"], state => state.items);
const getAllItems = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getItemState, state => _reducers_item_reducer__WEBPACK_IMPORTED_MODULE_2__["itemAdapter"].getSelectors().selectAll(state));
const getSelectItem = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(getItemState, state => state.item);


/***/ })

}]);
//# sourceMappingURL=lista-lista-module.js.map