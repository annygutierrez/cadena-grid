import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { AfterViewInit } from './after-view-init';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss']
})
export class CheckboxFilterComponent {
  @ViewChild('i', {static: false}) textInput;

  form: FormGroup;
  ordersData = [];

  dataFilters = {
    status: [
      { id: 1, name: 'approved' },
      { id: 2, name: 'disabled' },
      { id: 3, name: 'created' },
      { id: 4, name: 'rejected' }
    ],
    role: [
      { id: 1, name: 'Usuario de consulta de entidad privada' },
      { id: 2, name: 'Administrador de usuarios cadena' },
      { id: 3, name: 'Registrador de certificados' },
      { id: 4, name: 'Aprobador de registros' },
      { id: 5, name: 'Usuario de consulta de entidad pública' }
    ]
  };

  filter = '';

  rejected = true;
  approved = true;
  disabled = true;
  created = true;
  params: any;
  valueGetter: any;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });
  }

  private addCheckboxes() {
    this.ordersData.forEach(() => {
      const control = new FormControl(true);
      (this.form.controls.orders as FormArray).push(control);
    });
  }


  get arrayOfOrders() {
    return (this.form.get('orders') as FormArray).controls;
  }


  // ngAfterViewInit() {
  //   setTimeout(() => {
  //       this.textInput.nativeElement.focus();
  //   });
  // }
  agInit(params: any): void {
    this.params = params;
    this.ordersData = this.dataFilters[params.colDef.field];
    this.addCheckboxes();
  }

  isFilterActive() {
    return (this.rejected !== false || this.approved !== false || this.disabled !== false || this.created !== false);
  }

  doesFilterPass(params) {
    const value = this.params.valueGetter(params.node);
    const valueOfControlers = this.form.get('orders').value;

    const checkedFilters = valueOfControlers.map((inputWord, i) => {
      if (inputWord === true) {
        return this.ordersData[i].name;
      }
    });

    let isInclude = false;
    checkedFilters.forEach(checkFilter => {
      if (value === checkFilter) {
        isInclude = true;
      }
    });

    return isInclude;
  }

  getModel() {
    return {filter: this.filter};
  }

  setModel(model) {
    this.filter = model ? model.filter : '';
  }

  onSubmit(event) {
    this.params.filterChangedCallback();
  }

}
