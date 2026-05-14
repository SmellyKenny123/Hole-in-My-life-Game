var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');


function Game() {
	var g = this;
	
	var iteration;
	
	const tileWidth = 48;
	const tileHeight = tileWidth;
	
	canvas.width = 48*12;
	canvas.height = 48*12;
	
	var levels = [
		{
			map: [
			[1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,1,0,0,0,0,1],
			[1,0,0,1,0,0,1,0,0,1,1,1],
			[1,1,0,1,0,0,1,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,1,1,1,1,0,1],
			[1,0,1,1,0,0,1,0,0,0,0,1],
			[1,0,0,1,0,0,1,0,0,0,0,1],
			[1,0,0,1,0,0,1,0,0,1,1,1],
			[1,1,0,1,0,0,1,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1]
			],
			hero: { x: 5, y: 10 },
			item: { x: 10, y: 1 },
			npc: { x: 3, y: 8, dialog: 'Hello there! Welcome to King Court.' }
		},
		{
			map: [
			[1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,1,1,0,1,1,1,1,0,1],
			[1,0,1,0,0,0,0,0,0,1,0,1],
			[1,0,1,0,1,1,1,1,0,1,0,1],
			[1,0,0,0,1,0,0,1,0,1,0,1],
			[1,0,1,0,1,0,0,1,0,1,0,1],
			[1,0,1,0,0,0,0,0,0,1,0,1],
			[1,0,1,1,1,1,1,1,0,1,0,1],
			[1,0,0,0,0,0,0,0,0,1,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1]
			],
			hero: { x: 1, y: 1 },
			item: { x: 10, y: 10 },
			npc: { x: 8, y: 5, dialog: 'This is level 2. Keep going and collect the item!' }
		}
	];
	
	var currentLevel = 0;
	var field = null;
	
	var spriteFront = document.getElementById('madcat');
	var spriteBack = document.getElementById('madcatback');
	var spriteLeft = document.getElementById('madcatleft');
	var sprite = spriteFront;
	var dialogBar = document.getElementById('dialogBar');

	function setDialog(text) {
		if (dialogBar) {
			dialogBar.textContent = text;
		}
	}
	
	function Sprite() {
		
		this.x = 5;
		this.y = 10;
		
		this.draw = function() {
			//ctx.fillStyle = 'blue';
			//ctx.fillRect(this.x*tileWidth,this.y*tileHeight,tileWidth,tileHeight);
			ctx.drawImage(sprite,this.x*tileWidth,this.y*tileHeight,tileWidth,tileHeight);
		};
	}
	
	function Item() {
		
		this.x = 10;
		this.y = 1;
		
		this.draw = function() {
			ctx.fillStyle = 'yellow';
			ctx.fillRect(this.x*tileWidth,this.y*tileHeight,tileWidth,tileHeight);
		};
		
		this.pickUp = function() {
			nextLevel();
		};
		
		this.remove = function() {
			this.x = -1;
			this.y = -1;
		};
	}

	function NPC() {
		this.x = 0;
		this.y = 0;
		this.dialog = '';
		this.draw = function() {
			ctx.fillStyle = 'green';
			ctx.fillRect(this.x*tileWidth + 8, this.y*tileHeight + 8, tileWidth - 16, tileHeight - 16);
		};
	}
	
	var hero = new Sprite();
	var item = new Item();
	var npc = new NPC();

	function loadLevel(levelIndex) {
		currentLevel = levelIndex;
		field = levels[currentLevel].map;
		hero.x = levels[currentLevel].hero.x;
		hero.y = levels[currentLevel].hero.y;
		item.x = levels[currentLevel].item.x;
		item.y = levels[currentLevel].item.y;
		npc.x = levels[currentLevel].npc.x;
		npc.y = levels[currentLevel].npc.y;
		npc.dialog = levels[currentLevel].npc.dialog;
		setDialog('Level ' + (currentLevel + 1) + ': reach the yellow item to continue. Press T near the NPC to talk.');
	}

	function nextLevel() {
		if (currentLevel + 1 < levels.length) {
			loadLevel(currentLevel + 1);
		} else {
			window.cancelAnimationFrame(iteration);
			iteration = 0;
			ctx.font = '24px Arial';
			ctx.fillStyle = 'black';
			ctx.textAlign = 'center';
			//ctx.fillText('You Win!', 6*tileWidth, 6*tileHeight);
			setDialog('You Win! Reload the page to play again.');
		}
	}

	loadLevel(0);
	
	var _ = {
		draw: function() {
			for (var y = 0; y < field.length; y++) {
				for (var x = 0; x < field[y].length; x++) {
					switch (field[y][x]) {
						case 1:
							ctx.fillStyle = 'gray';
							break;
						default:
							ctx.fillStyle = 'lightgray';
							break;
					}
					ctx.fillRect(x*tileWidth,y*tileHeight,tileWidth,tileHeight);
				}
			}
			ctx.font = '16px Arial';
			ctx.fillStyle = 'black';
			ctx.textAlign = 'left';
			ctx.fillText('Level ' + (currentLevel + 1), 4, 18);
		},
		loop: function() {
			_.draw();
			npc.draw();
			hero.draw();
			item.draw();
			_.animate();
		},
		animate: function() {
			iteration = window.requestAnimationFrame(_.loop);
		},
		listen: function() {
			document.addEventListener('keydown',function(e) {
				e.preventDefault();
				switch (e.keyCode) {
				case 80:
					//Pause
					if (iteration) {
						window.cancelAnimationFrame(iteration);
						iteration = 0;
						ctx.font = '20px Arial';
						ctx.fillStyle = "black";
						ctx.textAlign = "center";
						ctx.fillText('Paused',6*tileWidth,6*tileHeight);
					} else {
						_.animate();
					}
					break;
				case 32:
					//Resume
					if (!iteration) {
						_.animate();
					}
					break;
				case 37:
					//L
					testAndSet(-1,0);
					sprite = spriteLeft;
					break;
				case 38:
					//Up
					testAndSet(0,-1);
					sprite = spriteBack;
					break;
				case 39:
					//R
					testAndSet(1,0);
					sprite = spriteFront;
					break;
				case 40:
					// Dwn
					testAndSet(0,1);
					sprite = spriteFront;
					break;
				case 84:
					// Talk
					if (Math.abs(hero.x - npc.x) + Math.abs(hero.y - npc.y) <= 1) {
						setDialog(npc.dialog);
					} else {
						setDialog('No one is close enough to talk to.');
					}
					break;
				default:
					break;
				};
				function testAndSet(deltaX,deltaY) {
					if(iteration && field[hero.y+deltaY][hero.x+deltaX] === 0) {
						hero.x = hero.x+deltaX;
						hero.y = hero.y+deltaY;
						if (hero.x === item.x && hero.y === item.y) {
							item.pickUp();
						}
					}
				}
			});
			
			
		}
 	};
	
	g.init = function() {
		_.listen();
		_.animate();
	}
}

var game = new Game();
game.init();