function calculateDiscount(price, discount) {
  if (discount > 100) {
    return price;
  }

  let finalPrice = price - discount;
  console.log("Final price is: " + finalPrice);

  return finalPrice;
}

function login(username, password) {
  if (username == "admin" && password == "123456") {
    return true;
  }

  return false;
}

calculateDiscount(100, 20);
login("admin", "123456");