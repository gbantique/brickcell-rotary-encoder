enum RotationDirection {
    Left = 0,
    Right = 1
}

//% color="#FFBF00" icon="\uf12e" weight=70
namespace Brickcell {
    let switchA: DigitalPin;
    let switchB: DigitalPin;
    let switchW: DigitalPin;
    
    let pressedID = 5600;
    let rotatedLeftID = 5605;
    let rotatedRightID = 5610;

    /**
     * Initialize rotary encoder pins
     */
    //% sa.defl=DigitalPin.P0 sb.defl=DigitalPin.P1 sw.defl=DigitalPin.P2
    //% block="Init Rotary:|sa:$sa sb:$sb sw:$sw"
    //% subcategory="rotary encoder"
    export function initRotary(sa:DigitalPin, sb:DigitalPin, sw:DigitalPin): void {
        pins.setPull(sa, PinPullMode.PullNone);
        pins.setPull(sb, PinPullMode.PullNone);
        pins.setPull(sw, PinPullMode.PullNone);
        switchA = sa;
        switchB = sb;
        switchW = sw;
    }

    /**
     * Handle onRotate event
     */
    //% block="on rotate |%dir"
    //% subcategory="rotary encoder"
    export function onRotate(dir: RotationDirection, body: () => void): void {
        // set the event ID according to the selected direction.
        if (dir == RotationDirection.Left) control.onEvent(rotatedLeftID, dir, body);
        if (dir == RotationDirection.Right) control.onEvent(rotatedRightID, dir, body);
        // set the callback function concurrent to the main process
        control.inBackground(() => {
            while (true) {
                // if falling edge is detected on switchA
                pins.onPulsed(switchA, PulseValue.Low, function () {
                    // check the logic level of switchB
                    if (pins.digitalReadPin(switchB) == 0) {
                        // call the event handler for the right rotation
                        control.raiseEvent(rotatedRightID, RotationDirection.Right);
                    } else {
                        // call the event handler for the left rotation
                        control.raiseEvent(rotatedLeftID, RotationDirection.Left);
                    }
                });
                // give time for other process
                basic.pause(20);
            }
        });
    }

    /**
     * Handle onPress event
     */
    //% block="onPress"
    //% subcategory="rotary encoder"
    export function onPress(body: () => void): void {
        // set the event ID for the press event
        control.onEvent(pressedID, 0, body);
        // set the callback function concurrent with the main process
        control.inBackground(() => {
            // which runs continuously
            while (true) {
                // checking if the button is press
                if (pins.digitalReadPin(switchW) == 1) {
                    // yes button is pressed, call the event
                    control.raiseEvent(pressedID, 0);
                }
                // give enough time for button press
                basic.pause(300);
            }
        })
    }
}
