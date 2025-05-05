import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ParentComponent } from 'parent/parent.component';
import { ChildComponent } from './child/child.component';
import { ImmutabilityPipe } from './shared/immutability.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    ImmutabilityPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }