import { useState } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (newItem) => {
    setItems((items) => [...items, newItem]);
  };

  const handleDeleteItems = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckboxToggle = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
    // for every each item, if the id of the current item matched the id passed into handle func
    // if they match, spread the original array entry + update the packed value by flipping it
    // if they dont match, return the original array entry
  };

  const handleDeleteAllItems = () => {
    const comfirmed = window.confirm(
      "Are you sure you want to delete the entire list? There's no getting it back!",
    );
    if (comfirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleCheckboxToggle}
        onDeleteList={handleDeleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}

export const Logo = () => {
  return <h1>✈️ Travel List 🏝️</h1>;
};

export const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const sanitisedDescription =
      description.charAt(0).toLocaleUpperCase() + description.slice(1);

    const newItem = {
      description: sanitisedDescription,
      quantity,
      packed: false,
      id: Date.now(),
    };
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

export const PackingList = ({
  items,
  onDeleteItem,
  onToggleItem,
  onDeleteList,
}) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem} // passing from App (Grandparent) to Item (Grandchild) through PackingList (Parent)
            />
          );
        })}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        {items.length === 0 ? null : (
          <button onClick={() => onDeleteList()}>Clear List</button>
        )}
      </div>
    </div>
  );
};

export const Item = ({ item, onDeleteItem, onToggleItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >{`${item.quantity}x ${item.description}`}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

export const Stats = ({ items }) => {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Add an item to start packing! ☀️</em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPackedItems / numItems) * 100);

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>Stats: You are all-packed! Adventure awaits! ✈️</em>
      ) : (
        <em>
          Stats: You have {numItems} items on your list and have already packed{" "}
          {numPackedItems} items. ({percentage}%)
        </em>
      )}
    </footer>
  );
};
