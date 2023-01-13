// Style(s)
import '../styles/main.scss';

// Components(s)
import SimpleModalComponent from './components/SimpleModal';

// Module(s)
import NoJSModule from './modules/NoJSModule';
import ThreeExperience from './modules/Three/Experience';

// App
const App = (() => {
    let NoJS = null;
    let SimpleModal = null;
    let Experience = null;
    let isPlaying = false;
    let requestID = null;

    function update() {
        Experience.update();
        requestID = requestAnimationFrame(update);
    }

    function play() {
        if (!isPlaying) {
            update();
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
            Experience.resize();
        });

        window.addEventListener('keydown', function(e){
            if (e.key === 'Escape') {
                SimpleModal.close();
            }
        });

        window.addEventListener('mousemove', function(e){
            Experience.mouse = e;
            Experience.cursor.x = e.clientX / Experience.width - 0.5;
            Experience.cursor.y = e.clientY / Experience.height - 0.5;
        });

        window.addEventListener('wheel', function(e){
            Experience.wheel = e;
        });
    }

    function create() {
        NoJS = new NoJSModule();
        SimpleModal = new SimpleModalComponent({ domSelector: 'data-modal="MODAL-ID"', overflowHide: false });
        Experience = new ThreeExperience({ domSelector: '#scene', orbitControls: true, showGUI: true });
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
