export default class Player {
    constructor(name, symbol) {
      this.name = name;
      this.symbol = symbol;
      this.points = 0;
      this.level = 1;
    }
  
    //Add points to players function
    addPoints() {
      this.points++;
      if (this.points == 10 || this.point == 20 || this.point == 30) {
        this.level++;
      } 
    }
}
