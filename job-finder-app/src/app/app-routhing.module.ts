import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './utils/authentication.guard';
import { LoginComponent } from './login/login.component';
import { RegisterPersonComponent } from './register-person/register-person.component';
import { SearchOffersComponent } from './search-offers/search-offers.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { OffersSearchResultComponent } from './offers-search-result/offers-search-result.component';

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
  { path: 'searchOffers/result', component: OffersSearchResultComponent },
  { path: 'createOffer', component: CreateOfferComponent },
  { path: 'myOffers', component: MyOffersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/person', component: RegisterPersonComponent },
  { path: 'register/company', component: RegisterPersonComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}