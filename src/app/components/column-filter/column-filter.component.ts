import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss']
})
export class ColumnFilterComponent {

  @ViewChild('i', {static: false}) textInput;
  private gridColumnApi;
  form: FormGroup;
  ordersData = [
    { id: 1, name: 'status', show: true },
    { id: 2, name: 'role', show: true },
    { id: 3, name: 'user', show: true },
    { id: 4, name: 'name', show: true }
  ];

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
    console.log('column ---- filter', params);
    this.gridColumnApi = params.column.columnApi;
    this.params = params;
    this.addCheckboxes();
  }

  showState(columnName, position) {

    this.ordersData[position].show = !this.ordersData[position].show;

    this.gridColumnApi.setColumnVisible(columnName, this.ordersData[position].show);
  }

  isFilterActive() {
    return (this.rejected !== false || this.approved !== false || this.disabled !== false || this.created !== false);
  }

  doesFilterPass(params) {
    console.log('does filter pass', params);
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
    // this.params.filterChangedCallback();

  }

}
