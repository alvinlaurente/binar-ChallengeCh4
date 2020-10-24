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

  getResult() {
    const playerChoice = this.player.choice;
    const compChoice = this.comp.choice;
  }

  refresh() {
    this.textResult.innerHTML = "";
    this.result.classList.remove('result');

    for (let i = 0; i < this.compBox.length; i++) {
      this.playerBox[i].style.backgroundColor = '#9c835f';
      this.compBox[i].style.backgroundColor = '#9c835f';
    }

    this.versus.style.color = 'rgb(189,48,46)';
    this.result = null;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.choice = null;
  }

  getPlayerChoice() {
    
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
