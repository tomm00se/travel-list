import { useState } from "react";
import { Logo } from "./components/logo";
import { Form } from "./components/Form";
import { Stats } from "./components/Stats";
import { PackingList } from "./components/PackingList";
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
