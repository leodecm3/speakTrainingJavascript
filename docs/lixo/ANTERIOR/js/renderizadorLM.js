	//esse js so funciona no final da pagina ( depois do obj renderizado)
	


// bloco de notas -----------------------------------------------------------
// esse cara fez os imports direto do site do three  https://jsfiddle.net/trusktr/jc6j1wmf/ 

// https://jsfiddle.net/trusktr/jc6j1wmf/
// https://jsfiddle.net/trusktr/jc6j1wmf/
// https://jsfiddle.net/trusktr/jc6j1wmf/
// https://jsfiddle.net/trusktr/jc6j1wmf/
// https://jsfiddle.net/trusktr/jc6j1wmf/
// https://jsfiddle.net/trusktr/jc6j1wmf/





	
	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Init
	//////////////////////////////////////////////////////////////////////////////////

	// init renderer
	var renderer	= new THREE.WebGLRenderer({
		// antialias	: true,
		alpha: true
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	// renderer.setPixelRatio( 2 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
	document.body.appendChild( renderer.domElement );

	// array of functions for the rendering loop
	var onRenderFcts= [];

	// init scene and camera
	var scene	= new THREE.Scene();

	var ambient = new THREE.AmbientLight( 0x666666 );
	scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0x887766 );
	directionalLight.position.set( -1, 1, 1 ).normalize();
	scene.add( directionalLight );
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Initialize a basic camera
	//////////////////////////////////////////////////////////////////////////////////

	// Create a camera
	var camera = new THREE.Camera();
	scene.add(camera);

	////////////////////////////////////////////////////////////////////////////////
	//          handle arToolkitSource
	////////////////////////////////////////////////////////////////////////////////

	var arToolkitSource = new THREEx.ArToolkitSource({
		// to read from the webcam 
		sourceType : 'webcam',

		// // to read from an image
		// sourceType : 'image',
		// sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',		
		// sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/armchair.jpg',		

		// to read from a video
		// sourceType : 'video',
		// sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',		
	})

	arToolkitSource.init(function onReady(){
		onResize()
	})
	
	// handle resize
	window.addEventListener('resize', function(){
		onResize()
	})
	function onResize(){
		arToolkitSource.onResizeElement()	
		arToolkitSource.copyElementSizeTo(renderer.domElement)	
		if( arToolkitContext.arController !== null ){
			arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)	
		}	
	}

	////////////////////////////////////////////////////////////////////////////////
	//          initialize arToolkitContext
	////////////////////////////////////////////////////////////////////////////////	

	// create atToolkitContext
	var arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
		// debug: true,
		// detectionMode: 'mono_and_matrix',
		detectionMode: 'mono',
		// detectionMode: 'color_and_matrix',
		// matrixCodeType: '3x3',

		canvasWidth: 80*3,
		canvasHeight: 60*3,

		maxDetectionRate: 30,
	})
	// initialize it
	arToolkitContext.init(function onCompleted(){
		// copy projection matrix to camera
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	})

	// update artoolkit on every frame
	onRenderFcts.push(function(){
		if( arToolkitSource.ready === false )	return

		arToolkitContext.update( arToolkitSource.domElement )
	})

	
	////////////////////////////////////////////////////////////////////////////////
	//          Create a ArMarkerControls
	////////////////////////////////////////////////////////////////////////////////
	
	var markerRoot = new THREE.Group
	scene.add(markerRoot)
	var markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
		// type: 'barcode',
		// barcodeValue: 5,
		
		type : 'pattern',
		patternUrl : THREEx.ArToolkitContext.baseURL + 'examples/marker-training/examples/pattern-files/pattern-gas-LM.patt',
	})


	// build a smoothedControls
	var smoothedRoot = new THREE.Group()
	scene.add(smoothedRoot)
	var smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
		lerpPosition: 0.4,
		lerpQuaternion: 0.3,
		lerpScale: 1,
		// minVisibleDelay: 1,
		// minUnvisibleDelay: 1,
	})
	onRenderFcts.push(function(delta){
		smoothedControls.update(markerRoot)
	})	
	
	// smoothedControls.addEventListener('becameVisible', function(){
	// 	console.log('becameVisible event notified')
	// })
	// smoothedControls.addEventListener('becameUnVisible', function(){
	// 	console.log('becameUnVisible event notified')
	// })

	//////////////////////////////////////////////////////////////////////////////////
	//		add an object in the scene
	//////////////////////////////////////////////////////////////////////////////////

	// var arWorldRoot = markerRoot
	var arWorldRoot = smoothedRoot




	// //aqui eh como ele cria o objeto -------------------------------------------
	// var mesh = new THREE.AxisHelper()
	// // add a torus knot
	// var geometry	= new THREE.CubeGeometry(1,1,1);
	// var material	= new THREE.MeshNormalMaterial({
	// 	transparent : true,
	// 	opacity: 0.5,
	// 	side: THREE.DoubleSide
	// })
	// var mesh	= new THREE.Mesh( geometry, material );
	// mesh.position.y	= geometry.parameters.height/2
	// var geometry	= new THREE.TorusKnotGeometry(0.3,0.1,64,16);
	// var material	= new THREE.MeshNormalMaterial(); 
	// var mesh	= new THREE.Mesh( geometry, material );
	// //mesh.position.y	= 0.5
	// arWorldRoot.add( mesh );
	// onRenderFcts.push(function(delta){
	// 	mesh.rotation.x += delta * Math.PI
	// })
	// //aqui eh como ele cria o objeto -------------------------------------------


	//aqui a minha tentativa, funcionou, mas com superficie solida
	var texture = new THREE.TextureLoader().load( THREEx.ArToolkitContext.baseURL + 'examples/marker-training/examples/pattern-files/crate.gif' );
	var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { map: texture } );
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );


	// // tentativa com div fracassada
	// var element = document.createElement( 'div' );
	// element.style.width = '100px';
	// element.style.height = '100px';
	// element.style.opacity = 0.999;
	// element.style.background = new THREE.Color(
	//   Math.random() * 0.21568627451 + 0.462745098039,
	//   Math.random() * 0.21568627451 + 0.462745098039,
	//   Math.random() * 0.21568627451 + 0.462745098039,
	// ).getStyle();
	// element.textContent = "I am editable text!";
	// element.setAttribute('contenteditable', '');
	// var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
	// var material = new THREE.MeshBasicMaterial( { map: elementinho } );
	// var mesh = new THREE.Mesh( geometry, material );
	// var mesh =  new THREE.CSS3DObject( element );

	//olha isso!!! https://jsfiddle.net/trusktr/jc6j1wmf/


	mesh.position.y	= 0.5;
	arWorldRoot.add( mesh );
	// scene.add( mesh );

	onRenderFcts.push(function(delta){
		mesh.rotation.x += delta * Math.PI;
		
	})






	
// var texture = new THREE.TextureLoader().load( "https://www.ics.uci.edu/~djp3/classes/2015_03_ICS163/tasks/arMarker/Unity/arMarker/Assets/Standard%20Assets/Water%20(Basic)/Sources/Textures/Water%20fallback.jpg" );
// var material	= new THREE.MeshNormalMaterial({
// 		transparent : false,
// 		side: THREE.DoubleSide,
		
// 	})
// var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );


// mesh = new THREE.Mesh( geometry, material );



// onRenderFcts.push(function(delta){
// 	texture.rotation.x += delta * Math.PI
// })






	//////////////////////////////////////////////////////////////////////////////////
	//		render the whole thing on the page
	//////////////////////////////////////////////////////////////////////////////////
	var stats = new Stats();
	document.body.appendChild( stats.dom );
	// render the scene
	onRenderFcts.push(function(){
		renderer.render( scene, camera );
		stats.update();
	})

	// run the rendering loop
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(deltaMsec/1000, nowMsec/1000)
		})
	})