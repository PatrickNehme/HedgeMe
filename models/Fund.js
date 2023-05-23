const { ObjectId } = require('mongodb');

class Fund {
  constructor(db) {
    this.db = db;
    this.funds = this.db.collection('funds');
  }

  async createFund(fund) {
    try {
      const result = await this.funds.insertOne(fund);
      if (result.acknowledged && result.insertedId) {
        const createdFund = await this.funds.findOne({ _id: result.insertedId });
        return createdFund;
      } else {
        console.log('No fund document created:', result);
      }
    } catch (error) {
      console.error('Error while creating fund:', error);
      throw error;
    }
    return null;
  }

  async getAllFunds() {
    try {
      return await this.funds.find().toArray();
    } catch (error) {
      console.error('Error while fetching all funds:', error);
      throw error;
    }
  }

  async getFundById(id) {
    return this.funds.findOne({ _id: new ObjectId(id) });
  }

  async updateFund(id, updatedFund) {
    return this.funds.updateOne({ _id: new ObjectId(id) }, { $set: updatedFund });
  }

  async deleteFund(id) {
    return this.funds.deleteOne({ _id: new ObjectId(id) });
  }
}


module.exports = {
  Fund,
};
