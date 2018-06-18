const LynxariDevice = require(process.lynxari.device);
const device = require('@agilatech/mock');

module.exports = class Mock extends LynxariDevice {
    
    constructor(config) {

        const hardware = new device();

        super(hardware, config);

        this.hardware.watchValueAtIndex(0, (this._valueEvent).bind(this));
        
    }

    _valueEvent(err, val) {
        if (err) {
            this.error("Mock value error: " + err, {"error":err});
        }
        else {
            const propertyName = this.hardware.nameAtIndex(0);
            this[propertyName] = val;
            this.deviceProperties[propertyName].cur = val;
        }
    }
}
