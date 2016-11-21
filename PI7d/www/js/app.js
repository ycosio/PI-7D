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
url: '/Vendedores',
templateUrl: 'Vendedores.html',
controller : 'myCtrl'
})

.state('Productos', {
url: '/Productos',
templateUrl: 'Productos.html',
controller : 'myCtrl'
})

.state('editarProductos', {
url: '/editarProducto',
templateUrl: 'editarProductos.html',
controller : 'myCtrl'
})

.state('editarVendedores', {
url: '/editarVendedor',
templateUrl: 'editarVendedores.html',
controller : 'myCtrl'
})

.state('editarClientes', {
url: '/editarCliente',
templateUrl: 'editarClientes.html',
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
     $scope.apellidosVendedor=$window.localStorage["apellidosV"];
     $scope.correoVendedor=$window.localStorage["correoV"];
     $scope.passwordVendedor=$window.localStorage["passwordV"];

     $scope.idCliente=$window.localStorage["idC"];
     $scope.nombreCliente=$window.localStorage["nombreC"];
     $scope.apellidoCliente=$window.localStorage["apellidoC"];
     $scope.correoCliente=$window.localStorage["correoC"];
     $scope.telefonoCliente=$window.localStorage["telefonoC"];
     $scope.domicilioCliente=$window.localStorage["domicilioC"];

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
                    alert("Usurio o contraseña invalidos");
                else
                {
                    $window.localStorage["id"]=response.data.records[0].id;
                    $window.localStorage["nombreV"]=response.data.records[0].nombre;
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
            alert("Vendedor guardado ocon exito!! "+response.data.estatus);
        }, function(error){
            alert("Vendedor agregado con exito");
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
            alert("Cliente guardado ocon exito!! "+response.data.estatus);
        }, function(error){
            alert("Cliente agregado con exito");
            $scope.ListadoC();
        });
    };

      $scope.RegistrarP=function()
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/registroProducto_PI.php?id='+$scope.id+'&nombre='+$scope.nombreP+'&precio='+$scope.precioP+'&cantidad='+$scope.cantidadP+'&descripcion='+$scope.descripcionP).then(function(response){
            alert("Producto guardado ocon exito!! "+response.data.estatus);
        }, function(error){
            alert("Producto agregado con exito");
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

        $scope.EliminarV=function(id)
    {
        $http.get("http://bdpi7d.esy.es/eliminar_vendedor.php?id="+id).then(function(response) {
            $scope.ListadoV();
            //alert('#'+myData.length);
        },function(error){
            alert("Vendedor eliminado con exito");
            $scope.ListadoV();
        });
    }

     $scope.EliminarC=function(id)
    {
        $http.get("http://bdpi7d.esy.es/eliminar_cliente.php?id="+id).then(function(response) {
            $scope.ListadoC();
            //alert('#'+myData.length);
        },function(error){
            alert("Cliente eliminado con exito");
            $scope.ListadoC();
        });
    }

         $scope.EliminarP=function(id)
    {
        $http.get("http://bdpi7d.esy.es/eliminar_producto.php?id="+id).then(function(response) {
            $scope.ListadoP();
            //alert('#'+myData.length);
        },function(error){
            alert("Producto eliminado con exito");
            $scope.ListadoP();
        });
    }

     $scope.EditarP=function(id)
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/editarProducto_PI.php?id='+id+'&nombre='+$scope.nombreProducto+'&precio='+$scope.precioProducto+'&cantidad='+$scope.cantidadProducto+'&descripcion='+$scope.descripcionProducto).then(function(response){
            alert("Producto guardado ocon exito!! "+response.data.estatus);
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

     $scope.EditarV=function(id)
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/editarVendedor_PI.php?id='+id+'&nombre='+$scope.nombreVendedor+'&apellidos='+$scope.apellidosVendedor+'&correo='+$scope.correoVendedor+'&password='+$scope.passwordVendedor).then(function(response){
            alert("Vendedor guardado ocon exito!! "+response.data.estatus);
        }, function(error){
            alert("Vendedor guardado con exito");
            $scope.nombreVendedor="";
            $scope.apellidosVendedor="";
            $scope.correoVendedor="";
            $scope.passwordVendedor="";
            $state.go('Vendedores',{reload: true});
            $scope.ListadoV();
        });
    };

    $scope.EditarC=function(id)
    {
        // Agregar e registro
        $http.get('http://bdpi7d.esy.es/editarCliente_PI.php?id='+id+'&nombre='+$scope.nombreCliente+'&apellido='+$scope.apellidoCliente+'&correo='+$scope.correoCliente+'&domicilio='+$scope.domicilioCliente+'&telefono='+$scope.telefonoCliente).then(function(response){
            alert("Cliente guardado ocon exito!! "+response.data.estatus);
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
        $window.localStorage["nombreV"]=nombre;
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

})
