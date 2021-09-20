import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHouseEntryComponent } from './add-house-entry/add-house-entry.component';
import { EditHouseDetailsComponent } from './edit-house-details/edit-house-details.component';
import { HomeComponent } from './home/home.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
 {
   path:'home',component:HomeComponent
  },
 {
  path:'add',component:AddHouseEntryComponent
  },
 {
  path:'house-details/:id',component:HouseDetailsComponent
  },
 {
  path:'house-details/:id/edit',component:EditHouseDetailsComponent
  },
{
  path:'start',component:StartComponent
},
{
  path:'',component:StartComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
