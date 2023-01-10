// Style(s)
import '../styles/main.scss';
import SimpleModalComponent from './components/SimpleModal';



// Module(s)
import NoJSModule from './modules/NoJSModule';
import ThreeSceneModule from './modules/ThreeSceneModule';


// App
const App = (() => {
    let NoJS = null;
    let ThreeScene = null;
    let SimpleModal = null;
    let rafID = null;

    function raf() {
        ThreeScene.animate();
        rafID = requestAnimationFrame(raf);
    }

    function bindWindowEvents() {
        window.addEventListener('resize', (e) => {
            ThreeScene.resize();
        });

        window.addEventListener('keydown', function(e){
            if (e.key === 'Escape') {
                SimpleModal.closeModal();
            }
        });
    }

    function createObjects() {
        NoJS = new NoJSModule();
        ThreeScene = new ThreeSceneModule({ dom: '#scene', orbitControls: true });
        SimpleModal = new SimpleModalComponent('data-modal="MODAL-ID"');
    }

    function init() {
        createObjects();
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
        App.init();
    }
});
