import React, { useState } from "react";
import "./App.css";

function App() {
  const flavours = [
    { name: "Vanilla", price: 50 },
    { name: "Chocolate", price: 60 },
    { name: "Strawberry", price: 55 },
    { name: "Mango", price: 65 },
  ];

  const toppings = [
    { name: "Choco Chips", price: 20 },
    { name: "Nuts", price: 25 },
    { name: "Caramel", price: 15 },
    { name: "Whipped Cream", price: 30 },
  ];

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [bill, setBill] = useState(null);

  const handleToppingChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedToppings([...selectedToppings, value]);
    } else {
      setSelectedToppings(selectedToppings.filter((item) => item !== value));
    }
  };

  const calculateBill = () => {
    let total = 0;

    if (selectedFlavour) {
      total += flavours.find((f) => f.name === selectedFlavour).price;
    }

    selectedToppings.forEach((topping) => {
      total += toppings.find((t) => t.name === topping).price;
    });

    setBill(total);
  };

  return (
    <div className="container">
      <h1>🍦 Ice Cream Biller</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateBill();
        }}
        className="form"
      >
        <h2>Customer Details</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="input"
        />
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="input"
        />

        <h2>Select Flavour</h2>
        {flavours.map((flavour) => (
          <label key={flavour.name} className="option">
            <input
              type="radio"
              name="flavour"
              value={flavour.name}
              onChange={(e) => setSelectedFlavour(e.target.value)}
              required
            />
            {flavour.name} - ₹{flavour.price}
          </label>
        ))}

        <h2>Select Toppings</h2>
        {toppings.map((topping) => (
          <label key={topping.name} className="option">
            <input
              type="checkbox"
              value={topping.name}
              onChange={handleToppingChange}
            />
            {topping.name} - ₹{topping.price}
          </label>
        ))}

        <button type="submit" className="btn">Checkout</button>
      </form>

      {bill !== null && (
        <div className="bill">
          <h2>🧾 Your Bill</h2>
          <p><strong>Name:</strong> {customerName}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Flavour:</strong> {selectedFlavour}</p>
          <p><strong>Toppings:</strong> {selectedToppings.join(", ") || "None"}</p>
          <h3>Total: ₹{bill}</h3>
          <p className="thankyou">🙏 Thank you {customerName}, enjoy your ice cream!</p>
        </div>
      )}
    </div>
  );
}

export default App;
