import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from './app/store/reducers/user.reducer';
import { UserEffects } from './app/store/effects/user.effects';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { userSearchReducer } from './app/store/reducers/user-search.reducer';
import { UserSearchEffects } from './app/store/effects/user-search.effects';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore({
      users:userReducer,
      userSearch:userSearchReducer
    }),
    provideEffects([UserEffects, UserSearchEffects]),
    provideHttpClient(),
],
});
