# Solar24 Framework

A flexible 2D game JS framework designed for easy customization.

## Installation

```bash
npm install solar24
```

```js
import GameController from 'solar24-framework';

const config = { level: 1, cameraElementId: 'camera', canvasElementId: 'canvas' };
const game = new GameController(config);
game.start();
```