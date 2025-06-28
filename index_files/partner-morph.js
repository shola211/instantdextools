//three.js
if (jQuery("body").hasClass("page-id-265")) {
    var blobClor = 0xd726f8;
} else {
    var blobClor = 0x184cce;
}


var partnerWithBanxaCamera, partnerWithBanxaScene, partnerWithBanxaRenderer, partnerWithBanxaLoadedSphere;

var partnerWithBanxaTicking = false,
    partnerWithBanxaLastScrollPos = 0,
    partnerWithBanxaElForHeight = document.getElementById('partner-container'),
    partnerWithBanxaElToMove = document.getElementById('partner-webgl-wrapper'),
    partnerWithBanxaElToMoveWidth = parseFloat(getComputedStyle(partnerWithBanxaElToMove, null).width.replace("px", ""));

var partnerWithBanxaWindowHalfX = window.innerWidth / 2;
var partnerWithBanxaWindowHalfY = window.innerHeight / 2;

var clock1 = new THREE.Clock();

partnerWithBanxaInit();
partnerWithBanxaAanimate();
partnerWithBanxaMoveCloud(window.scrollY);

//blue blob
var partnerWithBanxaMaterial = new THREE.MeshLambertMaterial({
    color: blobClor,
    transparent: true,
    opacity: 1.0
});



function partnerWithBanxaInit() {
    // basic partnerWithBanxaScene
    partnerWithBanxaRenderer = new THREE.WebGLRenderer({
        alpha: true,
    });
    var width = window.innerWidth;
    var height = window.innerHeight;

    partnerWithBanxaRenderer.setSize(width, height);

    document.getElementById("partner-webgl-wrapper").appendChild(partnerWithBanxaRenderer.domElement);

    partnerWithBanxaScene = new THREE.Scene();

    partnerWithBanxaCamera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    partnerWithBanxaCamera.position.y = 0;
    partnerWithBanxaCamera.position.z = 150;

    var manager = new THREE.LoadingManager();
    var loader = new THREE.OBJLoader(manager);

    // morph_script_params.theme_path +
    loader.load('/wp-content/themes/banxa/assets/js/half_sphere.obj', function(partnerWithBanxaLoadedobject) {
        partnerWithBanxaLoadedobject.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = partnerWithBanxaMaterial;
            }
        });

        // purple
        partnerWithBanxaLoadedSphere = partnerWithBanxaLoadedobject;
        partnerWithBanxaLoadedobject.scale.set(50, 50, 50);
        partnerWithBanxaLoadedobject.position.set(0, 40, 0);
        partnerWithBanxaLoadedobject.rotation.z = -90;

        partnerWithBanxaScene.add(partnerWithBanxaLoadedobject);
    });

    var light = new THREE.AmbientLight(0xffffff, 1.0);
    partnerWithBanxaScene.add(light);
}

function partnerWithBanxaOnWindowResize() {
    partnerWithBanxaWindowHalfX = window.innerWidth / 2;
    partnerWithBanxaWindowHalfY = window.innerHeight / 2;

    partnerWithBanxaCamera.aspect = window.innerWidth / window.innerHeight;
    partnerWithBanxaCamera.updateProjectionMatrix();
}

function partnerWithBanxaOnDocumentScroll(event) {
    partnerWithBanxaLastScrollPos = window.scrollY;

    if (!partnerWithBanxaTicking) {
        window.requestAnimationFrame(function() {
            partnerWithBanxaMoveCloud(partnerWithBanxaLastScrollPos);
            partnerWithBanxaTicking = false;
        })
    }

    partnerWithBanxaTicking = true;
}

function partnerWithBanxaMoveCloud(d) {
    var minX = 0;
    var maxX = 70;
    var rX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;

    var pa = ((d / partnerWithBanxaElForHeight.offsetHeight) * 100) * 1.3;

    partnerWithBanxaElToMove.style.transform = 'translatex(-' + rX + '%)';
    partnerWithBanxaElToMove.style.width = (((partnerWithBanxaElToMoveWidth / 100) * pa) + partnerWithBanxaElToMoveWidth) + 'px';
}

var windowWidth = window.innerWidth;
if (windowWidth > 540) {
    window.addEventListener('resize', partnerWithBanxaOnWindowResize, false);
}

function partnerWithBanxaAanimate() {
    setTimeout(function() {
        requestAnimationFrame(partnerWithBanxaAanimate);
    }, 1000 / 25);
    partnerWithBanxaRender();
}

function partnerWithBanxaCloudShimy() {
    d = window.scrollY;
    var minY = 1;
    var maxY = 4;
    var rY = (Math.floor(Math.random() * (maxY - minY + 1)) + minY) * 100;
    var minX = 0;
    var maxX = 70;
    var rX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var x = ((d / partnerWithBanxaElForHeight.offsetHeight) * 100) * 1.3;
    var y = d > 100 ? d + rY : d;

    partnerWithBanxaElToMove.style.transform = 'translate(-' + rX + '%, ' + y + 'px)';
    partnerWithBanxaElToMove.style.width = (((partnerWithBanxaElToMoveWidth / 100) * x) + partnerWithBanxaElToMoveWidth) + 'px';
}

function partnerWithBanxaScrollStop(callback, refresh = 66) {
    // Make sure a valid callback was provided
    if (!callback || typeof callback !== 'function')
        return;

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

function partnerWithBanxaRender() {
    var delta = clock1.getDelta();

    if (partnerWithBanxaLoadedSphere)
        partnerWithBanxaLoadedSphere.rotation.y -= 0.5 * delta;
    if (partnerWithBanxaLoadedSphere)
        partnerWithBanxaLoadedSphere.rotation.z += 0.3 * delta;


    document.addEventListener('scroll', partnerWithBanxaOnDocumentScroll, false);

    partnerWithBanxaCamera.lookAt(partnerWithBanxaScene.position);

    partnerWithBanxaRenderer.render(partnerWithBanxaScene, partnerWithBanxaCamera);
}