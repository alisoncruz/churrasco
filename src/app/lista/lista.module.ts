import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListaRoutingModule} from './lista-routing.module';
import {ItemCompraComponent} from './containers/item-compra/item-compra.component';
import {ItemCompraDetailComponent} from './components/item-compra-detail/item-compra-detail.component';
import {CompraListComponent} from './components/compra-list/compra-list.component';
import {ListaCompraComponent} from './containers/lista-compra/lista-compra.component';
import {SharedModule} from '../core/shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {itemReducer} from './store/reducers/feature.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ItemsEffects} from './store/effects/items.effects';





@NgModule({
  declarations: [ListaCompraComponent, ItemCompraComponent, ItemCompraDetailComponent, CompraListComponent],
  imports: [
    CommonModule,
    ListaRoutingModule,
    SharedModule,
    StoreModule.forFeature('item', itemReducer),
    EffectsModule.forFeature([ItemsEffects])


  ]
})
export class ListaModule {
}
