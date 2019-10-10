

  class YearFilter {
    eGui;
    rbAllYears;
    rbSince2010;
    filterActive;
    filterChangedCallback;
    valueGetter;
    onRbChanged = () => {
      this.filterActive = this.rbSince2010.checked;
      this.filterChangedCallback();
    }

    init = (params) => {
      this.eGui = document.createElement('div');
      this.eGui.innerHTML =
          '<div style="display: inline-block; width: 400px;">' +
          '<div style="padding: 10px; background-color: #d3d3d3; text-align: center;">' +
          'This is a very wide filter' +
          '</div>'+
          '<label style="margin: 10px; padding: 50px; display: inline-block; background-color: #999999">'+
          '  <input type="radio" name="yearFilter" checked="true" id="rbAllYears" filter-checkbox="true"/> All'+
          '</label>'+
          '<label style="margin: 10px; padding: 50px; display: inline-block; background-color: #999999">'+
          '  <input type="radio" name="yearFilter" id="rbSince2010" filter-checkbox="true"/> Since 2010'+
          '</label>' +
          '</div>';
      this.rbAllYears = this.eGui.querySelector('#rbAllYears');
      this.rbSince2010 = this.eGui.querySelector('#rbSince2010');
      this.rbAllYears.addEventListener('change', this.onRbChanged.bind(this));
      this.rbSince2010.addEventListener('change', this.onRbChanged.bind(this));
      this.filterActive = false;
      this.filterChangedCallback = params.filterChangedCallback;
      this.valueGetter = params.valueGetter;
    }

    getGui = () => {
      return this.eGui;
    }

    doesFilterPass = (params) => {
      return params.data.year >= 2010;
    }

    isFilterActive = () => {
      return this.filterActive;
    }

    getModel = function() {
      return {value: this.rbSince2010.checked};
    };

    setModel = function(model) {
      this.rbSince2010.checked = model.value;
    };
  }


// YearFilter.prototype.init = (params) => {
//   this.eGui = document.createElement('div');
//   this.eGui.innerHTML =
//       '<div style="display: inline-block; width: 400px;">' +
//       '<div style="padding: 10px; background-color: #d3d3d3; text-align: center;">' +
//       'This is a very wide filter' +
//       '</div>'+
//       '<label style="margin: 10px; padding: 50px; display: inline-block; background-color: #999999">'+
//       '  <input type="radio" name="yearFilter" checked="true" id="rbAllYears" filter-checkbox="true"/> All'+
//       '</label>'+
//       '<label style="margin: 10px; padding: 50px; display: inline-block; background-color: #999999">'+
//       '  <input type="radio" name="yearFilter" id="rbSince2010" filter-checkbox="true"/> Since 2010'+
//       '</label>' +
//       '</div>';
//   this.rbAllYears = this.eGui.querySelector('#rbAllYears');
//   this.rbSince2010 = this.eGui.querySelector('#rbSince2010');
//   this.rbAllYears.addEventListener('change', this.onRbChanged.bind(this));
//   this.rbSince2010.addEventListener('change', this.onRbChanged.bind(this));
//   this.filterActive = false;
//   this.filterChangedCallback = params.filterChangedCallback;
//   this.valueGetter = params.valueGetter;
// };

// YearFilter.prototype.onRbChanged = function () {
//   this.filterActive = this.rbSince2010.checked;
//   this.filterChangedCallback();
// };

// YearFilter.prototype.getGui = () => {
//   return this.eGui;
// };

// YearFilter.prototype.doesFilterPass = (params) => {
//   return params.data.year >= 2010;
// };

// YearFilter.prototype.isFilterActive = () => {
//   return this.filterActive;
// };

// YearFilter.prototype.getModel = function() {
//   return {value: this.rbSince2010.checked};
// };

// YearFilter.prototype.setModel = function(model) {
//   this.rbSince2010.checked = model.value;
// };

// this example isn't using getModel() and setModel(),
// so safe to just leave these empty. don't do this in your code!!!
// YearFilter.prototype.getModel = () => {};
// YearFilter.prototype.setModel = () => {};

