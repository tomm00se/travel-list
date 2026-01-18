import { useState } from "react";

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
