import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from "./app.module";
import { environment } from "./environment";
import { enableProdMode } from "@angular/core";
if (environment.prod) {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
