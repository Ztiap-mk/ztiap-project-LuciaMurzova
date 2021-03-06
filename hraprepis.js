const IMAGES = [
    {name: 'Boat', src: 'ikony/lod.png'},
    {name: 'stone', src: 'ikony/skala.png'},
//    {name: 'miniWood', src: 'ikony/mini drevo.png'},
//    {name: 'wood', src: 'ikony/drevo.png'},
    {name: 'back', src: 'ikony/pozadie.png'},
];

var poloha = [5, 130, 255, 380];
var x = poloha[Math.round(Math.random()*3)];
class Boat {
    

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('Boat');

        this.x = x;      
        this.y = 425; 
        this.width = 100;
        this.height = 125;
        this.a = event.keyCode;
    };

    move() {
        document.onkeydown = function() {
          //  this.a = event.keyCode;
            switch(this.a) {
                case 37: { 
                    if(this.x != 10) 
                    this.x -= 125; 
                    break; }
                case 39: {
                    if(this.x != 385) 
                    this.x += 125;
                    break; }
            } 
        }
        
    };

    draw (ctx) {
        ctx.save();
     //   ctx.translate(this.x, this.y);
     //  ctx.scale(this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore();
    };
};

/*lass Obstacles {
    constructor
}*/

class ResourceManager {
    loadedImages = new Map();

    async init() {
        await this.loadImages();
    };

    async loadImages() {
        await Promise.all(
            IMAGES.map(image => this.loadImage(image)),
        )
    };

    async loadImage(imgResource) {
        return new Promise((resolve, reject) => {
           const img = new Image();
           img.src = imgResource.src;
           img.onload = () => {
               this.loadedImages.set(imgResource.name, img);
               resolve(img);
           } 
           img.onerror = (err) => {
               reject(err);
           }
        });
    };

    getImageSource(imageName) {
        const image = this.loadedImages.get(imageName);
        if (image == null) {
            throw new Error(`Image '${imageName}' not found`);
        }
        return image;
    }
}

const resourceManager = new ResourceManager();

class Game {
    time = Date.now;

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    objects = [];

    async start() {
        await resourceManager.init();

        this.bgImage = resourceManager.getImageSource('back');

        this.objects.push(new Boat());

        this.startLoop() ;
    }

    startLoop() {
        this.time = Date.now();
        this.step();
    }

    step() {
        const now = Date.now();
        const dt = (now - this.time) /100;
        this.time = now;

        this.move(dt);
        this.render();

        requestAnimationFrame(() => this.step());
    }

    move(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }

    clearCtx() {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        this.clearCtx();
        this.ctx.drawImage(this.bgImage,0,0,500,550);
        this.objects.forEach((object) => {
            object.draw(this.ctx);
        });
        
    };
};



window.onload = function() {    
    
    const game = new Game();
    game.start().then(() => console.log('done')).catch(err => console.error(err));

}
