import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Toothbrush", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (newItem) => {
    setItems((items) => [...items, newItem]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

export const Logo = () => {
  return <h1>Travel List</h1>;
};

export const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((dropdownItem) => {
          return (
            <option value={dropdownItem} key={dropdownItem}>
              {dropdownItem}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Holiday items..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add to List!</button>
    </form>
  );
};

export const PackingList = ({ items }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return <Item item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
};

export const Item = ({ item }) => {
  return (
    <li>
      <span
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >{`${item.quantity}x ${item.description}`}</span>
      <button>❌</button>
    </li>
  );
};

export const Stats = () => {
  return (
    <footer className="stats">
      Stats: You have x items on your list and have already packed x (x%)
    </footer>
  );
};
