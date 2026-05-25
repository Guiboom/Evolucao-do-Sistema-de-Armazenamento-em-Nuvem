import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';

@NgModule({
  imports: [
    BrowserModule,
    App
  ],
  providers: [
    provideHttpClient() 
  ]
})
export class AppModule { }