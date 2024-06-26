import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './features/user/pages/profile-page/profile-page.component';
import { HomePageComponent } from './features/chirrup/pages/home-page/home-page.component';
import { LikedPageComponent } from './features/chirrup/pages/liked-page/liked-page.component';
import { SettingsPageComponent } from './features/user/pages/settings-page/settings-page.component';
import { LoginWindowComponent } from './features/user/components/login-window/login-window.component';
import { AdminPanelComponent } from './features/admin/components/admin-panel/admin-panel.component';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginWindowComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'liked', component: LikedPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
