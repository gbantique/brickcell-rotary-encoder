/**
 * tests go here; this will not be compiled when this package is used as a library
 */
RotaryEncoder.onRotateEvent(RotationDirection.Left, function () {
    // serial.writeString("rotate left\n");
    item += -1
})
RotaryEncoder.onPressEvent(function () {
    // serial.writeString("onPress\n");
    item = 5
    basic.showIcon(IconNames.Heart)
})
RotaryEncoder.onRotateEvent(RotationDirection.Right, function () {
    // serial.writeString("rotate right\n");
    item += 1
})
let item = 0
item = 5
RotaryEncoder.init(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13)
basic.forever(function () {
    basic.showNumber(item)
})
