import categoriesData from "../mockData/categories.json";

let categories = [...categoriesData];

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
  }
};

export default categoryService;