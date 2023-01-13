// Style(s)
import '../styles/main.scss';

// Components(s)
import SimpleModalComponent from './components/SimpleModal/SimpleModal';
import NoJSModule from './components/NoJS/NoJS';
import ThreeExperience from './components/Three/Experience';

// App
const App = (() => {
    let NoJS = null;
    let DemoModal = null;
    let DemoExperience = null;
    let playing = false;
    let requestID = null;

    function update() {
        DemoExperience.update();
        requestID = requestAnimationFrame(update);
    }

    function play() {
        if (!playing) {
            update();
            playing = true;
        }
    }

    function stop() {
        if (playing) {
            cancelAnimationFrame(requestID);
            playing = false;
        }
    }

    function bind() {
        window.addEventListener('resize', (e) => {
            DemoExperience.resize();
        });

        window.addEventListener('keydown', function(e){
            if (e.key === 'Escape') {
                DemoModal.close();
            }
        });

        window.addEventListener('mousemove', function(e){
            DemoExperience.mouse = e;
            DemoExperience.cursor.x = e.clientX / DemoExperience.width - 0.5;
            DemoExperience.cursor.y = e.clientY / DemoExperience.height - 0.5;
        });

        window.addEventListener('wheel', function(e){
            DemoExperience.wheel = e;
        });
    }

    function create() {
        NoJS = new NoJSModule();
        DemoModal = new SimpleModalComponent({ domSelector: 'data-modal="MODAL-ID"', overflowHide: false });
        DemoExperience = new ThreeExperience({ domSelector: '#scene', orbitControls: true, showGUI: true });
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
