const textStyle = [
    'font-size: 45px',
    'color: #fff',
    'background: rgb(37, 39, 45)',
    'text-shadow: 0px -1px 4px white, 0px -2px 10px yellow, 0px -10px 20px #ff8000, 0px -18px 40px red',
    'font-family: "Orbitron", sans-serif',
  ].join(';');
  
  console.log("%cSpace Battle", textStyle);
  
  setTimeout(function() {
    console.log("Player 1 Ready?");
  }, 3000);
  setTimeout(function() {
    console.clear();
  }, 9000);

  // Assign variable names to buttons
  const startBtn = document.getElementById('start-button')
  const attackBtn = document.getElementById('attack-button')
  const fleeBtn = document.getElementById('flee-button')
  const continueBtn = document.getElementById('continue-button')
  const resetBtn = document.getElementById('reset-button')
  const easyBtn = document.getElementById('easy-button')
  const normalBtn = document.getElementById('normal-button')
  const hardBtn = document.getElementById('hard-button')
  const muteBtn = document.getElementById('mute-toggle')
  const musicTrack = document.getElementById('music-track')
  const myRange = document.getElementById('my-range')
  const volume = document.getElementById('volume')
  const battleEl = document.getElementById('space-battle')
  const explosionSound = new Audio('ExplosionSound.mp3')

  volume.innerHTML = myRange.value

  // Function to change values on volume slider and update the displayed volume
  myRange.oninput = function () {
    volume.innerHTML = this.value
  }

  // Function for music
  function setVolume() {
    musicTrack.volume = myRange.value / 100
  }

  myRange.addEventListener('change', setVolume)

  // Toggle mute
  muteBtn.addEventListener('click', ()=>{
    if (musicTrack.paused) {
      musicTrack.play()
      muteBtn.innerHTML = 'Mute'
    } else {musicTrack.pause()
      muteBtn.innerHTML = 'Play'
    }
  })

  // Assign variable name to keep track of how many alien ships have been defeated
  let battlesWon = 0

  // Assign variable names to scoreboard and game status area
  const scoreBoard = document.getElementById('scoreboard')
  const gameStatus = document.getElementById('game-status')

  // Assign variable name to an empty array that will hold game status messages
  let messageArr = []

  // Assign variable names to the image area and an array of alien ship images to be randomly selected from
  const alienShipsImg = ["https://i.imgur.com/eD4HlrL.png", "https://i.imgur.com/7WpzZBJ.png","https://i.imgur.com/9dy4wKo.png","https://i.imgur.com/TFfFnqa.png","https://i.imgur.com/04PFqQd.png","https://i.imgur.com/N3YvDJE.png"]
  const alienImg = document.getElementById('alien')
  
  // Base class for ship
  class Ship {
    constructor
      (name, hull, firepower, accuracy) {
        this.name = name
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
    }
    // Attack method that pushes a particular message into messageArr based on whether the attack hits or misses
    attack(target) {
        if (Math.random() <= this.accuracy) {
            target.hull -= this.firepower
            messageArr.push(`${target.name} just took ${this.firepower} worth of damage. Yikes!`)
        } else {messageArr.push(`Hey ${this.name}, you gotta be quicker than that! Shot missed.`)}
    }
  }
  
  // Subclass for the player ship
  class PlayerShip extends Ship {
    constructor() {
      super('USS Assembly', 20, 5, 0.7);
    }
  }

  // Subclass for the alien ships
  class AlienShip extends Ship {
    constructor(name, hull, firepower, accuracy) {
       super(name, hull, firepower, accuracy)
    }
  }

  // Function to use for purposes of randomization
  function randomization(max, min) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNum
  }

  // Instantiate player ship and a unique alien ship with assigned values
  const USSAssembly = new PlayerShip()

  const distortedET = new AlienShip('Distorted ET', 15, 4, 0.7)

  // Array to hold all alien ships for a given round
  let alienShips = [
    distortedET
  ]

  // Function to generate alien ships and push them into alienShips array
  function generateShipsEasy(num) {
    for (let i = 1; i <= num; i++) {
        const alienShip = new AlienShip(`Alien Ship ${i}`, randomization(6, 3), randomization(4, 2), (randomization(8, 6)) / 10)
        alienShips.push(alienShip)
    }
    return alienShips
  }

  function generateShipsNormal(num) {
    for (let i = 1; i <= num; i++) {
        const alienShip = new AlienShip(`Alien Ship ${i}`, randomization(7, 6), randomization(4, 2), (randomization(8, 6)) / 10)
        alienShips.push(alienShip)
    }
    return alienShips
  }

  function generateShipsHard(num) {
    for (let i = 1; i <= num; i++) {
        const alienShip = new AlienShip(`Alien Ship ${i}`, randomization(7, 6), randomization(6, 4), (randomization(8, 6)) / 10)
        alienShips.push(alienShip)
    }
    return alienShips
  }

  // Render function to display the messages stored in messageArr as an unordered list in the game status area
  gameStatus.render = () => {
    gameStatus.innerHTML = `<ul> ${
      messageArr.map((item => {
        return `<li>
         ${item} 
         </li>`
      })).join('')
    }</ul>`
  }

  // Event listener for start button, which empties alienShips array and randomly generates six alien ships
  startBtn.addEventListener('click', () => {
    // Start button disappears and the attack button appears upon click
    startBtn.style.display = 'none';
    attackBtn.style.display = 'block';
    // Resets player ship health, the battle element message, game status area, battles won, etc.
    USSAssembly.hull = 20;
    battleEl.textContent = '';
    battleEl.textContent = `I've got a GREAT feeling about this... USS Assembly hull integrity is at ${USSAssembly.hull}`;
    gameStatus.innerHTML = '';
    messageArr = [];
    battlesWon = 0;
    scoreBoard.textContent = `Alien ships defeated: ${battlesWon}`
  })

  easyBtn.addEventListener('click', ()=>{
    startBtn.style.display = 'block'
    easyBtn.style.display = 'none'
    normalBtn.style.display = 'none'
    hardBtn.style.display = 'none'
    alienShips = []
    generateShipsEasy(6)
  })

  normalBtn.addEventListener('click', ()=>{
    startBtn.style.display = 'block'
    easyBtn.style.display = 'none'
    normalBtn.style.display = 'none'
    hardBtn.style.display = 'none'
    alienShips = []
    generateShipsNormal(6)
  })

  hardBtn.addEventListener('click', ()=>{
    startBtn.style.display = 'block'
    easyBtn.style.display = 'none'
    normalBtn.style.display = 'none'
    hardBtn.style.display = 'none'
    alienShips = []
    generateShipsHard(6)
  })

  // Event listener for attack button
  attackBtn.addEventListener('click', () => {

    // Resets messageArr between each round of attacks
    messageArr = [];

    // Attacks the first ship in the alienShips array, and alien ship fires back if it survives
    USSAssembly.attack(alienShips[0])
    if (alienShips[0].hull > 0) {
      alienShips[0].attack(USSAssembly)
    } 
  
    // If the alien ship loses all its health, messages update to reflect battles won, current hull integrity, etc., and displays flee and continue buttons
    if (alienShips[0].hull <= 0) {
      battlesWon = battlesWon + 1
      scoreBoard.textContent = `Alien ships defeated: ${battlesWon}`
      attackBtn.style.display = 'none';
      continueBtn.style.display = 'block';
      fleeBtn.style.display = 'block';
      battleEl.textContent = '';
      battleEl.textContent = `USS Assembly hull integrity is at ${USSAssembly.hull}`
      // Change alien image to an explosion
      alienImg.src = "https://i.imgur.com/ivuwvOw.png";
      explosionSound.play()
      explosionSound.volume = .3
      // Add animation class to alien image to make it look like it's exploding
      alien.classList.add("scaleImage")
    }

    // If player ship dies, display taunting message and and display reset button
    if (USSAssembly.hull <= 0) {
      resetBtn.style.display = 'block';
      attackBtn.style.display = 'none';
      battleEl.textContent = `YOU HAD ONE JOB!!!`
      // Change player ship image to an explosion and add animation class
      USS.src="https://i.imgur.com/ivuwvOw.png"
      explosionSound.play()
      explosionSound.volume = .3
      USS.classList.add("scaleImage")
    }
    // runs the render function to update gameStatus messages after each round of attacks
    gameStatus.render() 
  })

  // Event listener for continue button
  continueBtn.addEventListener('click', () => {
    // Remove animation class from alien image
    alienImg.classList.remove("scaleImage")
    // Remove first alien ship, which has been destroyed
    alienShips.shift()
    // Select a random image from alienShipsImg array for player ship to fight
    alienImg.src = alienShipsImg[randomization(alienShipsImg.length - 1, 0)]
    attackBtn.style.display = 'block';
    continueBtn.style.display = 'none';
    fleeBtn.style.display = 'none';

    // If alienShips array is empty, a victory message is displayed and the player is asked to start again
    if (alienShips.length === 0) {
      battleEl.textContent = `Go home soldier you've won the battle. Will you seek further Glory or will you rest on your Laurels?`
      easyBtn.style.display = 'block'
      normalBtn.style.display = 'block'
      hardBtn.style.display = 'block'
      startBtn.style.display= 'none'
      attackBtn.style.display = 'none'
    }
  })

  // Event listener for flee button
  fleeBtn.addEventListener('click',() => {
    // Displays taunting message and allows player to start again
    battleEl.textContent = `Whats the difference between you and a COWARD?`
    continueBtn.style.display = 'none';
    fleeBtn.style.display = 'none';
    easyBtn.style.display = 'block'
    normalBtn.style.display = 'block'
    hardBtn.style.display = 'block'
    alienImg.classList.remove("scaleImage")
    alienImg.src = alienShipsImg[randomization(alienShipsImg.length - 1, 0)]
  })

  // Event listener for reset button
  resetBtn.addEventListener('click',() => {
    // Sends the player back to the opening screen, with initial battle message, blank scoreboard and game status, etc.
    resetBtn.style.display = 'none';
    easyBtn.style.display = 'block'
    normalBtn.style.display = 'block'
    hardBtn.style.display = 'block'
    gameStatus.innerHTML = '';
    battleEl.innerHTML = `Player 1 Ready?`
    messageArr = [];
    scoreBoard.innerHTML = '';
    // Reset player ship image
    USS.src="https://i.imgur.com/Q5QUnKG.png"
    USS.classList.remove("scaleImage")
  })

