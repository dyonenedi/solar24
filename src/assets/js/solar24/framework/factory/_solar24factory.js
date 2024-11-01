import ISolar24Factory from './isolar24factory';
import Runtime from '../core/runtime';
import Map from "../core/map"
import Camera from '../core/camera';
import Screen from '../core/screen';

class Soloar24Factory extends ISolar24Factory{
    constructor(config) {
        super();
        this.config = config;
    }

    createRuntime() {
        return new Runtime();
    }

    createMap(maps) {
        return new Map(maps);
    }

    createCamera(cameraElementId) {
        const camera = new Camera();
        camera.setSize(cameraElementId);
        return camera;
    }

    createScreen(canvasElementId) {
        const screen = new Screen();
        screen.setup(canvasElementId);
        return screen;
    }
}

export default Soloar24Factory