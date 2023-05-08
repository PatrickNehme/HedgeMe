const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

class User {

  constructor(db) {
    this.db = db;
    this.users = this.db.collection('users');
    this.supportTickets = this.db.collection('supportTickets');
  }

  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async getUsersByRole(role) {
    const users = await this.users.find({ role: role }).toArray();
    return users;
  }

  async createUser(user) {
    try {
      const result = await this.users.insertOne(user);
      if (result.acknowledged && result.insertedId) {
        const createdUser = await this.users.findOne({ _id: result.insertedId });
        return createdUser;
      } else {
        console.log('No user document created:', result);
      }
    } catch (error) {
      console.error('Error while creating user:', error);
    }
    return null;
  }

  async getUserByEmail(email) {
    const user = await this.users.findOne({ email: email });
    return user;
  }

  async getUserById(id) {
    const user = await this.users.findOne({ _id: ObjectId(id) });
    return user;
  }

  async updateUser(userId, updatedUser) {
    const result = await this.users.updateOne(
      { _id: ObjectId(userId) },
      { $set: updatedUser }
    );
    return result.acknowledged;
  }

  async deleteUserByEmail(email) {
    const result = await this.users.deleteOne({ email: email });
    return result.acknowledged;
  }  

  async updateUserByEmail(email, newPassword, newRole) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await this.users.updateOne(
      { email: email },
      { $set: { password: hashedPassword, role: newRole } }
    );
    return result.acknowledged;
  }

  async createSupportTicket(ticket) {
    try {
      const result = await this.supportTickets.insertOne(ticket);
      if (result.acknowledged && result.insertedId) {
        const createdTicket = await this.supportTickets.findOne({ _id: result.insertedId });
        return createdTicket;
      } else {
        console.log('No support ticket document created:', result);
      }
    } catch (error) {
      console.error('Error while creating support ticket:', error);
    }
    return null;
  }
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}


module.exports = {
  User,
  hashPassword,
};
