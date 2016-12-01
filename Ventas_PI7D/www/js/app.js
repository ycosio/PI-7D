// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
$stateProvider

.state('login', {
cache: false,
url: '/',
templateUrl: 'CtrlVentas.html',
controller: 'myCtrl'
})

.state('home', {
url: '/home',
templateUrl: 'home.html',
controller : 'myCtrl'
})

.state('registroVendedor', {
url: '/registroVendedor',
templateUrl: 'registroVendedor.html',
controller : 'myCtrl'
})

.state('Vendedores', {
cache: false,
url: '/Vendedores',
templateUrl: 'Vendedores.html',
controller : 'myCtrl'
})

.state('ProductosVenta', {
cache: false,
url: '/ProductosVenta',
templateUrl: 'ProductosVenta.html',
controller : 'myCtrl'
})

.state('Productos', {
cache: false,
url: '/Productos',
templateUrl: 'Productos.html',
controller : 'myCtrl'
})

.state('editarProductos', {
cache: false,
url: '/editarProducto',
templateUrl: 'editarProductos.html',
controller : 'myCtrl'
})

/*.state('editarVendedores', {
url: '/editarVendedor',
templateUrl: 'editarVendedores.html',
controller : 'myCtrl'
})*/

.state('perfilVendedor', {
cache: false,
url: '/perfilVendedor',
templateUrl: 'perfilVendedor.html',
controller : 'myCtrl'
})

.state('Venta', {
cache: false,
url: '/Venta',
templateUrl: 'Venta.html',
controller : 'myCtrl'
})

.state('editarClientes', {
cache: false,
url: '/editarCliente',
templateUrl: 'editarClientes.html',
controller : 'myCtrl'
})

.state('productosCliente', {
cache: false,
url: '/productosCliente',
templateUrl: 'productosCliente.html',
controller : 'myCtrl'
})

.state('Clientes', {
cache: false,
url: '/Clientes',
templateUrl: 'Clientes.html',
controller : 'myCtrl'
})

$urlRouterProvider.otherwise("/");
})

.controller('myCtrl', function($scope,$http,$ionicLoading,$state,$window,$ionicSideMenuDelegate) {

     $scope.id=$window.localStorage["id"];
     $scope.idProducto=$window.localStorage["idP"];
     $scope.nombreProducto=$window.localStorage["nombreP"];
     $scope.precioProducto=$window.localStorage["precioP"];
     $scope.cantidadProducto=$window.localStorage["cantidadP"];
     $scope.descripcionProducto=$window.localStorage["descripcionP"];

     $scope.idVendedor=$window.localStorage["idV"];
     $scope.nombreVendedor=$window.localStorage["nombreV"];
     $scope.nombreVendedorE=$window.localStorage["nombreVE"];
     $scope.apellidosVendedor=$window.localStorage["apellidosV"];
     $scope.correoVendedor=$window.localStorage["correoV"];
     $scope.passwordVendedor=$window.localStorage["passwordV"];

     $scope.idCliente=$window.localStorage["idC"];
     $scope.nombreCliente=$window.localStorage["nombreC"];
     $scope.apellidoCliente=$window.localStorage["apellidoC"];
     $scope.correoCliente=$window.localStorage["correoC"];
     $scope.telefonoCliente=$window.localStorage["telefonoC"];
     $scope.domicilioCliente=$window.localStorage["domicilioC"];

     $scope.plazoVenta="1";
     $scope.pagosPendientes="6";

     $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.Out=function()
        {
            $window.localStorage.clear();  
            $state.go('login',{reload: true});    
        };    

    $scope.Auth=function()
        {
            $http.get("http://bdpi7d.esy.es/login_PI.php?correo="+$scope.correoL+"&pass="+$scope.passwordL).then(function(response) {
                if(response.data.records==null)
                    alert("Usuario o contraseña invalidos");
                else
                {
                    $window.localStorage["id"]=response.data.records[0].id;
                    $window.localStorage["nombreV"]=response.data.records[0].nombre;
                    $window.localStorage["apellidosV"]=response.data.records[0].apellidos;
                    $window.localStorage["correoV"]=response.data.records[0].correo;
                    $window.localStorage["passwordV"]=response.data.records[0].password;
                    $scope.correoL="";
                    $scope.passwordL="";
                    document.getElementById('footer').style.visibility = 'visible';
                    $state.go('home');            
                }
            })
        };

    $scope.RegistrarV=function()
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/registroVendedor_PI.php?nombre='+$scope.nombre+'&apellidos='+$scope.apellidos+'&correo='+$scope.correo+'&pass='+$scope.pass).then(function(response){
             alert("Vendedor resgitrado");
            $scope.nombre="";
            $scope.apellidos="";
            $scope.correo="";
            $scope.pass="";
            $state.go('login');
            $scope.ListadoV();
        }, function(error){
            alert("Vendedor registrado");
            $scope.nombre="";
            $scope.apellidos="";
            $scope.correo="";
            $scope.pass="";
            $state.go('login');
            $scope.ListadoV();
        });
    };

      $scope.RegistrarC=function()
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/registroCliente_PI.php?id='+$scope.id+'&nombre='+$scope.nombreC+'&apellido='+$scope.apellidoC+'&domicilio='+$scope.domicilioC+'&telefono='+$scope.telefonoC+'&correo='+$scope.correoC).then(function(response){
            alert("Cliente registrado con exito");
            $scope.ListadoC();
        }, function(error){
            alert("Cliente registrado con exito");
            $scope.ListadoC();
        });
    };

      $scope.RegistrarP=function()
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/registroProducto_PI.php?id='+$scope.id+'&nombre='+$scope.nombreP+'&precio='+$scope.precioP+'&cantidad='+$scope.cantidadP+'&descripcion='+$scope.descripcionP).then(function(response){
            alert("Producto registrado con exito");
            $scope.ListadoP();
        }, function(error){
            alert("Producto registrado con exito");
            $scope.ListadoP();
        });
    };


    $scope.ListadoV=function()
    {
        $http.get("http://bdpi7d.esy.es/all_vendedores.php").then(function(response) {
            $scope.myDataV = response.data.records;
            //alert('#'+myData.length);
        });

    };

    $scope.ListadoCobros=function()
    {
        $http.get("http://bdpi7d.esy.es/ventas_vendedor.php?id="+$scope.id).then(function(response) {
            $scope.myDataCobros = response.data.records;
            //alert('#'+myData.length);
        });

    };

     $scope.ListadoC=function()
    {
        $http.get("http://bdpi7d.esy.es/clientes_vendedor.php?id="+$scope.id).then(function(response) {
            $scope.myDataC = response.data.records;
            //alert('#'+myData.length);
        });

    };

     $scope.ListadoP=function()
    {
        $http.get("http://bdpi7d.esy.es/productos_vendedor.php?id="+$scope.id).then(function(response) {
            $scope.myDataP = response.data.records;
            //alert('#'+myData.length);
        });

    };

    $scope.Abono=function(id_cliente,monto,id_producto,plazo,fechaAnterior,id_Venta)
    {
        $http.get("http://bdpi7d.esy.es/abono_cliente.php?id_Cliente="+id_cliente+"&monto="+monto+"&id_Producto="+id_producto+"&plazo="+plazo+"&fechaAnterior="+fechaAnterior+"&id_Venta="+id_Venta).then(function(response) {
            alert("Abono realizado");
            $scope.ListadoPClientes();
            $scope.ListadoCobros();
            $state.go('home',{reload: true});
        }, function(error){
            alert("Abono realizado");
            $scope.ListadoPClientes();
            $scope.ListadoCobros();
            $state.go('home',{reload: true});
        });

    };

    $scope.ListadoPClientes=function()
    {
        $http.get("http://bdpi7d.esy.es/productos_cliente.php?id="+$scope.idCliente).then(function(response) {
            $scope.myDataPDC = response.data.records;
            //alert('#'+myData.length);
        });

    };


     $scope.ListadoProductos=function()
    {
        $http.get("http://bdpi7d.esy.es/productos_disponibles.php?id="+$scope.id).then(function(response) {
            $scope.myDataPD = response.data.records;
            //alert('#'+myData.length);
        });

    };

        $scope.EliminarV=function(id)
    {
        $http.get("http://bdpi7d.esy.es/eliminar_vendedor.php?id="+id).then(function(response) {
            alert("Vendedor eliminado");
            $scope.ListadoV();
            //alert('#'+myData.length);
        },function(error){
            alert("Vendedor eliminado");
            $scope.ListadoV();
        });
    }

     $scope.EliminarC=function(id)
    {
        $http.get("http://bdpi7d.esy.es/eliminar_cliente.php?id="+id).then(function(response) {
            alert("Cliente eliminado");
            $scope.ListadoC();
            //alert('#'+myData.length);
        },function(error){
            alert("Cliente eliminado");
            $scope.ListadoC();
        });
    }

         $scope.EliminarP=function(id)
    {
        $http.get("http://bdpi7d.esy.es/eliminar_producto.php?id="+id).then(function(response) {
            alert("Producto eliminado");
            $scope.ListadoP();
            //alert('#'+myData.length);
        },function(error){
            alert("Producto eliminado");
            $scope.ListadoP();
        });
    }

     $scope.EditarP=function(id)
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/editarProducto_PI.php?id='+id+'&nombre='+$scope.nombreProducto+'&precio='+$scope.precioProducto+'&cantidad='+$scope.cantidadProducto+'&descripcion='+$scope.descripcionProducto).then(function(response){
            alert("Producto guardado con exito");
            $scope.nombreProducto="";
            $scope.precioProducto="";
            $scope.cantidadProducto="";
            $scope.descripcionProducto="";
            $state.go('Productos',{reload: true});
            $scope.ListadoP();
        }, function(error){
            alert("Producto guardado con exito");
            $scope.nombreProducto="";
            $scope.precioProducto="";
            $scope.cantidadProducto="";
            $scope.descripcionProducto="";
            $state.go('Productos',{reload: true});
            $scope.ListadoP();
        });
    };

     $scope.VentaP=function()
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/nuevaVenta_PI.php?id_Producto='+$scope.idProducto+'&precio_Producto='+$scope.precioProducto+'&id_Cliente='+$scope.idCliente+'&cantidad='+$scope.cantidadProducto+'&plazo='+$scope.plazoVenta+'&pagos='+$scope.pagosPendientes).then(function(response){
            alert("Venta realizada");
            $scope.idProducto="";
            $scope.precioProducto="";
            $scope.idCliente="";
            $scope.cantidadProducto="";
            $scope.plazoVenta="1";
            $scope.pagosPendientes="6";
            $state.go('ProductosVenta',{reload: true});
            $scope.ListadoProductos();
        }, function(error){
            alert("Venta realizada");
            $scope.idProducto="";
            $scope.precioProducto="";
            $scope.idCliente="";
            $scope.cantidadProducto="";
            $scope.plazoVenta="1";
            $scope.pagosPendientes="6";
            $state.go('ProductosVenta',{reload: true});
            $scope.ListadoProductos();
        });
    };

     $scope.EditarV=function(id)
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/editarVendedor_PI.php?id='+id+'&nombre='+$scope.nombreVendedor+'&apellidos='+$scope.apellidosVendedor+'&correo='+$scope.correoVendedor+'&password='+$scope.passwordVendedor).then(function(response){
            alert("Perfil guardado con exito");
            $window.localStorage["nombreV"]=$scope.nombreVendedor;
            $window.localStorage["apellidosV"]=$scope.apellidosVendedor;
            $window.localStorage["correoV"]=$scope.correoVendedor;
            $window.localStorage["passwordV"]=$scope.passwordVendedor;
            $state.go('home',{reload: true});
            $scope.ListadoC();
            $scope.ListadoP();
        }, function(error){
            alert("Perfil guardado con exito");
            $window.localStorage["nombreV"]=$scope.nombreVendedor;
            $window.localStorage["apellidosV"]=$scope.apellidosVendedor;
            $window.localStorage["correoV"]=$scope.correoVendedor;
            $window.localStorage["passwordV"]=$scope.passwordVendedor;
            $state.go('home',{reload: true});
            $scope.ListadoC();
            $scope.ListadoP();
        });
    };

    $scope.EditarC=function(id)
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/editarCliente_PI.php?id='+id+'&nombre='+$scope.nombreCliente+'&apellido='+$scope.apellidoCliente+'&correo='+$scope.correoCliente+'&domicilio='+$scope.domicilioCliente+'&telefono='+$scope.telefonoCliente).then(function(response){
            alert("Cliente guardado con exito");
            $scope.nombreCliente="";
            $scope.apellidoCliente="";
            $scope.correoCliente="";
            $scope.domicilioCliente="";
            $scope.telefonoCliente="";
            $state.go('home',{reload: true});
            $scope.ListadoC();
        }, function(error){
            alert("Cliente guardado con exito");
            $scope.nombreCliente="";
            $scope.apellidoCliente="";
            $scope.correoCliente="";
            $scope.domicilioCliente="";
            $scope.telefonoCliente="";
            $state.go('home',{reload: true});
            $scope.ListadoC();
        });
    };


    $scope.parametrosP=function(id,nombre,precio,cantidad,descripcion)
    {
        $window.localStorage["idP"]=id;
        $window.localStorage["nombreP"]=nombre;
        $window.localStorage["precioP"]=precio;
        $window.localStorage["cantidadP"]=cantidad;
        $window.localStorage["descripcionP"]=descripcion;
        $state.go('editarProductos',{reload: true});
    };

        $scope.parametrosV=function(id,nombre,apellidos,correo,password)
    {
        $window.localStorage["idV"]=id;
        $window.localStorage["nombreVE"]=nombre;
        $window.localStorage["apellidosV"]=apellidos;
        $window.localStorage["correoV"]=correo;
        $window.localStorage["passwordV"]=password;
        $state.go('editarVendedores');
    };

        $scope.parametrosC=function(id,nombre,apellido,domicilio,telefono,correo)
    {
        $window.localStorage["idC"]=id;
        $window.localStorage["nombreC"]=nombre;
        $window.localStorage["apellidoC"]=apellido;
        $window.localStorage["domicilioC"]=domicilio;
        $window.localStorage["telefonoC"]=telefono;
        $window.localStorage["correoC"]=correo;
    };

    $scope.ListadoV();
    $scope.ListadoC();
    $scope.ListadoP();
    $scope.ListadoProductos();
    $scope.ListadoPClientes();
    $scope.ListadoCobros();
})
