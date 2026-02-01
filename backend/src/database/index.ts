import { User, Analysis, Payment } from '../types';

// In-memory database (replace with real DB in production)
// This is structured to easily migrate to PostgreSQL, MongoDB, etc.

class Database {
  private users: Map<string, User> = new Map();
  private usersByEmail: Map<string, string> = new Map(); // email -> id
  private analyses: Map<string, Analysis> = new Map();
  private analysesByUser: Map<string, string[]> = new Map(); // userId -> analysisIds
  private payments: Map<string, Payment> = new Map();
  private paymentsByUser: Map<string, string[]> = new Map(); // userId -> paymentIds

  // ==================== USERS ====================
  
  async createUser(user: User): Promise<User> {
    this.users.set(user.id, user);
    this.usersByEmail.set(user.email.toLowerCase(), user.id);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userId = this.usersByEmail.get(email.toLowerCase());
    if (!userId) return null;
    return this.users.get(userId) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;
    
    this.users.delete(id);
    this.usersByEmail.delete(user.email.toLowerCase());
    return true;
  }

  // ==================== ANALYSES ====================

  async createAnalysis(analysis: Analysis): Promise<Analysis> {
    this.analyses.set(analysis.id, analysis);
    
    const userAnalyses = this.analysesByUser.get(analysis.userId) || [];
    userAnalyses.push(analysis.id);
    this.analysesByUser.set(analysis.userId, userAnalyses);
    
    return analysis;
  }

  async getAnalysisById(id: string): Promise<Analysis | null> {
    return this.analyses.get(id) || null;
  }

  async getAnalysesByUserId(userId: string, limit = 50): Promise<Analysis[]> {
    const analysisIds = this.analysesByUser.get(userId) || [];
    const analyses = analysisIds
      .map(id => this.analyses.get(id))
      .filter((a): a is Analysis => a !== undefined)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
    
    return analyses;
  }

  async countUserAnalysesThisMonth(userId: string): Promise<number> {
    const analysisIds = this.analysesByUser.get(userId) || [];
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return analysisIds
      .map(id => this.analyses.get(id))
      .filter((a): a is Analysis => a !== undefined)
      .filter(a => a.createdAt >= startOfMonth)
      .length;
  }

  // ==================== PAYMENTS ====================

  async createPayment(payment: Payment): Promise<Payment> {
    this.payments.set(payment.id, payment);
    
    const userPayments = this.paymentsByUser.get(payment.userId) || [];
    userPayments.push(payment.id);
    this.paymentsByUser.set(payment.userId, userPayments);
    
    return payment;
  }

  async getPaymentById(id: string): Promise<Payment | null> {
    return this.payments.get(id) || null;
  }

  async getPaymentByTransactionId(transactionId: string): Promise<Payment | null> {
    for (const payment of this.payments.values()) {
      if (payment.transactionId === transactionId) {
        return payment;
      }
    }
    return null;
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | null> {
    const payment = this.payments.get(id);
    if (!payment) return null;
    
    const updatedPayment = { ...payment, ...updates };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }

  async getPaymentsByUserId(userId: string): Promise<Payment[]> {
    const paymentIds = this.paymentsByUser.get(userId) || [];
    return paymentIds
      .map(id => this.payments.get(id))
      .filter((p): p is Payment => p !== undefined)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // ==================== UTILITIES ====================

  async clear(): Promise<void> {
    this.users.clear();
    this.usersByEmail.clear();
    this.analyses.clear();
    this.analysesByUser.clear();
    this.payments.clear();
    this.paymentsByUser.clear();
  }

  getStats() {
    return {
      users: this.users.size,
      analyses: this.analyses.size,
      payments: this.payments.size,
    };
  }
}

// Export singleton instance
export const db = new Database();
export default db;
