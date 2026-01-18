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
