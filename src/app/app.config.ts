import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { apiInterceptorInterceptor } from './core/services/api-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withInterceptors([apiInterceptorInterceptor]))]
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch())]
  
};
