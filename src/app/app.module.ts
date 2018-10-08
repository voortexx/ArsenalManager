import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { SinglePlayerComponent } from './player-list/single-player/single-player.component';
import { PlayerFormComponent } from './player-list/player-form/player-form.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PlayerService } from './services/player.service';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'player', canActivate: [AuthGuardService], component: PlayerListComponent },
  { path: 'player/new', canActivate: [AuthGuardService], component: PlayerFormComponent },
  { path: 'player/view/:id', canActivate: [AuthGuardService], component: SinglePlayerComponent },
  { path: '', redirectTo: 'player', pathMatch: 'full' },
  { path: '**', redirectTo: 'player' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PlayerListComponent,
    SinglePlayerComponent,
    PlayerFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, PlayerService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
