class Todo {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(updates) {
    Object.assign(this, updates);
    this.updatedAt = new Date();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      text: this.text,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Todo; 