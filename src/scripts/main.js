// Style(s)
import '../styles/main.scss';

// Components(s)
import SimpleModalComponent from './components/SimpleModal';

// Module(s)
import NoJSModule from './modules/NoJSModule';
import BaseModule from './modules/Three/Base';

// App
const App = (() => {
    let NoJS = null;
    let SimpleModal = null;
    let Base = null;
    let isPlaying = false;
    let requestID = null;

    function raf() {
        Base.update();
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

    function bind() {
        window.addEventListener('resize', (e) => {
            Base.resize();
        });

        window.addEventListener('keydown', function(e){
            if (e.key === 'Escape') {
                SimpleModal.close();
            }
        });

        window.addEventListener('mousemove', function(e){
            Base.mouse = e;
            Base.cursor.x = e.clientX / Base.width - 0.5;
            Base.cursor.y = e.clientY / Base.height - 0.5;
        });

        window.addEventListener('wheel', function(e){
            Base.wheel = e;
        });
    }

    function create() {
        NoJS = new NoJSModule();
        Base= new BaseModule({ domSelector: '#scene', orbitControls: true, showGUI: true });
        SimpleModal = new SimpleModalComponent({ domSelector: 'data-modal="MODAL-ID"', overflowHide: false });
    }

    function init() {
        create();
        bind();
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
