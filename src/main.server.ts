import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideServerRendering } from '@angular/platform-server';

export default function bootstrapServerApplication(context: any) {
  return bootstrapApplication(App, {
    ...appConfig,
    providers: [
      ...(appConfig.providers || []),
      provideServerRendering(), 
    ],
  }, context);
}