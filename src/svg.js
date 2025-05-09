import SVGsprite from './sprite.svg?no-inline';

/**
 * Создает компонент с иконкой из спрайта
 * @param {String} icon - id иконки из спрайта
 * @param {Object} attrs - атрибуты на <svg>:
 *      @prop {String} className
 *      @prop {Number} width
 *      @prop {Number} height
 * @returns {String}
 */
export default (icon, attrs) => {
    const {
        className,
        width,
        height
    } = attrs;

    return `
        <svg class="${className}" width="${width}" height="${height}">
            <use xlink:href="${SVGsprite}#${icon}"></use>
        </svg>
    `;
};