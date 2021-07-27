import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfig, APP_CONFIG, Environment } from './app/app.config';

fetch('/config/config.json')
  .then((response) => response.json())
  .then((config: AppConfig) => {
    if (
      [Environment.Production, Environment.Staging].includes(config.environment)
    ) {
      enableProdMode();
    }

    platformBrowserDynamic([{ provide: APP_CONFIG, useValue: config }])
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  });
