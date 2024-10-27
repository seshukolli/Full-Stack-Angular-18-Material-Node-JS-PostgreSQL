import { Routes } from '@angular/router';
import { HomeComponent} from './account/home/home.component';

export const routes: Routes = [
    {path:"accounts/home",component:HomeComponent},
    {path:"accounts", redirectTo:"accounts/home",pathMatch:"full"},
    {path:"",redirectTo:"accounts/home",pathMatch:"full"}

];
