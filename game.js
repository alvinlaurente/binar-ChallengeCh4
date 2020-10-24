// OOP Version

class Game {
  constructor(player, comp) {
    this.player = player;
    this.comp = comp;
    this.result = null;
    this.round = 1;

    // DOM Selector
    this.versus = document.querySelector(".versus h1");
    this.resultClass = document.querySelector(".versus div div");
    this.textResult = document.querySelector(".versus h5");
    this.compBox = document.querySelectorAll(".greyBox.compImage");
    this.playerBox = document.querySelectorAll(".greyBox.playerImage");
  }

  getResult(player, comp) {
    if (player.choice == comp.choice) return (this.result = "DRAW");
    if (player.choice == "rock")
      return comp.choice == "scissor"
        ? (this.result = "PLAYER 1 WIN")
        : (this.result = "COM WIN");
    if (player.choice == "paper")
      return comp.choice == "rock"
        ? (this.result = "PLAYER 1 WIN")
        : (this.result = "COM WIN");
    if (player.choice == "scissor")
      return comp.choice == "paper"
        ? (this.result = "PLAYER 1 WIN")
        : (this.result = "COM WIN");
  }

  setPlayerGreyBox(player) {
    if (player.choice == "rock") {
      this.playerBox[0].style.backgroundColor = "#c4c4c4";
    } else if (player.choice == "paper") {
      this.playerBox[1].style.backgroundColor = "#c4c4c4";
    } else {
      this.playerBox[2].style.backgroundColor = "#c4c4c4";
    }
  }

  setCompGreyBox(comp) {
    if (comp.choice == "rock") {
      this.compBox[0].style.backgroundColor = "#c4c4c4";
    } else if (comp.choice == "paper") {
      this.compBox[1].style.backgroundColor = "#c4c4c4";
    } else {
      this.compBox[2].style.backgroundColor = "#c4c4c4";
    }
  }

  showResult(player, comp) {
    this.versus.style.color = "#9c835f";
    this.resultClass.classList.add("result");

    this.textResult.innerHTML = this.result;
    if (this.result == "DRAW") {
      this.textResult.style.backgroundColor = "#225c0e";
    } else {
      this.textResult.style.backgroundColor = "#4c9654";
    }

    this.setPlayerGreyBox(player);
    this.setCompGreyBox(comp);
  }

  refresh() {
    this.textResult.innerHTML = "";
    this.resultClass.classList.remove("result");

    for (let i = 0; i < this.compBox.length; i++) {
      this.playerBox[i].style.backgroundColor = "#9c835f";
      this.compBox[i].style.backgroundColor = "#9c835f";
    }

    this.versus.style.color = "rgb(189,48,46)";
    this.result = null;
  }

  startGame(player, comp) {
    // Get Comp choice
    comp.getCompChoice();

    // Get the game result
    this.getResult(player, comp);

    // Show the result
    this.showResult(player, comp);
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.choice = null;
  }

  getPlayerChoice(choice) {
    this.choice = choice;
  }
}

class Comp extends Player {
  constructor() {
    super("comp");
  }

  getCompChoice() {
    const choice = Math.random();
    if (choice < 1 / 3) return (this.choice = "rock");
    if (choice >= 1 / 3 && choice < 2 / 3) return (this.choice = "paper");
    return (this.choice = "scissor");
  }
}

const p1 = new Player("Player");
const cpu = new Comp("CPU");
const game = new Game(p1, cpu);

console.log(p1);
console.log(cpu);
console.log(game);

// Event Listener if player side click any of the player images
const click = document.querySelectorAll(".contentImage .player");
click.forEach((playerimg) => {
  playerimg.addEventListener("click", () => {
    // Game can only be played if there's no winner result (null)
    if (!game.result) {
      // Get player choice (from the second class of each img), parse with substr
      const playerChoice = playerimg.className.substr(7, 7);

      // Store player choice
      p1.getPlayerChoice(playerChoice);

      // Start the game
      game.startGame(p1, cpu);
    }
  });
});

// Refresh listener
document
  .querySelector(".refresh")
  .addEventListener("click", () => game.refresh());
