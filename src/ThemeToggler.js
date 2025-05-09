import svg from './svg.js';

/**
 * переключатель темы оформления сайта
 * 
 * @constructor
 *      @prop {String} defaultTheme
 * 
 * @public @method toggle - переключает тему на противоположную текущей
 */

export default class ThemeToggler {
    constructor({
        defaultTheme = "light",
        btnSelector,
        btnLightStateClassName = "",
        btnDarkStateClassName = "",
        lightThemeClassName = "light-theme",
        darkThemeClassName = "dark-theme",
    }) {
        this._defaultTheme = defaultTheme;
        this._oppositeDefaultTheme = defaultTheme === "light" ? "dark" : "light";
        this._root = document.documentElement;
        this._btns = [ ...document.querySelectorAll(btnSelector) ];
        this._btnLightStateClassName = btnLightStateClassName;
        this._btnDarkStateClassName = btnDarkStateClassName;
        this._lightThemeClassName = lightThemeClassName;
        this._darkThemeClassName = darkThemeClassName;

        this.toggle = this.toggle.bind(this);
        this._updateThemeStuff = this._updateThemeStuff.bind(this);

        this._btns.forEach((btn) => {
            btn.addEventListener("click", this.toggle);
        });

        this._matchMediaSupport = typeof window.matchMedia === "function";
        this._themeMedia = `(prefers-color-scheme: ${this._oppositeDefaultTheme})`;

        if (this._matchMediaSupport) {
            window
                .matchMedia(this._themeMedia)
                .addEventListener("change", this._updateThemeStuff);
        }

        this._updateThemeStuff();
    }

    /**
     * переключает тему на "противоположную"
     */
    toggle() {
        const isTargetThemeLight = !this._isCurrentLight;

        this._toggleBtnsState(isTargetThemeLight ? "light": "dark");
        this._root.classList.toggle(this._lightThemeClassName, isTargetThemeLight);
        this._root.classList.toggle(this._darkThemeClassName, !isTargetThemeLight);

        this._isCurrentLight = !this._isCurrentLight;
    }

    /**
     * добавляет на кнопки соответствующие модификаторы,
     * чтобы их внешний вид соответствовал текущей теме
     * @param {String} targetTheme - принимает только 2 значения: "light" и "dark"
     */
    _toggleBtnsState(targetTheme) {
        const isTargetThemeLight = targetTheme === "light";

        this._btns.forEach((btn) => {
            if (this._btnLightStateClassName !== "") {
                btn.classList.toggle(this._btnLightStateClassName, isTargetThemeLight);
            }
            if (this._btnDarkStateClassName !== "") {
                btn.classList.toggle(this._btnDarkStateClassName, !isTargetThemeLight);
            }
            btn.setAttribute("aria-label", `Переключиться на ${isTargetThemeLight ? "темную" : "светлую"} тему`);
            btn.innerHTML = svg(isTargetThemeLight ? "moon" : "sun", {
                className: `toggle-theme-btn__icon${isTargetThemeLight ? " toggle-theme-btn__icon--type--moon" : ""}`,
                width: 50,
                height: 50
            });
        });
    }

    /** 
     * определяет текущую реальную тему
     * обновляет параметры _currentTheme и _isCurrentLight
     * и меняет стейт кнопок при смене тем через медиа prefers-color-scheme
     */
    _updateThemeStuff() {
        const hasLight = this._root.classList.contains(this._lightThemeClassName);
        const hasDark = this._root.classList.contains(this._darkThemeClassName);
        const isDefaultThemeBehavior = !hasLight && !hasDark;

        if (isDefaultThemeBehavior) {
            this._currentTheme = (
                    this._matchMediaSupport
                &&  window.matchMedia(this._themeMedia).matches
            ) ? this._oppositeDefaultTheme : this._defaultTheme;
        }
        else {
            this._currentTheme = hasLight ? "light" : "dark";
        }

        this._isCurrentLight = this._currentTheme === "light";
        this._toggleBtnsState(this._currentTheme);
    }
}