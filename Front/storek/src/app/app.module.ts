import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/sahred.module';
import { VestiModule } from './vesti/vesti.module';
import { LayoutComponent } from './layout/layout.component';
import { AuthModule } from './auth/auth.module';
import { LigeModule } from './lige/lige.module';
import { TimoviModule } from './timovi/timovi.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    VestiModule,
    AuthModule,
    LigeModule,
    TimoviModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
