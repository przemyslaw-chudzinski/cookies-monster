const defaultConfig = require('./default-config');

window.CookiesMonster = (function () {

    let _config = {};

    // Init plugin
    const init = (config = {}) => {
        // Check browser support of local storage
        if (!('localStorage' in window)) throw new Error('your browser does\'nt support localstorage');

        _config = {...defaultConfig, ...config};

        // Check is it confirm
        if (_confirmed()) return true;


        if (!config.templateSelector) throw new Error('templateSelector must be specified');

        // Find cookies template
        const tpl = document.querySelector(config.templateSelector);

        if (!tpl) throw new Error('template does not exist');

        const containerID = 'tpl-id-' + Date.now();

        tpl && _render(tpl, containerID);

        const tplContainer = document.querySelector('#' + containerID);
        const closeTrigger = tplContainer ? tplContainer.querySelector('[data-close-trigger]') : null;

        closeTrigger && closeTrigger.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            _confirm(tplContainer);
        }, true);

    };

    const _render = (tpl, containerID) => {
        const currentContainer = document.querySelector('#' + containerID);
        currentContainer && currentContainer.remove();

        const tplContainer = document.createElement('div');
        tplContainer.id = containerID;
        tplContainer.innerHTML = tpl.innerHTML;
        document.body.append(tplContainer);
    };

    // Check is it confirmed
    const _confirmed = () => !!localStorage.getItem(_config.lsKey);

    const _confirm = tplContainer => {
        localStorage.setItem(_config.lsKey, 'accepted');
        tplContainer.remove();
    };

    return {
        init
    };


})();
