const gamer = {
    getScore: function() {
      return this.score
    },
    setScore: function(score) {
      this.score = score;
    },
    resetScore: function() {
      this.current = 0;
    }
}

export default gamer;