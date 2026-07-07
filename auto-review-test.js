function transferMoney(amount, balance) {
  if (amount > balance) {
    console.log("Insufficient balance");
  }

  balance = balance - amount;
  return balance;
}

transferMoney(500, 100);