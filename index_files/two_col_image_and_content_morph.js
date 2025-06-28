//three.js
var TwoColcamera, TwoColScene, TwoColRenderer, TwoColLoadedSphere;

var TwoColTicking1 = false,
    TwoColLastScrollPos = 0,
    TwoColElForHeight = document.getElementById('two-img-col-container'),
    TwoColElToMove = document.getElementById('two-img-col-webgl-wrapper'),
    TwoColElToMoveWidth = parseFloat(getComputedStyle(TwoColElToMove, null).width.replace("px", ""));

var TwoColWindowHalfX = window.innerWidth / 2;
var TwoColWindowHalfY = window.innerHeight / 2;

var TwoColClock = new THREE.Clock();

TwoColInit();
TwoColAnimate();
TwoColMoveCloud(window.scrollY);

//blue blob
var TwoColMaterial = new THREE.MeshLambertMaterial({
    color: 0x184cce,
    transparent: true,
    opacity: 1.0
});



function TwoColInit() {
    // basic TwoColScene
    TwoColRenderer = new THREE.WebGLRenderer({
        alpha: true,
    });
    var width = window.innerWidth;
    var height = window.innerHeight;

    TwoColRenderer.setSize(width, height);

    document.getElementById("two-img-col-webgl-wrapper").appendChild(TwoColRenderer.domElement);

    TwoColScene = new THREE.Scene();

    TwoColcamera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    TwoColcamera.position.y = 0;
    TwoColcamera.position.z = 150;

    var manager = new THREE.LoadingManager();
    var loader = new THREE.OBJLoader(manager);

    // morph_script_params.theme_path +
    loader.load('/wp-content/themes/banxa/assets/js/half_sphere.obj', function(loadedobject02) {
        loadedobject02.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = TwoColMaterial;
            }
        });

        // purple
        TwoColLoadedSphere = loadedobject02;
        loadedobject02.scale.set(50, 50, 50);
        loadedobject02.position.set(0, 40, 0);
        loadedobject02.rotation.z = -90;

        TwoColScene.add(loadedobject02);
    });

    var light = new THREE.AmbientLight(0xffffff, 1.0);
    TwoColScene.add(light);
}

function TwoColOnWindowResize() {
    TwoColWindowHalfX = window.innerWidth / 2;
    TwoColWindowHalfY = window.innerHeight / 2;

    TwoColcamera.aspect = window.innerWidth / window.innerHeight;
    TwoColcamera.updateProjectionMatrix();
}

function TwoColOnDocumentScroll(event) {
    TwoColLastScrollPos = window.scrollY;

    if (!TwoColTicking1) {
        window.requestAnimationFrame(function() {
            TwoColMoveCloud(TwoColLastScrollPos);
            TwoColTicking1 = false;
        })
    }

    TwoColTicking1 = true;
}

function TwoColMoveCloud(d) {
    var minX = 0;
    var maxX = 70;
    var rX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;

    var pa = ((d / TwoColElForHeight.offsetHeight) * 100) * 1.3;

    TwoColElToMove.style.transform = 'translatex(-' + rX + '%)';
    TwoColElToMove.style.width = (((TwoColElToMoveWidth / 100) * pa) + TwoColElToMoveWidth) + 'px';
}

var windowWidth = window.innerWidth;
if (windowWidth > 540) {
    window.addEventListener('resize', TwoColOnWindowResize, false);
}

function TwoColAnimate() {
    setTimeout(function() {
        requestAnimationFrame(TwoColAnimate);
    }, 1000 / 25);
    TwoColRender();
}

function TwoColCloudShimy() {
    d = window.scrollY;
    var minY = 1;
    var maxY = 4;
    var rY = (Math.floor(Math.random() * (maxY - minY + 1)) + minY) * 100;
    var minX = 0;
    var maxX = 70;
    var rX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var x = ((d / TwoColElForHeight.offsetHeight) * 100) * 1.3;
    var y = d > 100 ? d + rY : d;

    TwoColElToMove.style.transform = 'translate(-' + rX + '%, ' + y + 'px)';
    TwoColElToMove.style.width = (((TwoColElToMoveWidth / 100) * x) + TwoColElToMoveWidth) + 'px';
}

function TwoColScrollStop1(callback, refresh = 66) {
    // Make sure a valid callback was provided
    if (!callback || typeof callback !== 'function') return;

    // Setup scrolling variable
    let isScrolling;

    // Listen for scroll events
    window.addEventListener('scroll', function(event) {

        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(callback, refresh);

    }, false);
}

function TwoColRender() {
    var delta = TwoColClock.getDelta();

    if (TwoColLoadedSphere) TwoColLoadedSphere.rotation.y -= 0.5 * delta;
    if (TwoColLoadedSphere) TwoColLoadedSphere.rotation.z += 0.3 * delta;


    document.addEventListener('scroll', TwoColOnDocumentScroll, false);

    TwoColcamera.lookAt(TwoColScene.position);

    TwoColRenderer.render(TwoColScene, TwoColcamera);
}