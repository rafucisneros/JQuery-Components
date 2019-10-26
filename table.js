// REQUIERE UTILITARIOS.JS
var table = function(divContainer, src, configParam={}, styles={}, events={}, rowEvents={}){
  // Atributos
  this.$element = $("#" + divContainer)
  this.source = src
  this.filteringFields = {}
  this.sortingFields = {}
  this.tableFiltered = []
  this.tableContent
  this.page
  this.pageCount
  this.columns
  this.URLsort
  this.URLfilter
  this.config = {}

  // Metodos
  // Funcion para dibujar el contenido de la tabla (el tbody)
  this.drawContent = function(){
    // Busco el body de la tabla
    var $tbody = $("#divTable tbody", this.$element)
    // Limpio la tabla
    $tbody.html("")

    var content = this.tableFiltered

    // Calculamos la cantidad de paginas
    
    // Si tengo paginacion y el src no es webservice
    if(this.page && !RegExp(/https?:\/{2}/).test(src)){
      // Calculamos la pagina
      this.pageCount = Math.ceil(content.length / this.config.pageSize)
      var start = (this.page - 1) * this.config.pageSize
      var end = start + this.config.pageSize
      content = this.tableFiltered.slice(start, end)
    }

    var idRef = 0
    content.forEach(function(row){
      var $row = $("<tr>")
        .addClass("tr_" + idRef++)
      this.columns.forEach(function(key){
        var $td = $("<td>")
        $row.append(
          $td.html(row[key]).attr("id", key)
        )
      }.bind(this))
      // Columna de iconos
      var $tools = $("<th>").css("display", "flex")

      if (this.config.editable){
        // Icono para editar      
        $tools.append(
          $("<img>")
            .attr("src", "statics/images/icons8-editar-48.png")
            .attr("id", "imgEditar")
            .css("height", "30px")
            .on("click", function(){$(this).parent().parent().trigger("edit")})
        )
        // Icono para guardar
        .append(
          $("<img>")
            .attr("src", "statics/images/icons8-guardar-26.png")
            .attr("id", "imgGuardar")
            .css("height", "30px")
            .css("display", "none")
            .on("click", function(){$(this).parent().parent().trigger("update")})
        )
        $row.on("edit", function(){
          var td = $(this).attr("class")
          $("." + td + " #imgEditar").hide()
          $("." + td + " #imgGuardar").show()
        })
        $row.on("update", function(){
          var td = $(this).attr("class")
          $("." + td + " #imgEditar").show()
          $("." + td + " #imgGuardar").hide()
        })
      }    
      if (this.config.deletable){
        // Icono para eliminar
        $tools.append(
          $("<img>")
            .attr("src", "statics/images/icons8-eliminar-100.png")
            .css("height", "30px")
            .on("click", function(){$(this).parent().parent().trigger("delete")})
        )
        $row.on("delete", function(){
          var td = $(this).attr("class")
          $("." + td).remove()
        })
      }
      if (this.config.deletable || this.config.editable){
        $row.append($tools)
      }

      // Agregar la fila al body de la tabla
      addEventHandlers($row, {}, rowEvents)
      $tbody.append($row)
    }.bind(this))
    // Paginacion
    if (this.page){
      $("#pagination").remove()
      var $pageButton = $("<div>").attr("id","pagination")
        .css("display", "flex")
        .css("justify-content", "space-between")
      // Boton Pagina Atras
      $pageButton.append(
        $("<button>").addClass("btn btn-primary").html("Previous Page")
          .on("click", function(){
            if (this.page > 1){
              this.page--
              if(RegExp(/https?:\/{2}/).test(src)){
                this.getContentFromURL(this.source, this.page, this.URLsort, this.URLfilter)
              } 
              this.drawContent()
            } else {
              alert("No se puede retroceder mas.")
            }
          }.bind(this))
      )
      // Pagina Actual
      $pageButton.append(
        $("<p>").attr("id", "actualPage").html("Pagina actual: " + this.page + " de " + this.pageCount)
      )
      // Ir a pagina especifica
      $pageButton.append(
        $("<div>")
          .css("display", "flex")
          .append(
            $("<button>").addClass("btn btn-primary").html("Ir a pagina: ")
              .css("marginRight", "5px")
              .on("click", function(){
                var value = $("#page", $pageButton).val()
                if (value > 0 && value <= this.pageCount){
                  this.page = $("#page", $pageButton).val()
                  if(RegExp(/https?:\/{2}/).test(src)){
                    this.getContentFromURL(this.source, this.page, this.URLsort, this.URLfilter)
                  } 
                  this.drawContent()
                } else {
                  alert("Valor " + value + " fuera de rango.")
                }
              }.bind(this))
          )
          .append(
            $("<input>")
              .attr("id", "page")
              .attr("type", "number")
              .attr("min", 1)
              .attr("max", this.pageCount)
              .attr("value", this.page)
          )
        )
      // Boton Pagina Adelante
      $pageButton.append(
        $("<button>").addClass("btn btn-primary").html("Next Page")
          .on("click", function(){
            if (this.page < this.pageCount){
              this.page++
              if(RegExp(/https?:\/{2}/).test(src)){
                this.getContentFromURL(this.source, this.page, this.URLsort, this.URLfilter)
              } 
              this.drawContent()
            } else {
              alert("No se puede avanzar mas")
            }
          }.bind(this))
      )      
      $pageButton.appendTo(this.$element)
    }
  }
  // Funcion para obtener el contenido de la tabla de una URL
  this.getContentFromURL = function(url, page=false, sort=false, filter=false){
    var data = {pageSize: this.config.pageSize}
    if(page){
      data["page"] = page
    } 
    if(sort){
      Object.assign(data, data, sort)
    }
    if(filter){
      Object.assign(data, data, filter)
    }
    //
    var result
    // Overlay mientras se carga la pagina NO FUNCIONA AHORITA
    $("body").append(
      $("<div>")
        .css("position", "absolute")
        .css("right" , 0)
        .css("left" , 0)
        .css("bottom" , 0)
        .css("top" , 0)
        .css("background", "rgba(0,0,0,0.3)")
        .attr("id", "overlay")
    )
    
    $.ajax({
      url: url, 
      data: data,
      success: function(response){
        this.tableFiltered = response["data"]
        this.pageCount = response["pageCount"]
        $("body #overlay").remove()
        result = response["data"]
      }.bind(this),
      async: false,
      error: function(){
        alert("No se pudo cargar el contenido.")
      }
    })
    return result
  }
  //////////////////// CONSTRUCTOR
  var constructor = function(){
    this.$element.append(
      $("<div>").attr("id", "divTable")
        .css("marginBottom", "5px")
    )
    var defaultConfig = {
      page: false,
      pageSize: 20,
      deletable: false,
      editable: false,
      sortable: false, // false | "all" | [...sortable fields]
      filterable: false // false | "all" | [...filterable fields]
    }
    Object.assign(this.config, defaultConfig, configParam)
    this.page = this.config.page  
  
    // Chequeamos si la entrada es un url
    if(RegExp(/https?:\/{2}/).test(src)){
      this.tableContent = this.getContentFromURL(src, this.page)
    } else {
      this.tableContent = src
      this.tableFiltered = src
      this.pageCount = Math.ceil(src.length / this.config.pageSize)
    }
  
    if (this.tableContent.length > 0){
      // Creamos la Tabla
      var $table = $("<table>")
        .css("backgroundColor", "white")
        .addClass("table table-bordered table-hover") //table-striped 
      $("#divTable", this.$element).append($table)
      // Agregamos estilos
      var defaultStyles = {
        width: "100%"
      }
      addStyles(this.$element, defaultStyles, styles)
  
      // Sacamos las columnas de la tabla
      this.columns = Object.keys(this.tableContent[0])
      // Table Header
      var $tableHead = $("<thead>")
      var $headRow = $("<tr>")
      // Generar el Header de la tabla
      this.columns.forEach(function(key){
        var $filterInput = $("<input>")
        var $th = $("<th>").html(key)
        // Ordenamiento
        if (this.config.sortable && (this.config.sortable === "all" || this.config.sortable.includes(key))){
          $th.append(
            // Icono para ordenar ascendente
            $("<span>").append($("<img>")
               .attr("src", "statics/images/icons8-gruesa-flecha-apuntando-hacia-arriba-24.png")
               .css("height", "10px")
              )
              .on("click", function(){
                this.sortContent(key, "ASC")
              }.bind(this))
          )
          .append(
            // Icono para ordenar descendente
            $("<span>").append($("<img>")
                .attr("src", "statics/images/icons8-gruesa-flecha-apuntando-hacia-abajo-24.png")
                .css("height", "10px")
              )
              .on("click", function(){
                this.sortContent(key, "DESC")
              }.bind(this))
          )
        }
        // Filtrado
        if (this.config.filterable && (this.config.filterable === "all" || this.config.filterable.includes(key))){
          $th.append(   
            // Input para filtrar         
            $filterInput.on("blur", function(){
              this.filterContent(key, $filterInput.val())
            }.bind(this))
          )
        }            
        $headRow.append($th)
      }.bind(this))
      // Columna de utilidades
      if(this.config.editable || this.config.deletable) {
        $headRow.append(
          $("<th>").append($("<img>")
            .attr("src", "statics/images/icons8-caja-de-almacenamiento-de-herramientas-completa-50.png"))
        )
      }
  
      $tableHead.append($headRow)
      $table.append($tableHead)
      // Table Body
      $table.append($("<tbody>"))
      this.drawContent()
      
      // Fixed Header
      $("#divTable", this.$element)
        .css("overflow", "auto")
        .css("maxHeight", "90vh")
      $table.clone(true).css("marginBottom", "0").appendTo($("#divTable", this.$element))      
      $("table:nth-child(1)", this.$element)
        .css("position", "sticky")
        .css("top", "0")
        .css("marginBottom", "0")
      $("table:nth-child(1) tbody", this.$element)
        .css("visibility", "collapse")
        $("table:nth-child(2) thead", this.$element)
        .css("visibility", "collapse")
  
      // Asignamos los eventos que vienen como parametros
      addEventHandlers(this.$element, undefined, events)
    }
    /////////////////// FIN CONSTRUCTOR
  }.bind(this)() // Ejecutar el constructor  

  // Funcion para filtrar contenido 
  this.filterContent = function(field, filterValue){
    // Si no tenemos paginacion | tengo paginacion pero el src es arreglo
    if(!this.page || (this.page && !RegExp(/https?:\/{2}/).test(src))){
      this.tableFiltered = this.tableContent
      // Agregamos el campo actual al diccionario de filtros
      this.filteringFields[field] = filterValue
      var fields = Object.keys(this.filteringFields)
      // Filtramos por cada campo
      fields.forEach(function(_field){
        this.tableFiltered = this.tableFiltered.filter( function(row){
          if (row[_field].toString().toLowerCase().search(this.filteringFields[_field].toString().toLowerCase()) != -1) {
            return true
          } else {
            return false
          }
        }.bind(this))
      }.bind(this))
    } else {
      // Si tengo page es un webservice
      this.page = 1
      this.URLfilter = {filterField: field, filterValue: filterValue}
      this.tableFiltered = this.getContentFromURL(this.source, this.page, this.URLsort, this.URLfilter)
    }
    this.drawContent()  
  }

  // Funcion para ordenar por columna
  this.sortContent = function(field, direction="ASC"){
    if(!this.page || (this.page && !RegExp(/https?:\/{2}/).test(src))){
      this.sortingFields = {}
      this.sortingFields[field] = direction
  
      this.tableFiltered.sort((a,b)=>{
        if (this.sortingFields[field] == "ASC"){ 
          // Orden Ascendente
          if( a[field] < b[field] ){
            return -1
          } else {
            return 1
          }
        } else {
          // Orden Descendente
          if( a[field] > b[field] ){
          return -1
          } else {
          return 1
          }
        }
      })
    } else {
      // Si tengo page es un webservice
      this.page = 1
      this.URLsort = {sortField: field, sortDirection: direction}
      this.tableFiltered = this.getContentFromURL(this.source, this.page, this.URLsort, this.URLfilter)
    }
    this.drawContent()
  }
}

// var testArray = 
// [{"id":1,"first_name":"Winna","last_name":"Hrinchishin","email":"whrinchishin0@jigsy.com","gender":"Female","ip_address":"151.237.172.205"},
// {"id":2,"first_name":"Jasmin","last_name":"Pregel","email":"jpregel1@trellian.com","gender":"Female","ip_address":"52.45.131.80"},
// {"id":3,"first_name":"Jammal","last_name":"Goggin","email":"jgoggin2@liveinternet.ru","gender":"Male","ip_address":"238.22.97.248"},
// {"id":4,"first_name":"Erie","last_name":"Fugere","email":"efugere3@engadget.com","gender":"Male","ip_address":"114.100.170.17"},
// {"id":5,"first_name":"Hermine","last_name":"Proffer","email":"hproffer4@globo.com","gender":"Female","ip_address":"124.157.12.205"},
// {"id":6,"first_name":"Massimo","last_name":"Tremathack","email":"mtremathack5@elpais.com","gender":"Male","ip_address":"98.227.149.180"},
// {"id":7,"first_name":"Walsh","last_name":"Penman","email":"wpenman6@google.de","gender":"Male","ip_address":"116.190.210.219"},
// {"id":8,"first_name":"Ammamaria","last_name":"Shotboult","email":"ashotboult7@mashable.com","gender":"Female","ip_address":"101.114.117.164"},
// {"id":9,"first_name":"Edmon","last_name":"O'Shiels","email":"eoshiels8@nature.com","gender":"Male","ip_address":"150.126.222.244"},
// {"id":10,"first_name":"Welch","last_name":"Kienl","email":"wkienl9@acquirethisname.com","gender":"Male","ip_address":"58.16.173.74"},
// {"id":11,"first_name":"Carly","last_name":"MacCleay","email":"cmaccleaya@diigo.com","gender":"Female","ip_address":"65.112.77.94"},
// {"id":12,"first_name":"Selestina","last_name":"Joliffe","email":"sjoliffeb@xing.com","gender":"Female","ip_address":"64.166.28.87"},
// {"id":13,"first_name":"Gaylor","last_name":"Spellworth","email":"gspellworthc@prnewswire.com","gender":"Male","ip_address":"58.204.144.199"},
// {"id":14,"first_name":"Ashly","last_name":"Vashchenko","email":"avashchenkod@intel.com","gender":"Female","ip_address":"160.120.192.204"},
// {"id":15,"first_name":"Marylinda","last_name":"Rizzi","email":"mrizzie@latimes.com","gender":"Female","ip_address":"232.186.77.199"},
// {"id":16,"first_name":"Link","last_name":"Genty","email":"lgentyf@histats.com","gender":"Male","ip_address":"147.203.8.175"},
// {"id":17,"first_name":"Catarina","last_name":"Steadman","email":"csteadmang@adobe.com","gender":"Female","ip_address":"5.242.152.77"},
// {"id":18,"first_name":"Jasen","last_name":"Tash","email":"jtashh@unesco.org","gender":"Male","ip_address":"121.220.73.238"}]
// var table = new table("table", testArray, {page: 1, pageSize: 7, filterable: "all", "sortable": "all"},

// var table = new table("table", "http://localhost:52391/api/users/getUsers", {page: 1},
// var table = new table("table", "http://localhost:3000", {page: 1},
var table = new table("table", "http://localhost:3000", {page:1, pageSize: 20,sortable:"all", filterable:"all", editable:true, deletable:true},
// var table = new table("table", "http://localhost:3000", undefined,
  undefined, undefined, 
  {"dblclick": ()=>{alert("doble click")}, "delete": ()=>{alert("Borrando")}, "edit": ()=>{alert("Editando")} , "update": ()=>{alert("guardando")}  })
  // {"dblclick": ()=>{alert("doble click")}, "delete": function(){console.log(this); alert("Borrando")}})