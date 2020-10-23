class Game {
  constructor(player, comp) {
    this.player = player;
    this.comp = comp;
    this.result = null;
    this.round = 1;
  }

  getResult() {
    const playerChoice = this.player.choice;
    const compChoice = this.comp.choice;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.choice = null;
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
