import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideClientHydration(), 
  ],
}).catch((err) => console.error(err));
