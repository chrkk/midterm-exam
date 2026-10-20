import { memo, useCallback, useEffect, useMemo, useState } from 'react';

const CATEGORIES = ['Books', 'Games', 'Home', 'Tech'];
const generateProducts = () =>
  Array.from({ length: 600 }, (_, i) => ({
    id: i + 1, name: `Product ${i + 1}`,
    category: CATEGORIES[i % CATEGORIES.length], price: ((i * 37) % 500) + 5,
  }));

const ProductList = memo(function ProductList({ items, onSelect }) {
  console.log('ProductList rendered'); // evidence: should NOT log when counter changes
  return (
    <ul>
      {items.slice(0, 20).map((p) => (
        <li key={p.id}>
          {p.name} · {p.category} · ${p.price}{' '}
          <button onClick={() => onSelect(p.id)}>Select</button>
        </li>
      ))}
    </ul>
  );
});

export default function Exam5() {
  const products = useMemo(generateProducts, []);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('asc');
  const [selected, setSelected] = useState(null);
  const [counter, setCounter] = useState(0);

  // Reruns only when query, category, sort or products change (all listed)
  const visible = useMemo(() => {
    console.log('filtering...');
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(q))
      .sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));
  }, [products, query, category, sort]);

  // Stable until `products` changes
  const handleSelect = useCallback(
    (id) => setSelected(products.find((p) => p.id === id) ?? null),
    [products]
  );

  // Side effect (analytics) belongs in useEffect, never inside useMemo
  useEffect(() => {
    console.log('analytics: search', { query, category, sort });
  }, [query, category, sort]);

  return (
    <section>
      <h2>Product Explorer</h2>
      <button onClick={() => setCounter((c) => c + 1)}>Unrelated counter: {counter}</button>
      <div className="controls">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" aria-label="Search products" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
          {['All', ...CATEGORIES].map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by price">
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </select>
      </div>
      <p>{visible.length} products. Selected: {selected ? selected.name : 'none'}</p>
      <ProductList items={visible} onSelect={handleSelect} />
    </section>
  );
}
