import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemCompraComponent} from './containers/item-compra/item-compra.component';
import {ListaCompraComponent} from './containers/lista-compra/lista-compra.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'lista-compra'},
  {path: 'item-compra', component: ItemCompraComponent},
  {path: 'lista-compra', component: ListaCompraComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaRoutingModule {
}
