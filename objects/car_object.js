let car  = {
    name: "Mustang",
    make: "Ford",
    year: 1987,
    origin: "USA",
    owners: 3,

    KilometersOnGas() {
        const liters = 50
        const distance = 540
        const gasUsed = liters / distance
        console.log(gasUsed)
    }
}

car.KilometersOnGas()
console.log(car)