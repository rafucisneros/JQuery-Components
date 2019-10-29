var WindowsController = function(divContainer, barStylesParams={}, barEvents={}){
  this.activeWindow = null
  this.inactiveWindows = {}
  this.activeWindows = {} 
  this.container
  this.inactiveWindowsTabs
  
  constructor = function(){
    this.container = divContainer
    // Stak de ventanas inactivas ////////////////////////////
    this.inactiveWindowsTabs = $("<div>").attr("id", "minimizedWindows")
      .addClass("ui-widget")  // Clases Jquery-ui
    var defaultBarStyles = {
      height: "auto",
      width: "250px",
      position: "absolute",
      bottom: "0",
      left: "0",
      backgroundColor: "blue",
      zIndex: 10
    }
    // Configuramos los estilos que vienen como parametros
    addStyles(this.inactiveWindowsTabs, defaultBarStyles, barStylesParams)
    // Asignamos los eventos que vienen como parametros
    addEventHandlers(this.inactiveWindowsTabs, undefined, barEvents)    
    this.inactiveWindowsTabs
      .append(
        // Agregar el Header del stack
        $("<div>").html("Ventanas Ocultas")
        .addClass("ui-widget-header")  // Clases Jquery-ui   
        .css("display", "flex")
        .css("justifyContent", "center")
      )
      .append(
        // Agregar div para el stack
        $("<div>").attr("id", "tabs")  
        .addClass("ui-widget-content")  // Clases Jquery-ui  
        .css("display", "flex")
        .css("flexDirection", "column-reverse")
      )
      .css("zIndex", 101)
    $(this.container).append(this.inactiveWindowsTabs)
    // FIN Stack de ventanas inactivas ////////////////////////
  }.bind(this)()

  // Abrir nueva ventana 
  this.openNewWindow = function(content, title, configParam={}, stylesParam={}, eventsParams={}){
    // Creamos el ID que usaremos para el elemento
    var windowId = title.replace(/ /g, "")

    // Chequeamos si la ventana ya existe
    if ($("#" + windowId).length){
      // Si existe la abrimos
      this.reopenWindow(windowId)
    } else { // Si no existe creamos la ventana

      var newWindow = $("<div>").attr("id", windowId)
      // Si es texto normal
      // Merge de estilos default y parametros
      var defaultStyles = {
        position: "absolute",
        top: "50px",
        left: "50px",
        "width": "auto",
        "height": "auto",
        backgroundColor: "green",
        display: "flex",
        flexDirection: "column",
        transition: ".2s linear",
        willChange: "top, left, width, height"
      }
      // Merge de configuracion default y parametros
      var defaultConfig = {
        type: "form",
        draggable: true,
        resizable: true,
        minimizable: true,
        maximizable: true,
        title: true
      }
      var config = {}
      Object.assign(config, defaultConfig, configParam)

      var newWindow = $("<div>").attr("id", windowId)
        .addClass("ui-widget")  // Clases Jquery-ui
      // Configuramos los estilos que vienen como parametros y default
      addStyles(newWindow, defaultStyles, stylesParam)

      // Agregar el header de la ventana
      var $windowHeader = $("<div>").attr("id", "header")
        .addClass("ui-widget-header")  // Clases Jquery-ui
        .css("display", "flex")
        .css("flexDirection", "row-reverse")
        .css("alignItems", "center")
        .append(
          // Agregar boton para cerrar la ventana
          $("<p>").addClass("ui-icon ui-icon-closethick") // Clases Jquery-ui
            .on("click", function(ev){
              $("#" + ev.target.parentNode.parentNode.id).trigger("close");
            }.bind(this))
        )

      // Agregar boton para minimizar la ventana
      if(config.minimizable && config.type != "modal"){
        $windowHeader.append(
          $("<div>").addClass("ui-icon ui-icon-minus") // Clases Jquery-ui
            .on("click", function(ev){
              $("#" + ev.target.parentNode.parentNode.id).trigger("minimize")
            }.bind(this))
        )
      }
      // Agregar boton para Maximizar
      if(config.maximizable){
        $windowHeader.append(
          $("<div>").addClass("ui-icon ui-icon-arrow-4-diag") // Clases Jquery-ui
            .attr("id", "max")
            .on("click", function(ev){
              $("#" + ev.target.parentNode.parentNode.id).trigger("maximize")
            }.bind(this))
        )
      }
      // Agrega Titulo de la Ventana
      if(config.title){
        $windowHeader.append(
          $("<div>").html(title)
            .css("flex-grow", "1")
            .css("display", "flex")
            .css("justify-content", "center")
        )
      }
      // Agregar div para el contenido de la ventana
      var $windowContent = $("<div>").attr("id", "content")
        .addClass("ui-widget-content")  // Clases Jquery-ui
        .css("flexGrow", "1")   
        .css("padding", "2px")     
        .css("display", "flex")
        .css("justifyContent", "center")

      newWindow.append($windowHeader)
      newWindow.append($windowContent)
      newWindow.on("click", function(){
        this.activateWindow(windowId)
      }.bind(this))

      if(RegExp(/https?:\/{2}/).test(content)){
        // Si es una pagina
        $.ajax({
          url: content,
          dataType: "html",
          async: true,
          success: function(response){         
            var partialBody = response.substring(response.indexOf("<body") + 5)   
            $("#content", newWindow).html(partialBody.substring(partialBody.indexOf(">") + 1,
                                          partialBody.indexOf("</body>")))
            addInputStyles(newWindow[0].id + " #content")
          }.bind(this),
          error: function(err){
            $("#content", newWindow).html("Error al cargar el contenido.")
          }
        })
        $()
      } else {
        $("#content", newWindow).html(content)
      }

      // Configuracion de la ventana
      if(config.draggable){
        newWindow.draggable({containment: this.container})
      }
      if(config.resizable){
        newWindow.resizable({
          minHeight: "auto",
          minWidth: "auto"
        })
      }
      
      // Asignamos los eventos que vienen como parametros
      var defaultEvents = {
        close: function(ev){this.closeWindow(ev.target.id)}.bind(this),              
        minimize: function(ev){this.hideWindow(ev.target.id)}.bind(this),
        maximize: function(ev){
          var $element = $("#" + ev.target.id)
          $.data(ev.target, "sizes", {
            top: $element.css("top"),
            left: $element.css("left"),
            width: $element.css("width"),
            height: $element.css("height")
          })
          this.maximizeWindow(ev.target.id)
        }.bind(this),
        restore: function(ev){
          var sizes = $.data(ev.target, "sizes")
          this.restoreWindow(ev.target.id, sizes)
        }.bind(this)
      }
      addEventHandlers(newWindow, defaultEvents, eventsParams)

      if(config.type == "modal"){
        var $overlay = $("<div>")
          .css("position", "absolute")
          .css("top", 0)
          .css("left", 0)
          .css("right", 0)
          .css("bottom", 0)
          .css("background", "rgba(0,0,0,0.2)")
          .css("zIndex", 101)        
        $.data(newWindow[0], "type", "modal")
        $overlay.append(newWindow)
        $(this.container).append($overlay)
      } else {
        $.data(newWindow[0], "type", "form")
        $(this.container).append(newWindow)
      }

      // Colocamos la ventana como la ventana activa
      this.activeWindow = newWindow
      this.activateWindow(windowId)
      // Agregamos la ventana al arreglo de ventanas activas
      this.activeWindows[windowId] = newWindow  
      addInputStyles(windowId)
    }  
  }
  
  // Ocultar una ventana
  this.hideWindow = function(windowId){
    // Ocultar la ventana
    var $window = $("#"+windowId)
    if ($.data($window[0], "type") == "modal"){
      $window.parent().hide()
    } else {
      $.data($window[0], "position", {
        top: $window.css("top"),
        left: $window.css("left"),
      })
      $window.css("top", "100%")
      $window.css("left", "0%")
      // $window.hide()
    }


    // Agregar tab al stack de ventanas ocultas
    this.inactiveWindowsTabs.find("#tabs").append(
      $("<div>").attr("id", "tab" + windowId)
        .html(windowId).addClass("ui-widget-content") // Clases Jquery-ui
        .css("display", "flex")
        .css("justify-content", "center")
        .css("align-items", "center")
        // Abrir la ventana
        .on("click", function(){   
          this.reopenWindow(windowId)
        }.bind(this))
    )

    // Elimino la ventana de las ventanas activas
    delete this.activeWindows[windowId]
    // Agrego la ventana a las ventanas inactivas
    this.inactiveWindows[windowId] = $window
  }

  // Reabrir una ventana oculta
  this.reopenWindow = function(windowId){
    var $elem = $("#" + windowId, "body")
    if ($.data($elem[0], "type") == "modal") {
      $elem.parent().show()
    } else {
      var position = $.data($elem[0], "position")
      $elem.css("top", position.top)
      $elem.css("left", position.left)
      $elem.show()
    }
    this.inactiveWindowsTabs.find("#tabs").find("#tab" + windowId).remove()
    delete this.inactiveWindows[windowId]
    this.activateWindow(windowId)    
    // Agregamos la ventana al arreglo de ventanas activas
    this.activeWindows[windowId] = $("#" + windowId, "body")
  }

  // Colocar una ventana como activa
  this.activateWindow = function(windowId){
    var $element = $("#" + windowId)
    var zIndex = 1
    Object.values(this.activeWindows).map(      
      function($element){
        $element.css("zIndex", zIndex++); 
      }
    )
    $element.css("zIndex", "100")
    if(this.activeWindows[windowId]){
      // Reinserto el elemento para mantener el orden de las ventanas
      delete this.activeWindows[windowId]
      this.activeWindows[windowId] = $element
    }
    // Colocamos la ventana como la ventana activa
    this.activeWindow = $element
  }

  // Cerrar una Ventana
  this.closeWindow = function(windowId){
    var $elem = $("#" + windowId)
    if ($.data($elem[0], "type") == "modal"){
      $elem.parent().remove()
    } else {
      $elem.css("width", 0)
      $elem.css("height", 0)
      $elem.css("overflow", "hidden")
      setTimeout(function(){
        $elem.remove()
      }, 1000)
    }
    $("#" + windowId, "#tabs", "#minimizedWindows").remove()
    delete this.inactiveWindows[windowId]
    delete this.activeWindows[windowId]
  }

  this.maximizeWindow = function(windowId){
    var $element = $("#" + windowId)
    $element
      // .css("right", 0)
      .css("left", 0)
      // .css("bottom", 0)
      .css("top", 0)
      .css("width", "100%")
      .css("height", "100%")
    this.activateWindow(windowId)
    $("#max", $element).replaceWith(
      $("<div>").attr("id", "min")
        .addClass("ui-icon ui-icon-newwin") // Clases Jquery-ui
        .on("click", function(){
          $element.trigger("restore")
        })
    )
  }

  this.restoreWindow = function(windowId, sizes={}){
    var $element = $("#" + windowId)
    $("#min", $element).replaceWith(
      $("<div>").attr("id", "max")
        .addClass("ui-icon ui-icon-arrow-4-diag") // Clases Jquery-ui
        .on("click", function(ev){
          $("#" + ev.target.parentNode.parentNode.id).trigger("maximize")
        }.bind(this))
    )
    $element
      .css("top", sizes.top)
      .css("left", sizes.left)
      .css("width", sizes.width)
      .css("height", sizes.height)
  }
}



var windowsController = new WindowsController("body")
windowsController.openNewWindow("<div>Contenido1</div>", "ventana 1",{resizable: false}, {backgroundColor: "grey"}, {
 "minimize": function(ev){console.log("minimizando"); if(true) {ev.stopImmediatePropagation()}}
})
windowsController.openNewWindow("<div>Contenido2</div>", "ventana 2",undefined, {backgroundColor: "cyan"})
windowsController.openNewWindow("<div>Contenido3</div>", "ventana 3",{})
windowsController.openNewWindow("<div>Contenido4</div>", "ventana 4", undefined, {backgroundColor: "orange"}, 
{"close": function(ev){console.log("cerrando");},  
 "resize": function(){console.log("resize")}, 
 "maximize": function(){console.log("maximizando")},
 "restore": function(){console.log("restaurando")}
})

windowsController.openNewWindow("http://localhost:3000/popUps.html", "ventana 5", {type: "form"}, 
  {backgroundColor: "orange"})