const calculateButton = document.querySelector("button")
const priceResult = document.querySelector("#price-result")
const timeResult = document.querySelector("#time-result")

const inputs = document.querySelectorAll("input[type='text']")

inputs.forEach(input => input.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
}))

calculateButton.addEventListener("click", function () {
    console.clear()
    const smallBraids = Number(document.querySelector("#small-braids").value)
    const mediumBraids = Number(document.querySelector("#medium-braids").value)
    const largeBraids = Number(document.querySelector("#large-braids").value)
    const bubbles = Number(document.querySelector("#bubbles").value)
    const jumboPiece = Number(document.querySelector("#jumbo").value)
    const extraValue = Number(document.querySelector("#extra").value)

    if (!smallBraids && !mediumBraids && !largeBraids && !bubbles && !jumboPiece) {
        return
    }

    const productUsage = getRadioValue()

    console.log(productUsage);

    const productUsagePrice = productUsage === "lowUse" ? 10 : productUsage === "mediumUse"? 15 : 30

    const minute = (smallBraids * 12.5) + (mediumBraids * 15) + (largeBraids * 30) + (bubbles * 15) + (jumboPiece * 15)

    const hour = (minute / 60).toFixed(2)

    const roundedHour = roundHour(hour)

    console.log("Hora Arredondada:", roundedHour);

    const hourPrice = roundedHour > 1 ? roundedHour * 12 : 12

    console.log("Minutos:", minute)
    console.log("Horas:", hour);
    console.log("Preço da hora", hourPrice);

    const price = (smallBraids * 1.5) + (mediumBraids * 3) + (largeBraids * 5) + (bubbles * 3) + (jumboPiece * 7.5) + hourPrice + productUsagePrice + extraValue

    console.log("Preço", price);

    priceResult.textContent = `Price: R$ ${price.toFixed(2)}`
    timeResult.textContent = `Hours of work: ${Math.floor(hour)}H${minute.toFixed(0) - Math.floor(hour) * 60}M`

})

function getRadioValue() {
    return Array.from(document.querySelectorAll('[name="produtos"]')).find(product => product.checked).value;
}

function roundHour(num) {
    var int = Math.floor(num);

    if (int === 0) {
        return int
    }

    var decimal = num - int;

    if (decimal <= 0.25) {
        return int;
    } else if (decimal < 0.5) {
        return int + 0.25;
    } else if (decimal < 0.75) {
        return int + 0.5
    } else {
        return Math.ceil(num);
    }
}