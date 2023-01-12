// Style(s)
import '../styles/main.scss';

// Components(s)
import SimpleModalComponent from './components/SimpleModal';

// Module(s)
import NoJSModule from './modules/NoJSModule';
import ExperienceModule from './modules/Three/Experience';

// App
const App = (() => {
    let NoJS = null;
    let SimpleModal = null;
    let Experience = null;
    let isPlaying = false;
    let requestID = null;

    function raf() {
        Experience.update();
        requestID = requestAnimationFrame(raf);
    }

    function play() {
        if (!isPlaying) {
            raf();
            isPlaying = true;
        }
    }

    function stop() {
        if (isPlaying) {
            cancelAnimationFrame(requestID);
            isPlaying = false;
        }
    }

    function bindWindowEvents() {
        window.addEventListener('resize', (e) => {
            Experience.resize();
        });

        window.addEventListener('keydown', function(e){
            if (e.key === 'Escape') {
                SimpleModal.close();
            }
        });

        window.addEventListener('mousemove', function(e){
            Experience.setMouse(e);
        });

        window.addEventListener('wheel', function(e){
            Experience.setWheel(e);
        });
    }

    function create() {
        NoJS = new NoJSModule();
        Experience = new ExperienceModule({ domSelector: '#scene', orbitControls: true, showGUI: true });
        SimpleModal = new SimpleModalComponent({ domSelector: 'data-modal="MODAL-ID"', overflowHide: false });
    }

    function init() {
        create();
        bindWindowEvents();
        play();
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
