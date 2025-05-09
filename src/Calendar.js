import throttle from "./throttle.js";

/**
 * реализует выбор промежутка дат в календаре
 */

export default class Calendar {
    constructor() {
        this._component = document.querySelector(".calendar");
        this._btns = this._component.querySelectorAll(".calendar__btn");
        this._onClick = this._onClick.bind(this);
        this._onPointerEnter = throttle(this._onPointerEnter, this, 50);
        // this._onPointerEnter = this._onPointerEnter.bind(this);

        this._component.addEventListener("click", this._onClick);
        this._component.addEventListener("pointermove", this._onPointerEnter);

        this._start = null;
        this._end = null;
    }

    _onClick(event) {
        const dayBtn = event.target.closest(".calendar__btn");

        if (dayBtn === null) return;

        const index = +dayBtn.dataset.index;

        if (this._start === null) {
            this._start = index;
            this._end = this._start;

            dayBtn.classList.add("calendar__btn--state--active");

            return;
        }

        if (this._start === index) {
            this._start = null;
            this._end = null;

            dayBtn.classList.remove("calendar__btn--state--active");

            return;
        }

        const start = this._start;
        this._start = index < start ? index : start;
        this._end = index > start ? index : start;
        this._updateRange();
    }

    _onPointerEnter(event) {
        const dayBtn = event.target.closest(".calendar__btn");

        if (dayBtn === null || this._start === null || this._start !== this._end) return;

        if (this._start !== null) {
            const index = +dayBtn.dataset.index;
            const start = index < this._start ? index : this._start;
            const end = index >= this._start ? index : this._start;
            this._updateRange(start, end);
        }
    }

    _updateRange(start = this._start, end = this._end) {
        this._btns.forEach((btn, i) => {
            const isInactive = i < start || i > end;
            const isStart = i === start;
            const isEnd = i === end;
            const isMid = !isStart && !isEnd;
            const isSingle = isStart && isEnd;

            btn.classList.toggle("calendar__btn--state--active", !isInactive && isSingle);
            btn.classList.toggle("calendar__btn--state--start", !isInactive && !isSingle && isStart);
            btn.classList.toggle("calendar__btn--state--middle", !isInactive && !isSingle && isMid);
            btn.classList.toggle("calendar__btn--state--end", !isInactive && !isSingle && isEnd);
        });
    }
}