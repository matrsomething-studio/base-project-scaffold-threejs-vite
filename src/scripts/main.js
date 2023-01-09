// Style(s)
import '../styles/main.scss';


// Module(s)
import NoJS from './modules/NoJS';
import THREEJS_SCENE_NAME from './modules/THREEJS_SCENE_NAME';


// Main
const APP = (() => {
    let NO_JS = null;
    let THREEJS_SCENE = null;
    let RAFID = null;

    function raf() {
        THREEJS_SCENE.animate();
        RAFID = requestAnimationFrame(raf);
    }

    function bindWindowEvents() {
        window.addEventListener('resize', (e) => {
            THREEJS_SCENE.resize();
        });
    }

    function init() {
        NO_JS = new NoJS();
        THREEJS_SCENE = new THREEJS_SCENE_NAME({ sceneContainer: '#scene' });
        bindWindowEvents();
        requestAnimationFrame(raf);
    }
    
    return {
        init: init
    };
})();


// Load App
document.addEventListener('readystatechange', e => {
    if (e.target.readyState === 'complete') {
        APP.init();
    }
});
