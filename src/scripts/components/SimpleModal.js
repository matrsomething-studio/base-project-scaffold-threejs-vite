// Util(s)

// Class - SimpleModal
export default class SimpleModal {
    constructor(el) {
        this.HTML = document.querySelector('html');
        this.modalCTA = document.querySelector(`[${el}]`);
        this.modal = document.getElementById(this.modalCTA.dataset.modal);
        this.modalCloseBtn = this.modal.querySelector('[data-modal-close]');
        this.isModalOpen = false;

        this.bindEvents();
    }

    open() {
        this.HTML.style.overflow = 'hidden';
        this.modal.classList.add('modal-open');
        this.isModalOpen = true;
    }

    close() {
        this.HTML.style.overflow = 'auto';
        this.modal.classList.remove('modal-open');
        this.isModalOpen = false;
    }

    bindEvents() {
        this.modalCTA.addEventListener('click', (e) => {
            e.preventDefault();
            this.open();
        });

        this.modalCloseBtn.addEventListener('click', () => {
            this.close();
        });
    }
}