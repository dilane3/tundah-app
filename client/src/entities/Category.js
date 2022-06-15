class Category {
  id;
  name;

  constructor({ id, name }) {
    if (id && name) {
      this.id = id;
      this.name = name;
    }
  }

  // Getters and setters

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }
}

export default Category;
