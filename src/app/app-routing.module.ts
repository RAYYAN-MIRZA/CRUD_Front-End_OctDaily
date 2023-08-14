import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  // {path:'student-data',component:StudentDataComponent}
  // { path: '', redirectTo: '/page1', pathMatch: 'full' },
  // { path: 'page1', component: StudentDataComponent},
  // { path: 'page2', component: StudentDataComponent },
  // { path: 'page2', component: StudentDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
