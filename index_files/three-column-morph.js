//three.js
if (jQuery("body").hasClass("page-id-265")) {
    var blobClor = 0xd726f8;
} else {
    //blue blob
    var blobClor = 0x2be3c6;
}

var threeColumnCamera, threeColumnScene, threeColumnRenderer, threeColumnLoadedSphere;

var threeColumnTicking = false,
    threeColumnLastScrollPos = 0,
    threeColumnElForHeight = document.getElementById('three-column-container'),
    threeColumnElToMove = document.getElementById('three-column-webgl-wrapper'),
    threeColumnElToMoveWidth = parseFloat(getComputedStyle(threeColumnElToMove, null).width.replace("px", ""));

var threeColumnWindowHalfX = window.innerWidth / 2;
var threeColumnWindowHalfY = window.innerHeight / 2;

var clock1 = new THREE.Clock();

threeColumnInit();
threeColumnAanimate();
threeColumnMoveCloud(window.scrollY);


var threeColumnMaterial = new THREE.MeshLambertMaterial({
    color: blobClor,
    transparent: true,
    opacity: 1.0
});



function threeColumnInit() {
    // basic threeColumnScene
    threeColumnRenderer = new THREE.WebGLRenderer({
        alpha: true,
    });
    var width = window.innerWidth;
    var height = window.innerHeight;

    threeColumnRenderer.setSize(width, height);

    document.getElementById("three-column-webgl-wrapper").appendChild(threeColumnRenderer.domElement);

    threeColumnScene = new THREE.Scene();

    threeColumnCamera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    threeColumnCamera.position.y = 0;
    threeColumnCamera.position.z = 150;

    var manager = new THREE.LoadingManager();
    var loader = new THREE.OBJLoader(manager);

    // morph_script_params.theme_path +
    loader.load('/wp-content/themes/banxa/assets/js/half_sphere.obj', function(threeColumnLoadedobject) {
        threeColumnLoadedobject.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = threeColumnMaterial;
            }
        });

        // purple
        threeColumnLoadedSphere = threeColumnLoadedobject;
        threeColumnLoadedobject.scale.set(50, 50, 50);
        threeColumnLoadedobject.position.set(0, 40, 0);
        threeColumnLoadedobject.rotation.z = -90;

        threeColumnScene.add(threeColumnLoadedobject);
    });

    var light = new THREE.AmbientLight(0xffffff, 1.0);
    threeColumnScene.add(light);
}

function threeColumnOnWindowResize() {
    threeColumnWindowHalfX = window.innerWidth / 2;
    threeColumnWindowHalfY = window.innerHeight / 2;

    threeColumnCamera.aspect = window.innerWidth / window.innerHeight;
    threeColumnCamera.updateProjectionMatrix();
}

function threeColumnOnDocumentScroll(event) {
    threeColumnLastScrollPos = window.scrollY;

    if (!threeColumnTicking) {
        window.requestAnimationFrame(function() {
            threeColumnMoveCloud(threeColumnLastScrollPos);
            threeColumnTicking = false;
        })
    }

    threeColumnTicking = true;
}

function threeColumnMoveCloud(d) {
    var minX = 0;
    var maxX = 70;
    var rX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;

    var pa = ((d / threeColumnElForHeight.offsetHeight) * 100) * 1.3;

    threeColumnElToMove.style.transform = 'translatex(-' + rX + '%)';
    threeColumnElToMove.style.width = (((threeColumnElToMoveWidth / 100) * pa) + threeColumnElToMoveWidth) + 'px';
}

var windowWidth = window.innerWidth;
if (windowWidth > 540) {
    window.addEventListener('resize', threeColumnOnWindowResize, false);
}

function threeColumnAanimate() {
    setTimeout(function() {
        requestAnimationFrame(threeColumnAanimate);
    }, 1000 / 25);
    threeColumnRender();
}

function threeColumnCloudShimy() {
    d = window.scrollY;
    var minY = 1;
    var maxY = 4;
    var rY = (Math.floor(Math.random() * (maxY - minY + 1)) + minY) * 100;
    var minX = 0;
    var maxX = 70;
    var rX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var x = ((d / threeColumnElForHeight.offsetHeight) * 100) * 1.3;
    var y = d > 100 ? d + rY : d;

    threeColumnElToMove.style.transform = 'translate(-' + rX + '%, ' + y + 'px)';
    threeColumnElToMove.style.width = (((threeColumnElToMoveWidth / 100) * x) + threeColumnElToMoveWidth) + 'px';
}

function threeColumnScrollStop(callback, refresh = 66) {
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

function threeColumnRender() {
    var delta = clock1.getDelta();

    if (threeColumnLoadedSphere) threeColumnLoadedSphere.rotation.y -= 0.5 * delta;
    if (threeColumnLoadedSphere) threeColumnLoadedSphere.rotation.z += 0.3 * delta;


    document.addEventListener('scroll', threeColumnOnDocumentScroll, false);

    threeColumnCamera.lookAt(threeColumnScene.position);

    threeColumnRenderer.render(threeColumnScene, threeColumnCamera);
}