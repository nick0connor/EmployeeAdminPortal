import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {provideRouter, withRouterConfig} from '@angular/router';
import routeConfig from './app/routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideProtractorTestingSupport(), 
    provideRouter(routeConfig, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideHttpClient()
  ],
}).catch((err) => console.error(err));
