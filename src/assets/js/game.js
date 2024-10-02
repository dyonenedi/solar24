import _Env from "./obj/environment"
import _Character from "./obj/character"
import _CollisionDetector from "./util/collisionDetector"
import _Screen from "./util/screen"
import _Camera from "./util/camera"

const Game = () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height;

    var Screen = new _Screen(CANVAS_WIDTH, CANVAS_HEIGHT, canvas);
    var Env = new _Env(Screen);
    var CollisionDetector = new _CollisionDetector(Env);
    var Character = new _Character(Screen, CollisionDetector);
    var Camera = new _Camera(Screen, Character);

    const animate = ()=>{
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        Env.draw(ctx);
        Character.update();
        Character.draw(ctx);
        Camera.update();
        requestAnimationFrame(animate);
    }

    animate();
}

export default Game