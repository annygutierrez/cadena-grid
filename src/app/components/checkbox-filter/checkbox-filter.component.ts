import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AfterViewInit } from './after-view-init';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss']
})
export class CheckboxFilterComponent implements OnInit, AfterViewInit {
  @ViewChild('i', {static: false}) textInput;


  constructor() { }

  filter = '';
  params: any;

  ngAfterViewInit() {
    setTimeout(() => {
        this.textInput.nativeElement.focus();
    });
  }
  agInit(params: any): void {
    this.params = params;
  }

  ngOnInit() {
  }

  isFilterActive() {
    return this.filter !== '';
  }

  doesFilterPass(params) {
    console.log(params);
    console.log(this.filter);
    const filter = this.filter.split('-');
    const gt = Number(filter[0]);
    const lt = Number(filter[1]);
    const value = this.params.valueGetter(params.node);
    console.log('value', value);

    return value.startsWith(this.filter);
  }

  getModel() {
    return {filter: this.filter};
  }

  setModel(model) {
    this.filter = model ? model.filter : '';
  }

  onSubmit(event) {
    event.preventDefault();

    const filter = event.target.elements.filter.value;

    if (this.filter !== filter) {
      this.filter = filter;

      /* notify the grid about the change */
      this.params.filterChangedCallback();
    }
  }

}
