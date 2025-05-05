import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { cartReducer } from './state/cart/cart.reducer';
import { CartEffects } from './state/cart/cart.effects';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ cart: cartReducer }),
    EffectsModule.forRoot([CartEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }