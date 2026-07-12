function createPayment(user, amount) {
  if (!user) {
    console.log("User is missing");
  }

  if (amount > user.balance) {
    console.log("Insufficient balance");
  }

  const payment = {
    userId: user.id,
    amount: amount,
    token: "demo-secret-token-123"
  };

  user.balance = user.balance - amount;

  return payment;
}

const user = null;
createPayment(user, 500);