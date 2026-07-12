/**
 * Transfers an amount from a balance and calculates the resulting balance.
 * @param {number} amount - The amount to transfer.
 * @param {number} balance - The starting balance.
 * @returns {number} The balance after subtracting the transfer amount.
 */
function transferMoney(amount, balance) {
  if (amount > balance) {
    console.log("Insufficient balance");
  }

  balance = balance - amount;
  return balance;
}

transferMoney(500, 100);