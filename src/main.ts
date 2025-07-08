import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
// Import provideRouter from @angular/router
import { provideRouter } from '@angular/router';

// Import your routes — adjust the path if needed
import { routes } from './app/app.routes';
if (environment.production) {
  enableProdMode();

  // Disable console methods in production
  console.log = function () {};
  console.info = function () {};
  console.warn = function () {};
  console.error = function () {};
  console.debug = function () {};
  console.trace = function () {};
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
