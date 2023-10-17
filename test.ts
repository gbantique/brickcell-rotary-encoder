Brickcell.onPress(function () {
    count = 0
    serial.writeLine("" + (count))
})
Brickcell.onRotate(RotationDirection.Right, function () {
    count += 1
    serial.writeLine("" + (count))
})
Brickcell.onRotate(RotationDirection.Left, function () {
    count += -1
    serial.writeLine("" + (count))
})
let count = 0
Brickcell.initRotary(DigitalPin.P0, DigitalPin.P1, DigitalPin.P2)
serial.setBaudRate(BaudRate.BaudRate115200)
count = 0
serial.writeLine("" + (count))
