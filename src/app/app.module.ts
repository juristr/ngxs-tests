import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
// import { StoreModule, MetaReducer } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';

// not used in production
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { storeFreeze } from 'ngrx-store-freeze';

// this would be done dynamically with webpack for builds
import { environment } from '../environments/environment';

// export const metaReducers: MetaReducer<any>[] = !environment.production
//   ? [storeFreeze]
//   : [];

// bootstrap
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // StoreModule.forRoot({}, { metaReducers }),
    NgxsModule.forRoot([]),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    })
    // EffectsModule.forRoot([]),
    // environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
