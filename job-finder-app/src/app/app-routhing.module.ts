import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './utils/authentication.guard';
import { LoginComponent } from './login/login.component';
import { SearchOffersComponent } from './search-offers/search-offers.component';
/*import { CurrentOrdersComponent } from './current-orders/current-orders.component';
import { OpenedOrdersComponent } from './opened-orders/opened-orders.component';
import { DeliveredQuantitiesComponent } from './delivered-quantities/delivered-quantities.component';
import { DeliveryNotesComponent } from './delivery-notes/delivery-notes.component'; */

export const routes: Routes = [
  { path: '', redirectTo: 'searchOffers', pathMatch: 'full' }, //canActivate: [AuthGuard] },
  { path: 'searchOffers', component: SearchOffersComponent, //canActivate: [AuthGuard],
    /*children: [
      {path: 'currentOrders', component: CurrentOrdersComponent},
      {path: 'openedOrders', component: OpenedOrdersComponent},
      {path: 'deliveredQuantities', component: DeliveredQuantitiesComponent},
      {path: 'deliveryNotes', component: DeliveryNotesComponent}
    ]*/
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}