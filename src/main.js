import './style.scss';
import svg from './svg.js';
import Calendar from './Calendar.js';
import ThemeToggler from './ThemeToggler.js';

const days = [ ...new Array(35) ];

document.querySelector('#app').innerHTML = `
    <button class="toggle-theme-btn" type="button" aria-label="переключить цветовую тему"></button>
    <div class="calendar calendar--theme--alpaca">
        <div class="calendar__header">
            <button class="calendar__month-btn calendar__month-btn--type--prev" aria-label="предыдущий месяц">${svg("arrow", {
                className: "calendar__icon",
                width: 32,
                height: 32,
            })}</button>
            <div class="calendar__month">Январь</div>
            <button class="calendar__month-btn calendar__month-btn--type--next" aria-label="следующий месяц">${svg("arrow", {
                className: "calendar__icon",
                width: 32,
                height: 32,
            })}</button>
        </div>
        <div class="calendar__body">${
            days
                .map((item, index) => {
                    // по-быстрому набросал для соответствия макету
                    const indexToDay = index + 1;
                    const tmpDay = indexToDay % 31;
                    const day = tmpDay === 0 ? 31 : tmpDay;
                    const isNextMonth = indexToDay >= 32;

                    return `<button class="calendar__btn${isNextMonth ? " calendar__btn--type--other-month" : ""}" type="button" data-index="${index}"><span class="calendar__day">${day}</span></button>`;
                })
                .join("")
        }</div>
    </div>
`;

const themeToggler = new ThemeToggler({
    btnSelector: ".toggle-theme-btn",
    btnLightStateClassName: "toggle-theme-btn--state--light",
    btnDarkStateClassName: "toggle-theme-btn--state--dark",
});

const calendar = new Calendar();