import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing';
import { TesteComponent } from './screens/teste/teste.component';

@NgModule({
  declarations: [
    AppComponent,
    TesteComponent,
 
   
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
