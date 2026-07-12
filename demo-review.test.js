const { createPayment } = require("./demo-review");

describe("createPayment", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe("with a valid user", () => {
    test("returns a payment object with the correct userId, amount, and token", () => {
      const user = { id: "user-1", balance: 1000 };

      const payment = createPayment(user, 500);

      expect(payment).toEqual({
        userId: "user-1",
        amount: 500,
        token: "demo-secret-token-123",
      });
    });

    test("deducts the amount from the user's balance", () => {
      const user = { id: "user-1", balance: 1000 };

      createPayment(user, 500);

      expect(user.balance).toBe(500);
    });

    test("does not log 'Insufficient balance' when amount is less than balance", () => {
      const user = { id: "user-1", balance: 1000 };

      createPayment(user, 500);

      expect(logSpy).not.toHaveBeenCalledWith("Insufficient balance");
    });

    test("does not log 'User is missing' for a valid user", () => {
      const user = { id: "user-1", balance: 1000 };

      createPayment(user, 500);

      expect(logSpy).not.toHaveBeenCalledWith("User is missing");
    });

    test("treats amount equal to balance as sufficient (boundary case)", () => {
      const user = { id: "user-1", balance: 500 };

      const payment = createPayment(user, 500);

      expect(logSpy).not.toHaveBeenCalledWith("Insufficient balance");
      expect(payment.amount).toBe(500);
      expect(user.balance).toBe(0);
    });

    test("logs 'Insufficient balance' when amount exceeds balance, but still creates and applies the payment", () => {
      const user = { id: "user-1", balance: 100 };

      const payment = createPayment(user, 500);

      expect(logSpy).toHaveBeenCalledWith("Insufficient balance");
      expect(payment).toEqual({
        userId: "user-1",
        amount: 500,
        token: "demo-secret-token-123",
      });
      // Existing behavior: balance is decremented even when insufficient,
      // resulting in a negative balance.
      expect(user.balance).toBe(-400);
    });

    test("always returns the same hardcoded token regardless of input", () => {
      const userA = { id: "a", balance: 1000 };
      const userB = { id: "b", balance: 5000 };

      const paymentA = createPayment(userA, 10);
      const paymentB = createPayment(userB, 20);

      expect(paymentA.token).toBe("demo-secret-token-123");
      expect(paymentB.token).toBe("demo-secret-token-123");
    });

    test("supports an amount of 0", () => {
      const user = { id: "user-1", balance: 100 };

      const payment = createPayment(user, 0);

      expect(payment.amount).toBe(0);
      expect(user.balance).toBe(100);
      expect(logSpy).not.toHaveBeenCalledWith("Insufficient balance");
    });

    test("supports a negative balance already present on the user", () => {
      const user = { id: "user-1", balance: -50 };

      const payment = createPayment(user, 10);

      expect(logSpy).toHaveBeenCalledWith("Insufficient balance");
      expect(payment.amount).toBe(10);
      expect(user.balance).toBe(-60);
    });
  });

  describe("with a missing user", () => {
    test("logs 'User is missing' and then throws because balance is accessed on null", () => {
      expect(() => createPayment(null, 500)).toThrow(TypeError);
      expect(logSpy).toHaveBeenCalledWith("User is missing");
    });

    test("throws when user is undefined", () => {
      expect(() => createPayment(undefined, 500)).toThrow(TypeError);
      expect(logSpy).toHaveBeenCalledWith("User is missing");
    });
  });
});