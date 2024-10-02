class _Character {
    constructor(Screen, CollisionDetector) {
        // INGEÇÕES DE DEPENDENCIA SOLID
        this.Screen = Screen;
        this.CollisionDetector = CollisionDetector;

        // CLASS PROPS
        this.SIZE_X_SCREEN = 4;
        this.WEIGHT = 20;
        this.GRAVITY = 0.4;
        this.MAX_MOVE_VELOCITY = 2;
        this.MAX_FALL_VELOCITY = 9;
        this.MOVE_STRENGTH = 10;
        this.JUMP_STRENGTH = 190;
        this.MOVE_ACCELERATION = (this.MOVE_STRENGTH / this.WEIGHT);
        this.JUMP_ACCELERATION = (this.JUMP_STRENGTH / this.WEIGHT);
        
        // Faz a transformação das constantes conforme o tamanho da tela.
        this.weight = this.WEIGHT * this.Screen.h / 480;
        this.gravity =  this.GRAVITY * this.Screen.h / 480
        this.maxMoveVelocity = this.MAX_MOVE_VELOCITY * this.Screen.w / 960;
        this.maxFallVelocity = this.MAX_FALL_VELOCITY * this.Screen.h / 480;
        this.moveStrength = this.MOVE_STRENGTH * this.Screen.w / 960;
        this.jumpStrength = this.JUMP_STRENGTH * this.Screen.h / 480;
        this.moveAcceleration = this.MOVE_ACCELERATION * this.Screen.w / 960;
        this.jumpAcceleration = this.JUMP_ACCELERATION * this.Screen.h / 480;

        this.xVelocity = 0;
        this.yVelocity = 0;

        this.bodyColor = "#333";
        this.size = this.Screen.bkockSize / this.SIZE_X_SCREEN;
        this.w = this.size;
        this.h = this.size;
        this.x = 0;
        this.xx = this.x + this.size;
        this.y = this.Screen.h - this.h;
        this.yy = this.y + this.size;

        // Só visual
        this.eyeColor = "#d7f3f0";
        this.xEyeLeft = (this.size / 5);
        this.xEyeRight = (this.size / 5) * 4;
        this.xEye = this.xEyeRight;
        this.yEye = (this.size / 2.5);
        this.eyeRadio = this.size / 5;

        this.jumping = false;
        this.keys = ['ArrowLeft', 'ArrowLeft', " ", 'click', 'a', 'd', 'w'];
        this.direction = { left: false, right: false, up: false, down: false };

        // Configurar eventos de teclado dentro do construtor
        window.addEventListener('keydown', this.#handleKeyDown.bind(this));
        window.addEventListener('keyup', this.#handleKeyUp.bind(this));
        this.Screen.canvas.addEventListener('mousedown', this.#handleClickDown.bind(this));
        this.Screen.canvas.addEventListener('mouseup', this.#handleClickUp.bind(this));
    }

    // ######################### UPDATE #########################
    update() {
        // Seto novas posições do personagem
        this.direction.left = false;
        this.direction.right = false;
        this.direction.up = false;
        this.direction.down = false;

        if ((this.keys['ArrowLeft'] || this.keys['a']) && !this.keys['ArrowRight']) {
            this.#moveLeft();
            this.direction.left = true;
            this.xEye = this.xEyeLeft;
        }

        if ((this.keys['ArrowRight'] || this.keys['d']) && !this.keys['ArrowLeft']) {
            this.#moveRight();
            this.direction.right = true;
            this.xEye = this.xEyeRight;
        }

        if ((this.keys[" "] || this.keys['w'] || this.keys['click']) && this.yVelocity == 0 && !this.jumping) {
            this.yVelocity = this.jumpAcceleration;
            this.jumping = true;
        }

        if (this.jumping && this.yVelocity > 0) {
            this.direction.up = true;
            this.#jump();
        } else {
            this.jumping = false;
            this.direction.down = true;
            this.#fall();
        }

        // Valido colisão retornando posição máxima permitida
        let CollisionDirection = this.CollisionDetector.checkCollisionEnv(this, true, true);
        if (Object.values(CollisionDirection).some(value => value)) {
            this.#onCollisionRevert(CollisionDirection);
        }
    }
    // ######################### DRAW #########################
    draw(ctx) {
        // Desenha o Corpo
        ctx.fillStyle = this.bodyColor;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        // console.log(this.x + " - " + this.y + " - " + this.w + " - " + this.h)

        // Desenha os olhos
        ctx.beginPath();
        ctx.arc((this.x + this.xEye), (this.y + this.yEye), this.eyeRadio, 0, Math.PI * 2);
        ctx.fillStyle = this.eyeColor;
        ctx.fill();
        ctx.closePath();
    }

    // ######################### ON COLISION #########################
    #onCollisionRevert(CollisionDirection) {
        if (CollisionDirection.left) {
            this.x += CollisionDirection.left;
            this.xx = this.x + this.size;
            this.#resetAxiValue('x');
        }
        if (CollisionDirection.right) {
            this.xx -= CollisionDirection.right;
            this.x = this.xx - this.size;
            this.#resetAxiValue('x');
        }
        if (CollisionDirection.up) {
            this.y += CollisionDirection.up;
            this.yy = this.y + this.size;
            this.#resetAxiValue('y');
        }
        if (CollisionDirection.down) {
            this.yy -= CollisionDirection.down;
            this.y = this.yy - this.size;
            this.#resetAxiValue('y');
            this.jumping = false;
        }
    }
    #handleClickDown(e) {
        this.keys['click'] = true;
    }
    #handleClickUp(e) {
        this.keys['click'] = false;
    }
    #handleKeyDown(e, mouse=false) {
        this.keys[e.key] = true;
    }
    #handleKeyUp(e, mouse=false) {
        this.keys[e.key] = false;
        
        if (e.key != " ") {
            this.#resetAxiValue("x");
        }
    }
    #moveLeft() {
        this.xVelocity += (this.xVelocity >= this.maxMoveVelocity) ? 0 : this.moveAcceleration;
        this.x += this.xVelocity * -1;
        this.xx = this.x + this.size;
    }
    #moveRight() {
        this.xVelocity += (this.xVelocity >= this.maxMoveVelocity) ? 0 : this.moveAcceleration;
        this.x += this.xVelocity;
        this.xx = this.x + this.size;
    }
    #jump() {
        this.yVelocity -= this.gravity;
        this.yVelocity = (this.yVelocity <= 0) ? 0 : this.yVelocity;
        this.y += this.yVelocity * -1;
        this.yy = this.y + this.size;
    }
    #fall() {
        this.yVelocity += this.gravity;
        this.yVelocity = (this.yVelocity >= this.maxFallVelocity) ? this.maxFallVelocity : this.yVelocity;
        this.y += this.yVelocity;
        this.yy = this.y + this.size;
    }
    #resetAxiValue(axi) {
        if (axi == "x") {
            this.xVelocity = 0;
        } else {
            this.yVelocity = 0;
        }
    }
}

export default _Character;
