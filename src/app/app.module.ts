import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CheckboxFilterComponent } from './components/checkbox-filter/checkbox-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxFilterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([CheckboxFilterComponent])
  ],
  entryComponents: [
    CheckboxFilterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
