class Darkmode {
    constructor(options) {
        const bottom = (options && options.bottom) || '32px';
        const right = (options && options.right) || '32px';
        const left = (options && options.left) || 'unset';
        const time = (options && options.time) || '0.3s';
        const mixColor = (options && options.mixColor) || '#fff';
        const backgroundColor = (options && options.backgroundColor) || '#fff';
        const buttonColorDark = (options && options.buttonColorDark) || '#000';
        const buttonColorLight = (options && options.buttonColorLight) || '#fff';
        const label = (options && options.label) || '';
        /* eslint-disable */
        const autoMatchOsTheme =
            options && options.autoMatchOsTheme === false ? false : true;
        /* eslint-enable */

        const css = `
            .darkmode-layer {
                position: fixed;
                pointer-events: none;
                background: ${mixColor};
                transition: all ${time} ease;
                mix-blend-mode: difference;
            }
            .darkmode-layer--button {
                width: 2.9rem;
                height: 2.9rem;
                border-radius: 50%;
                right: ${right};
                bottom: ${bottom};
                left: ${left};
            }
            .darkmode-layer--simple {
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                transform: scale(1) !important;
            }
            .darkmode-layer--expanded {
                transform: scale(100);
                border-radius: 0;
            }
            .darkmode-layer--no-transition {
                transition: none;
            }
            .darkmode-toggle {
                background: ${buttonColorDark};
                z-index: 1337;
                width: 3rem;
                height: 3rem;
                position: fixed;
                border-radius: 50%;
                right: ${right};
                bottom: ${bottom};
                left: ${left};
                cursor: pointer;
                transition: all 0.5s ease;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .darkmode-toggle--white {
                background: ${buttonColorLight};
            }
            .darkmode-background {
                background: ${backgroundColor};
                position: fixed;
                pointer-events: none;
                z-index: -10;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
            img, .darkmode-ignore {
                isolation: isolate;
                display: inline-block;
            }
            @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
                .darkmode-toggle {display: none !important}
            }
            @supports (-ms-ime-align:auto), (-ms-accelerator:true) {
                .darkmode-toggle {display: none !important}
            }
        `;

        const layer = document.createElement('div');
        const button = document.createElement('div');
        const background = document.createElement('div');

        button.innerHTML = label;
        layer.classList.add('darkmode-layer');
        background.classList.add('darkmode-background');

        const darkmodeActivated =
            window.localStorage.getItem('darkmode') === 'true';
        const preferedThemeOs =
            autoMatchOsTheme &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        const darkmodeNeverActivatedByAction =
            window.localStorage.getItem('darkmode') === null;

        if (
            (darkmodeActivated === true) ||
            (darkmodeNeverActivatedByAction && preferedThemeOs)
        ) {
            layer.classList.add(
                'darkmode-layer--expanded',
                'darkmode-layer--simple',
                'darkmode-layer--no-transition'
            );
            button.classList.add('darkmode-toggle--white');
            document.body.classList.add('darkmode--activated');
        }

        document.body.insertBefore(button, document.body.firstChild);
        document.body.insertBefore(layer, document.body.firstChild);
        document.body.insertBefore(background, document.body.firstChild);

        this.addStyle(css);

        this.button = button;
        this.layer = layer;
        this.time = time;
    }

    addStyle(css) {
        const linkElement = document.createElement('link');

        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('type', 'text/css');
        linkElement.setAttribute(
            'href',
            'data:text/css;charset=UTF-8,' + encodeURIComponent(css)
        );
        document.head.appendChild(linkElement);
    }

    showWidget() {
        const button = this.button;
        const layer = this.layer;
        const time = parseFloat(this.time) * 1000;

        button.classList.add('darkmode-toggle');
        layer.classList.add('darkmode-layer--button');

        button.addEventListener('click', () => {
            const isDarkmode = this.isActivated();

            if (!isDarkmode) {
                layer.classList.add('darkmode-layer--expanded');
                setTimeout(() => {
                    layer.classList.add('darkmode-layer--no-transition');
                    layer.classList.add('darkmode-layer--simple');
                }, time);
            } else {
                layer.classList.remove('darkmode-layer--simple');
                setTimeout(() => {
                    layer.classList.remove('darkmode-layer--no-transition');
                    layer.classList.remove('darkmode-layer--expanded');
                }, 1);
            }

            button.classList.toggle('darkmode-toggle--white');
            document.body.classList.toggle('darkmode--activated');
            window.localStorage.setItem('darkmode', !isDarkmode);
        });
    }

    toggle() {
        const layer = this.layer;
        const isDarkmode = this.isActivated();

        layer.classList.toggle('darkmode-layer--simple');
        document.body.classList.toggle('darkmode--activated');
        window.localStorage.setItem('darkmode', !isDarkmode);
    }

    isActivated() {
        return document.body.classList.contains('darkmode--activated');
    }
}

(function() {
    new Darkmode().showWidget();
})();