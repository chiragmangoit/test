import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './e-commerce/core/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
