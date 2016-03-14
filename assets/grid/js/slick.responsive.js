
  function DummyLinkFormatter(row, cell, value, columnDef, dataContext) {
    return '<a href="#">' + value + '</a>';
  }

  var columnsBasic = [
    {id: "title", name: "Title", field: "title", width: 200, formatter: DummyLinkFormatter},
    {id: "duration", name: "Duration", field: "duration", width: 100},
    {id: "%", name: "% Complete", field: "percentComplete", width: 100},
    {id: "start", name: "Start", field: "start", width: 150},
    {id: "finish", name: "Finish", field: "finish", width: 150},
    {id: "effort-driven", name: "Effort Driven", field: "effortDriven", width: 100}
  ];

 var columnsSortable = [
    {id: "title", name: "Title", field: "title", width: 200, sortable: true, formatter: DummyLinkFormatter},
    {id: "duration", name: "Duration", field: "duration", width: 100, sortable: true},
    {id: "%", name: "% Complete", field: "percentComplete", width: 100, sortable: true},
    {id: "start", name: "Start", field: "start", width: 100, sortable: true},
    {id: "finish", name: "Finish", field: "finish", width: 100, sortable: true},
    {id: "effort-driven", name: "Effort Driven", field: "effortDriven", width: 100, sortable: true}
  ];

  var dataFull = [];
  for (var i = 0; i < 2000; i++) {
    dataFull[i] = {
      id: 'id_' + i, // needed for DataView
      title: "Task " + i,
      duration: "5 days",
      percentComplete: Math.round(Math.random() * 100),
      start: "01/01/2009",
      finish: "01/05/2009",
      effortDriven: (i % 5 == 0)
    };
  }

  var columns;
  var data;

  // Example 1
  columns = columnsBasic.slice();
  data = dataFull.slice();

  $("#myGrid").slickgrid({
    columns: columns,
    data: data,
    slickGridOptions: {
      enableCellNavigation: true,
      enableColumnReorder: false,
      forceFitColumns: true,
      rowHeight: 35
    }
  });

  // Example 2: fewer rows, no vertical scrollbar
  columns = columnsBasic.slice();
  data = dataFull.slice().splice(0, 5);
  $("#grid2").slickgrid({
    columns: columns,
    data: data,
    slickGridOptions: {
      enableCellNavigation: true,
      enableColumnReorder: false,
      forceFitColumns: true,
      rowHeight: 35
    }
  });

  // Example 3: sortable, reorderable columns
  columns = columnsSortable.slice();
  data = dataFull.slice();
  $("#grid3").slickgrid({
    columns: columns,
    data: data,
    slickGridOptions: {
      enableCellNavigation: true,
      enableColumnReorder: true,
      forceFitColumns: true,
      rowHeight: 35
    },
    // handleCreate takes some extra options:
    sortCol: undefined,
    sortDir: true,
    handleCreate: function () {
      var o = this.wrapperOptions;

      // configure grid with client-side data view
      var dataView = new Slick.Data.DataView();
      var grid = new Slick.Grid(this.element, dataView,
        o.columns, o.slickGridOptions);

      // sorting
      var sortCol = o.sortCol;
      var sortDir = o.sortDir;
      function comparer(a, b) {
        var x = a[sortCol], y = b[sortCol];
        return (x == y ? 0 : (x > y ? 1 : -1));
      }
      grid.onSort.subscribe(function (e, args) {
          sortDir = args.sortAsc;
          sortCol = args.sortCol.field;
          dataView.sort(comparer, sortDir);
          grid.invalidateAllRows();
          grid.render();
      });

      // set the initial sorting to be shown in the header
      if (sortCol) {
          grid.setSortColumn(sortCol, sortDir);
      }

       // initialize the model after all the events have been hooked up
      dataView.beginUpdate();
      dataView.setItems(o.data);
      dataView.endUpdate();
      
      grid.resizeCanvas(); // XXX Why is this needed? A possible bug?
                           // If this is missing, the grid will have
                           // a horizontal scrollbar, and the vertical
                           // scrollbar cannot be moved. A column reorder
                           // action fixes the situation.
      
    }

  });

  // Example 4: Row selection
  columns = columnsSortable.slice();
  data = dataFull.slice();
  $("#grid4").slickgrid({
    columns: columns,
    data: data,
    slickGridOptions: {
      enableCellNavigation: true,
      enableColumnReorder: true,
      forceFitColumns: true,
      rowHeight: 35
    },
    // handleCreate takes some extra options:
    sortCol: undefined,
    sortDir: true,
    handleCreate: function () {
      var o = this.wrapperOptions;
    
      // checkbox column: add it
      var columns = o.columns.slice();
      var checkboxSelector = new Slick.CheckboxSelectColumn({});
      columns.unshift(checkboxSelector.getColumnDefinition());

      // configure grid with client-side data view
      var dataView = new Slick.Data.DataView();
      var grid = new Slick.Grid(this.element, dataView,
        columns, o.slickGridOptions);

      // selection model
      grid.setSelectionModel(new Slick.RowSelectionModel());
      grid.registerPlugin(checkboxSelector);

      // sorting
      var sortCol = o.sortCol;
      var sortDir = o.sortDir;
      function comparer(a, b) {
        var x = a[sortCol], y = b[sortCol];
        return (x == y ? 0 : (x > y ? 1 : -1));
      }
      grid.onSort.subscribe(function (e, args) {
          sortDir = args.sortAsc;
          sortCol = args.sortCol.field;
          dataView.sort(comparer, sortDir);
          grid.invalidateAllRows();
          grid.render();
      });

      // set the initial sorting to be shown in the header
      if (sortCol) {
          grid.setSortColumn(sortCol, sortDir);
      }

       // initialize the model after all the events have been hooked up
      dataView.beginUpdate();
      dataView.setItems(o.data);
      dataView.endUpdate();
      
      // if you don't want the items that are not visible (due to being filtered out
      // or being on a different page) to stay selected, pass 'false' to the second arg
      dataView.syncGridSelection(grid, true);

      grid.resizeCanvas(); // XXX Why is this needed? A possible bug?
                           // If this is missing, the grid will have
                           // a horizontal scrollbar, and the vertical
                           // scrollbar cannot be moved. A column reorder
                           // action fixes the situation.
      
    }

  });
