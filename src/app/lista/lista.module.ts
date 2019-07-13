import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListaRoutingModule} from './lista-routing.module';
import {ItemCompraComponent} from './containers/item-compra/item-compra.component';
import {ItemCompraDetailComponent} from './components/item-compra-detail/item-compra-detail.component';
import {CompraListComponent} from './components/compra-list/compra-list.component';
import {ListaCompraComponent} from './containers/lista-compra/lista-compra.component';
import {SharedModule} from '../core/shared/shared.module';




@NgModule({
  declarations: [ListaCompraComponent, ItemCompraComponent, ItemCompraDetailComponent, CompraListComponent],
  imports: [
    CommonModule,
    ListaRoutingModule,
    SharedModule

  ]
})
export class ListaModule {
}
