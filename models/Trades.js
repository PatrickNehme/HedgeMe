const { ObjectId } = require('mongodb');

class Trade {
  constructor(db) {
    this.db = db;
    this.trades = this.db.collection('trades');
  }
  
  async updateTrade(id, updatedTrade) {
    const result = await this.trades.updateOne({ _id: new ObjectId(id) }, { $set: updatedTrade });
    return result.modifiedCount > 0;
  }
  
  async addTrade(trade) {
    trade.createdDate = new Date();
    const result = await this.trades.insertOne(trade);
    
    if (result.acknowledged && result.insertedId) {
      const createdTrade = await this.trades.findOne({ _id: result.insertedId });
      return createdTrade;
    } else {
      console.log('No trade document created:', result);
    }
    
    return null;
  }
}

export { Trade };
