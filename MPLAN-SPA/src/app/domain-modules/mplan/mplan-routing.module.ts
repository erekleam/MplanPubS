import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MplanMainComponent } from './mplan-main/mplan-main.component';
import { MplanListsComponent } from './mplan-lists/mplan-lists.component';
import { MplanAddComponent } from './mplan-add/mplan-add.component';

const routes: Routes = [
  {
    path: '',
        canActivate: [],
        children: [
          { path: 'Mplan', component: MplanAddComponent, pathMatch: 'full'},
            { path: 'Mplan/:id', component: MplanMainComponent, pathMatch: 'full'},
            { path: 'list', component: MplanListsComponent, pathMatch: 'full'},
            // { path: ':id', component: MplanMainComponent, pathMatch: 'full' },
        ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MplanRoutingModule { }
