import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CheckboxFilterComponent } from './components/checkbox-filter/checkbox-filter.component';
import { ColumnFilterComponent } from './components/column-filter/column-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxFilterComponent,
    ColumnFilterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([CheckboxFilterComponent, ColumnFilterComponent])
  ],
  entryComponents: [
    CheckboxFilterComponent,
    ColumnFilterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
