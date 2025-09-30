import transactionsData from "../mockData/transactions.json";

let transactions = [...transactionsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const transactionService = {
  getAll: async () => {
    await delay(400);
    return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getById: async (id) => {
    await delay(200);
    const transaction = transactions.find(t => t.Id === parseInt(id));
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return { ...transaction };
  },

  create: async (transactionData) => {
    await delay(300);
    const maxId = Math.max(...transactions.map(t => t.Id), 0);
    const newTransaction = {
      Id: maxId + 1,
      ...transactionData,
      createdAt: new Date().toISOString()
    };
    transactions = [newTransaction, ...transactions];
    return { ...newTransaction };
  },

  update: async (id, transactionData) => {
    await delay(300);
    const index = transactions.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Transaction not found");
    }
    transactions[index] = { ...transactions[index], ...transactionData };
    return { ...transactions[index] };
  },

  delete: async (id) => {
    await delay(300);
    const index = transactions.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Transaction not found");
    }
    transactions = transactions.filter(t => t.Id !== parseInt(id));
    return true;
  },

  getByDateRange: async (startDate, endDate) => {
    await delay(400);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(t => {
      const date = new Date(t.date);
      return date >= start && date <= end;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getByCategory: async (category) => {
    await delay(400);
    return transactions.filter(t => t.category === category)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getByType: async (type) => {
    await delay(400);
    return transactions.filter(t => t.type === type)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

export default transactionService;