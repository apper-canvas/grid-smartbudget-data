import savingsGoalsData from "../mockData/savingsGoals.json";

let savingsGoals = [...savingsGoalsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const savingsGoalService = {
  getAll: async () => {
    await delay(400);
    return [...savingsGoals];
  },

  getById: async (id) => {
    await delay(200);
    const goal = savingsGoals.find(g => g.Id === parseInt(id));
    if (!goal) {
      throw new Error("Savings goal not found");
    }
    return { ...goal };
  },

  create: async (goalData) => {
    await delay(300);
    const maxId = Math.max(...savingsGoals.map(g => g.Id), 0);
    const newGoal = {
      Id: maxId + 1,
      ...goalData,
      currentAmount: 0,
      createdAt: new Date().toISOString()
    };
    savingsGoals = [...savingsGoals, newGoal];
    return { ...newGoal };
  },

  update: async (id, goalData) => {
    await delay(300);
    const index = savingsGoals.findIndex(g => g.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Savings goal not found");
    }
    savingsGoals[index] = { ...savingsGoals[index], ...goalData };
    return { ...savingsGoals[index] };
  },

  delete: async (id) => {
    await delay(300);
    const index = savingsGoals.findIndex(g => g.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Savings goal not found");
    }
    savingsGoals = savingsGoals.filter(g => g.Id !== parseInt(id));
    return true;
  },

  addContribution: async (id, amount) => {
    await delay(200);
    const index = savingsGoals.findIndex(g => g.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Savings goal not found");
    }
    savingsGoals[index].currentAmount += amount;
    return { ...savingsGoals[index] };
  }
};

export default savingsGoalService;