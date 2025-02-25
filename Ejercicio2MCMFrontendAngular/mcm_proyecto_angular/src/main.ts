import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Suponiendo que tienes un componente raíz, por ejemplo AppComponent.
// Si no lo tienes, podrías usar el ProductoComponent como raíz temporalmente.
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(BrowserModule)]
}).catch(err => console.error(err));
