declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

import { Component } from '@angular/core';
import { CheckboxFilterComponent } from './components/checkbox-filter/checkbox-filter.component';
import { Papa } from 'ngx-papaparse';
// import YearFilter from './stringExtensions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  private gridApi;

    columnDefs = [
        {
          headerName: 'USER',
          field: 'user',
          width: 140,
          cellStyle: {
            fontWeight: 'bold',
            color: '#333333'
          },
          filter: 'agTextColumnFilter',
          filterParams: { applyButton: false, clearButton: false },
          headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
          // checkboxSelection: (params) => {
          //   return params.node.group === true;
          // }
        },
        {headerName: 'NAME AND LAST NAME', field: 'name', filter: 'agTextColumnFilter',
        filterParams: { applyButton: true, clearButton: true } },
        {headerName: 'ROLE', field: 'role', width: 340, filter: 'checkboxFilterComponent'},
        {headerName: 'STATUS', field: 'status', cellRenderer: (params) => {
          // console.log(params);
          // check the data exists, to avoid error
          if (params.value === 'approved') {
              // data exists, so we can access it
              return '<div>' + '<span style="background-color: #27ae60; padding: 0.6em 1.2em; border-radius: 20px; color: white">' + params.data.status + '</span>' + '</div>';
          } else if (params.value === 'created') {
              // when we return null, the grid will display a blank cell
              return '<div>' + '<span style="background-color: #f2c94c; padding: 0.6em 1.2em; border-radius: 20px; color: white">' + params.data.status + '</span>' + '</div>';
          } else if (params.value === 'disabled') {
            // when we return null, the grid will display a blank cell
            return '<div>' + '<span style="background-color: #BDBDBD; padding: 0.6em 1.2em; border-radius: 20px; color: white">' + params.data.status + '</span>' + '</div>';
        } else if (params.value === 'rejected') {
          // when we return null, the grid will display a blank cell
          return '<div>' + '<span style="background-color: #eb5757; padding: 0.6em 1.2em; border-radius: 20px; color: white">' + params.data.status + '</span>' + '</div>';
      }
      },
      // valueGetter: () => ['approved', 'disabled', 'created', 'rejected'],
      filter: 'checkboxFilterComponent'
      // filter: YearFilter
    },
      {headerName: '', field: 'more', cellRenderer: (params) => {
        // console.log(params);
            return '<div>' + '<span style="color: #333333; font-weight: bold; cursor: pointer">' + 'Ver mas' + '</span>' + '</div>';
        }
      }
    ];

    frameworkComponents = {
      /* custom filtering component */
      checkboxFilterComponent: CheckboxFilterComponent,
    };

    constructor(private papa: Papa) {
      // const csvData = '"Hello","World!"';

      // this.papa.parse(csvData, {
      //     complete: (result) => {
      //         console.log('Parsed: ', result);
      //     }
      // });
  }

    irishAthletes() {
      return [
          'approved',
          'rejected',
          'created',
          'disabled'
      ];
    }

    myAlert() {
      alert('ver mas');
    }

    onCellClicked($event) {
      // console.log($event);
      if ($event.colDef.field === 'more') {
        alert('MORE ABOUT: ' + $event.data.name);
      }
    }

    onGridReady(params) {
      this.gridApi = params.api;
      // this.gridColumnApi = params.columnApi;
    }

    onBtExport() {
      const params = {
        // skipHeader: getBooleanValue("#skipHeader"),
        // columnGroups: getBooleanValue("#columnGroups"),
        // skipFooters: getBooleanValue("#skipFooters"),
        // skipGroups: getBooleanValue("#skipGroups"),
        // skipPinnedTop: getBooleanValue("#skipPinnedTop"),
        // skipPinnedBottom: getBooleanValue("#skipPinnedBottom"),
        // allColumns: getBooleanValue("#allColumns"),
        // onlySelected: getBooleanValue("#onlySelected"),
        onlySelected: true
        // suppressQuotes: getBooleanValue("#suppressQuotes"),
        // fileName: document.querySelector("#fileName").value,
        // columnSeparator: document.querySelector("#columnSeparator").value
      };
      // if (getBooleanValue("#skipGroupR")) {
      //   params.shouldRowBeSkipped = function(params) {
      //     return params.node.data.country.charAt(0) === "R";
      //   };
      // }
      // if (getBooleanValue("#useCellCallback")) {
      //   params.processCellCallback = function(params) {
      //     if (params.value && params.value.toUpperCase) {
      //       return params.value.toUpperCase();
      //     } else {
      //       return params.value;
      //     }
      //   };
      // }
      // if (getBooleanValue("#useSpecificColumns")) {
      //   params.columnKeys = ["country", "bronze"];
      // }
      // if (getBooleanValue("#processHeaders")) {
      //   params.processHeaderCallback = function(params) {
      //     return params.column.getColDef().headerName.toUpperCase();
      //   };
      // }
      // if (getBooleanValue("#customHeader")) {
      //   params.customHeader = "[[[ This ia s sample custom header - so meta data maybe?? ]]]\n";
      // }
      // if (getBooleanValue("#customFooter")) {
      //   params.customFooter = "[[[ This ia s sample custom footer - maybe a summary line here?? ]]]\n";
      // }
      const dataCSV = this.gridApi.getDataAsCsv(params);
      // const csvData = '"Hello","World!"';

      let parsedResult;

      this.papa.parse(dataCSV, {
          complete: (result) => parsedResult = result.data
      });

      const columns = parsedResult[0];

      const rows = parsedResult.slice(1, -1);

      const doc = new jsPDF('l', 'pt');
      doc.autoTable(columns, rows); // typescript compile time error
      doc.save('table.pdf');
      console.log(dataCSV);

    // downloadPDF() {

    //   let columns = ["ID", "Name", "Country"];
    //   let rows = [
    //       [1, "Shaw", "Tanzania"],
    //       [2, "Nelson", "Kazakhstan"],
    //       [3, "Garcia", "Madagascar"],
    //   ];

    //   let doc = new jsPDF('l', 'pt');
    //   doc.autoTable(columns, rows); // typescript compile time error
    //   doc.save('table.pdf');
    //   }
  }
    // defaultColDef = {
      // set every column width
      // width: 280
      // make every column editable
      // editable: true,
      // make every column use 'text' filter by default
      // filter: 'agTextColumnFilter'
    // };

    // gridOptions = {
    //   rowClassRules: {
        // row style function
        // 'sick-days-warning': function(params) {
        //     var numSickDays = params.data.sickDays;
        //     return  numSickDays > 5 && numSickDays <= 7;
        // },
        // row style expression
    //         'sick-days-breach': "data.status === 'approved'"
    //     }
    // };

    rowData = [
        { user: 'agutierrez', role: 'Usuario de consulta de entidad privada', name: 'Andrea Gutierrez', status: 'approved' },
        { user: 'ccarrillo', role: 'Administrador de usuarios Cadena', name: 'Carlos Carrillo', status: 'approved' },
        { user: 'chenao', role: 'Registrador de certificados', name: 'Chela Naori', status: 'disabled' },
        { user: 'lleopardi', role: 'Aprobador de registros', name: 'Leonardo Leopardi', status: 'created' },
        { user: 'epacheco', role: 'Usuario de consulta de entidad pública', name: 'Elias Pacheco', status: 'created' },
        { user: 'macosta', role: 'Usuario de consulta de entidad pública', name: 'Elias Pacheco', status: 'rejected' },
        { user: 'dhuaman', role: 'Usuario de consulta de entidad privada', name: 'Diego Huaman', status: 'created' },
        { user: 'jeijei', role: 'Usuario de consulta de entidad pública', name: 'Jevert Jahawanca', status: 'approved' },
        { user: 'projas', role: 'Registrador de certificados', name: 'Peter Rojas', status: 'approved' },
        { user: 'rbennet', role: 'Usuario de consulta de entidad privada', name: 'Rebeca Bennet', status: 'approved' }
    ];
}
