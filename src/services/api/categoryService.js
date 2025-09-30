import categoriesData from "../mockData/categories.json";

let categories = [...categoriesData];
let nextId = Math.max(...categories.map(c => c.Id), 0) + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const categoryService = {
  getAll: async () => {
    await delay(300);
    return [...categories];
  },

  getById: async (id) => {
    await delay(200);
    const category = categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  },

  getByType: async (type) => {
    await delay(300);
    return categories.filter(c => c.type === type).map(c => ({ ...c }));
  },

  create: async (data) => {
    await delay(300);
    
    // Validate required fields
    if (!data.name || !data.type || !data.color || !data.icon) {
      throw new Error("All fields are required");
    }

    // Check for duplicate name
    const duplicate = categories.find(
      c => c.name.toLowerCase() === data.name.toLowerCase()
    );
    if (duplicate) {
      throw new Error("Category with this name already exists");
    }

    const newCategory = {
      Id: nextId++,
      name: data.name,
      type: data.type,
      color: data.color,
      icon: data.icon,
      isCustom: true
    };

    categories.push(newCategory);
    return { ...newCategory };
  },

  update: async (id, data) => {
    await delay(300);
    
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }

    // Check for duplicate name (excluding current category)
    const duplicate = categories.find(
      c => c.Id !== parseInt(id) && c.name.toLowerCase() === data.name.toLowerCase()
    );
    if (duplicate) {
      throw new Error("Category with this name already exists");
    }

    const updatedCategory = {
      ...categories[index],
      name: data.name,
      type: data.type,
      color: data.color,
      icon: data.icon
    };

    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  delete: async (id) => {
    await delay(300);
    
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }

    const deletedCategory = { ...categories[index] };
    categories.splice(index, 1);
    return deletedCategory;
  }
};

export default categoryService;