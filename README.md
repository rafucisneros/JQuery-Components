# Componentes

Libreria de componentes HTML construidos 100% usando JQuery, Jquery-ui y Bootstrap. Incluye los siguientes componentes:
* ## DataTable:
Componente que genera una tabla HTML a partir de un array o el resultado de un webservice. Incluye soporte para: habilitar y deshabilitar operaciones CRUD dentro de la tabla, configurables a traves de eventos (create, delete, edit, update); habilitar y deshabilitar ordenamiento y filtrados de datos (por igualdad); realizar paginación (debe ser soportado por el webservice).

![Table Demo](images/demoTable.png)

* ## ComboBox:
Componente que crea un elemento HTML select con opciones provenienes de un Json o del resultado de un webservice.

![ComboBox Demo](images/demoCbo.png)

* ## Windows Controller:
Componente que crea un manejador para controlar de manera programable distintas ventanas con comportamiento configurable como minimizar, maximizar, restaurar, ajustar tamaño.
El contenido de la ventana puede ser un string con formato HTML o una página web.

![Windows Controller Demo](images/demoWindowController.png)

### Servidor de Pruebas

El repositorio incluye un servidor sencillo de Express.js que implementa un webservice para la demostración de la tabla. Se ejecuta con los siguientes comandos luego de descargar el repositorio:
* cd testing-server
* npm install (solo la primera vez) 
* npm start

# Manual de uso de los componentes

## DataTable
Componente que genera una tabla HTML a partir de un array o el resultado de un webservice. Incluye soporte para: habilitar y deshabilitar operaciones CRUD dentro de la tabla, configurables a traves de eventos (create, delete, edit, update); habilitar y deshabilitar ordenamiento y filtrados de datos (por igualdad); realizar paginación (debe ser soportado por el webservice).

#### Notas
* WebService como fuente: el webservice esperado es un objecto Json con una clave "data", cuyo valor es un arreglo de objectos Json que representan las filas a ser mostradas. Si la paginación se encuentra activa, se espera que el webservice tenga además una clave "pageCount" que indica el número de páginas de la tabla.
* Filtrados: El filtrado se ejecuta al desenfocar el input correspondiente. Cuando no se tiene paginación, los filtrados se acumulan. Con paginación, se filtra usando el último campo seleccionado.
* Paginación:


#### Constructor 
new table(divContainer, content, configParam={}, styles={}, events={}, rowEvents={})

* divContainer: string. Id (sin #) del elemento donde se insertara la tabla.
* content: string|arreglo. URL del webservice de donde se obtendran los datos de la tabla con formato http:// o https:// | Arreglo del contenido.
    * El contenido debe ser un arreglo de diccionarios/objetos Json. Ej: {llave1: valor1, llave2: valor2, ...} 
* configParam: JSON Object. Diccionario con las configuraciones de la tabla. Default: {}
    *  page: false|int. Número de la pagina a mostrar si el webservice acepta paginacion. Si es false, el webservice retorna todo el contenido o  Default: false. 
    *  pageSize: int. Indica la cantidad máxima de registros de una página, si se habilita la paginación. Default: 20.
    *  deletable: bool. Indica si los elementos de la tabla son eliminables. Default: false.
    *  editable: bool. Indice si los elementos de la table son modificables. Default: false.
    *  sortable: false | "all" | array. Indica por que campos se puede ordenar la tabla. Si es false, ningun campo es ordenable. Si es "all" todos los campos son ordenables. Si es un array, los campos dentro del array son los ordenables. Default: false.
    *  filterable: false | "all" | array. Indica por que campos se puede ordenar la tabla. Si es false, ningun campo es ordenable. Si es "all" todos los campos son ordenables. Si es un array, los campos dentro del array son los ordenables. Default: false.
* styles: Json Object. Diccionario con estilos aplicables a la tabla. Las propiedades se escriben usando camel case. Ej: {backgroundColor: "white"}. Default: {}.
* events: Json Object. Diccionario con los eventos aplicables a la tabla. Acepta los eventos nativos de HTML además de los siguientes eventos: load. Ej: {load: function(){alert("Cargando")}}, Default: {}
* rowEvents: Json Object. Diccionario con los eventos aplicables a cada fila de la tabla. Acepta los eventos nativos de HTML además de los siguientes eventos: load, delete, edit, update, create. Ej: {edit: function(){alert("Editando")}}- Default: {}

#### Atributos
Elemenos accesibles usando this.[atributo], siendo this el objeto table.

* $element: Elemento Jquery con el contenedor de la tabla.
* source: Fuente de los datos de la tabla. Puede ser un URL o un arreglo.
* filteringFields: Json usado para realizar filtros de la table cuando no se tiene paginacion. Las llaves corresponden a los campos filtrables y el valor indice que valor por el cual se realiza la comparacion de igualdad. 
* sortingFields: Json usado para ordenar la tabla cuando no se tiene paginacion.
* tableFiltered: Arreglo usado cuando no se tiene paginacion, usado para los datos fultrados de la tabla filtrada y mostrarlos sin perder la tabla original.
* page: Número entero que indica la pagina de datos mostrada actualmente.
* pageCount: Número entero que indica la cantidad de paginas que contiene los datos actuales.
* tableContent: Contenido de los datos mostrados actualmente.
* URLsort: Json usado para realizar ordenamiento cuando el src es un webservice
* URLfilter: Json usado para realizar filtrado cuando el src es un webservice
* columns: Arreglo usado para dibujar el header de la tabla
* config: Json con las configuraciones de la tabla

#### Métodos
* drawContent: Método usado para renderizar el contenido de la tabla.
* getContentFromURL: Método usado para obtener el contenido de la tabla de un webservice
* filterContent: Método usado para filtrar el contenido de la tabla
* sortContent: Método usado para ordenar el contenido de la tabla

## ComboBox

Componente que crea un elemento HTML select con opciones provenienes de un Json o del resultado de un webservice.

#### Constructor

new combBox(divContainer, name, options, events)

* divContainer: string. Id (sin #) del elemento donde se insertara la tabla.
* name: string. Nombre para el atributo "name" del id.
* options: Json Object. Diccionario con las opciones que se desplegaran en el select donde las llaves indican el atributo "value" de la opcion y el valor indice el texto a ser mostrado.
* events: Json Object. Diccionario con los eventos aplicables al select. Acepta los eventos nativos de HTML además de los siguientes eventos: load, change. Ej: {"change": function(){alert("Change")}}. Default={}.

## Windows Controller

#### Constructor 

new WindowsController(container, barStylesParams={}, barEvents={})

* divContainer: string. Id (sin #) del elemento donde se insertara la tabla.
* barStylesParams: Json Object. Diccionario con estilos aplicables a la barra de ventanas ocultas. Las propiedades se escriben usando camel case. Ej: {backgroundColor: "white"}. Default: {}.
* barEvents: Json Object. Diccionario con los eventos aplicables a la barra. Acepta los eventos nativos de HTML además de los siguientes eventos: load. Ej: {load: function(){alert("Cargando")}}, Default: {}

#### Atributos
Elemenos accesibles usando this.[atributo], siendo this el objeto table.

* activeWindow: JQuery Object. Elemento JQuery que indica cual es la ventana activa.
* inactiveWindoww: Json Object. Diccionario donde se guardan las ventanas que han sido minimizadas. Las llaves indican el id de la ventana y el valor es el elemento JQuery.
* activeWindoww: Json Object. Diccionario donde se guardan las ventanas que se muestran en pantalla activas (no estan minimizadas). Las llaves indican el id de la ventana y el valor es el elemento JQuery.
* container: string. Id del elemento en el que se encapsula el manejador de ventanas. Las ventanas no se pueden mover fuera de este elemento.
* inactiveWindowsTabs: JQuery Object. Elemento JQuery donde se dibujan las ventanas que han sido minimizadas.

#### Métodos
* openNewWindow(content, title, configParam={}, stylesParam={}, eventsParams={}): 
Función usada para crear una nueva ventana. Recibe los siguientes parametros:
    * content: string. String HTML o URL a una página a la cual se le extrae el body.
    * title: string. Título de la ventana.
    * configParam: Json Object. Diccionario con las configuraciones de la nueva ventana:
        * type: "form" | "modal". Indica el tipo de ventana que se abrirá. El modal mientras se encuentra abierto no permite interacción con otras ventanas. 
        * draggable: bool. Indica si la ventana puede ser movida. Default: true.
        * resizable: bool. Indica si el tamaño de la ventana se puede ajustar. Default: true.
        * minimizable: bool. Indica si la ventana se puede minimizar. Default: true.
        * maximizable: bool. Indica si la ventana se puede maximizar. Default: true.
        * title: bool. Indica si la ventana lleva titulo. Default: true.

* hideWindow(windowId):
Función usara para ocultar una ventana.
    * windowId: string. Id (sin #) de la ventana a ocultar.          
* reopenWindow(windowId): Función que se encarga de reabrir una ventana.
    * windowId: string. Id (sin #) de la ventana a reabrir.
* activateWindow(windowId): Función que se encarga de reabrir una ventana.
    * windowId: string. Id (sin #) de la ventana a colocar como página activa.
* closeWindow(windowId): Función que se encarga de cerrar una ventana.
    * windowId: string. Id (sin #) de la ventana a cerrar.
* maximizeWindow(windowId): Función que se encarga de maximizar una ventana.
    * windowId: string. Id (sin #) de la ventana a maximizar.
* restoreWindow(windowId): Función que se encarga de restaurar una ventana.
    * windowId: string. Id (sin #) de la ventana a restaurar.