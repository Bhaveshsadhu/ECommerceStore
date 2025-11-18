const CATEGORY_ITEMS = [
  {
    id: "electronics",
    label: "Electronics",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <line x1="3" y1="16" x2="21" y2="16" />
        <line x1="10" y1="20" x2="14" y2="20" />
      </svg>
    ),
  },
  {
    id: "fashion",
    label: "Fashion",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 4h8l4 4-4 10H8L4 8l4-4z" />
        <path d="M8 4l4 4 4-4" />
      </svg>
    ),
  },
  {
    id: "home",
    label: "Home",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9.5 12 3l9 6.5V21H3z" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    id: "beauty",
    label: "Beauty",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c-2 2-8 7-8 11a8 8 0 0 0 16 0c0-4-6-9-8-11z" />
        <path d="M12 12v6" />
      </svg>
    ),
  },
  {
    id: "sports",
    label: "Sports",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M5.64 5.64 18.36 18.36" />
        <path d="M5.64 18.36 18.36 5.64" />
      </svg>
    ),
  },
];

const ShopByCategory = () => {
  return (
    <section className="mb-5">
      <div className="surface-card p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-2">
          <h3 className="h5 mb-0">Shop by Category</h3>

        </div>

        <div className="d-flex flex-wrap gap-3">
          {CATEGORY_ITEMS.map((category) => (
            <button type="button" className="category-pill" key={category.id}>
              <span className="category-icon">{category.icon}</span>
              <span className="fw-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;

