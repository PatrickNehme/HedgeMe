const { ObjectId } = require('mongodb');

class WeeklyPerformance {
  constructor(db) {
    this.db = db;
    this.performances = this.db.collection('performances');
  }

  async addPerformance(performance) {
    const result = await this.performances.insertOne(performance);

    if (result.acknowledged && result.insertedId) {
      const createdPerformance = await this.performances.findOne({ _id: result.insertedId });
      return createdPerformance;
    } else {
      console.log('No performance document created:', result);
    }

    return null;
  }

  async getPerformances(month, year) {
    let weeklyPerformances = new Array(4).fill({ tier1: 0, tier2: 0 });
  
    const performances = await this.performances
      .find({ month: Number(month), year: Number(year) })
      .sort({ week: 1 })
      .toArray();
  
    performances.forEach(performance => {
      weeklyPerformances[performance.week - 1] = {
        tier1: performance.tier1,
        tier2: performance.tier2,
      };
    });
  
    return weeklyPerformances;
  }
}

module.exports = { WeeklyPerformance };
