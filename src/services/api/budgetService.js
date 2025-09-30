import budgetsData from "../mockData/budgets.json";

let budgets = [...budgetsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const budgetService = {
  getAll: async () => {
    await delay(400);
    return [...budgets];
  },

  getById: async (id) => {
    await delay(200);
    const budget = budgets.find(b => b.Id === parseInt(id));
    if (!budget) {
      throw new Error("Budget not found");
    }
    return { ...budget };
  },

  getByMonth: async (month) => {
    await delay(400);
    return budgets.filter(b => b.month === month).map(b => ({ ...b }));
  },

  create: async (budgetData) => {
    await delay(300);
    const maxId = Math.max(...budgets.map(b => b.Id), 0);
    const newBudget = {
      Id: maxId + 1,
      ...budgetData,
      spent: 0
    };
    budgets = [...budgets, newBudget];
    return { ...newBudget };
  },

  update: async (id, budgetData) => {
    await delay(300);
    const index = budgets.findIndex(b => b.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Budget not found");
    }
    budgets[index] = { ...budgets[index], ...budgetData };
    return { ...budgets[index] };
  },

  delete: async (id) => {
    await delay(300);
    const index = budgets.findIndex(b => b.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Budget not found");
    }
    budgets = budgets.filter(b => b.Id !== parseInt(id));
    return true;
  },

  updateSpent: async (category, month, amount) => {
    await delay(200);
    const budget = budgets.find(b => b.category === category && b.month === month);
    if (budget) {
      budget.spent = amount;
      return { ...budget };
    }
    return null;
  }
};

export default budgetService;