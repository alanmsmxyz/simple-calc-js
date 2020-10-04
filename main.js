window.onload = () => {
    const display = document.getElementById('calc-display')
    const delBtn = document.getElementById('del-btn')
    const acBtn = document.getElementById('ac-btn')
    const eqBtn = document.getElementById('eq-btn')
    const fnBtnList = document.querySelectorAll('.fn-btn')

    const re = /[^0-9+\-*/.)]/

    /* Handle DEL button click */
    delBtn.addEventListener('click', () => {
        display.value = display.value.substring(0, display.value.length - 1)
    })

    /* Handle AC button click */
    acBtn.addEventListener('click', () => {
        display.value = ""
    })

    /* Handle number, point, and operators buttons click */
    fnBtnList.forEach((fnBtn) => {
        fnBtn.addEventListener('click', (e) => {
            display.value = (display.value === "err") ? e.currentTarget.dataset.fn : display.value + e.currentTarget.dataset.fn
            display.scrollLeft = display.scrollWidth; /* scroll display to left to show last input */
        })
    })

    eqBtn.addEventListener('click', () => {
        const expr = display.value

        /* Check if expr is empty or contains illegal character */
        if (expr === "" || re.test(expr)) {
            display.value = "err"
            return
        }

        /* try to evaluate the expression, rounded to 5 decimal point when needed */
        try {
            display.value = Math.round( eval(expr) * 100000 + Number.EPSILON ) / 100000
        } catch (err) {
            display.value = "err"
        }
    })

}
