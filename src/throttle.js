/**
 * ограничивает количество вызовов функции fn не более чем раз в ms милисекунд
 * 
 * @param {Function} fn - требуемая функция
 * @param {Object} ctx - контекст, в которой будет вызываться функция fn
 * @param {Number} ms - количество милисекунд
 * @returns {Function} - декоратор требуемой функции
 */
export default function throttle(fn, ctx, ms) {
    let pendingCall = null;
    let lastCall = -ms;

    const decorator = function() {
        const now = performance.now();
        const diff = now - lastCall;
        clearTimeout(pendingCall);

        if (diff >= ms) {
            lastCall = now;
            fn.call(ctx, ...arguments);
        }
        else {
            pendingCall = setTimeout(decorator, ms - diff, ...arguments);
        }
    };

    return decorator;
}