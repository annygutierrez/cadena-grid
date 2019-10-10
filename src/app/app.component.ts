import { Component } from '@angular/core';
import { CheckboxFilterComponent } from './components/checkbox-filter/checkbox-filter.component';
// import YearFilter from './stringExtensions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

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
          filterParams: { applyButton: false, clearButton: false }
        },
        {headerName: 'NAME AND LAST NAME', field: 'name', filter: 'agTextColumnFilter',
        filterParams: { applyButton: true, clearButton: true } },
        {headerName: 'ROLE', field: 'role', width: 340, filter: 'agTextColumnFilter',
        filterParams: { applyButton: true, clearButton: true }},
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
