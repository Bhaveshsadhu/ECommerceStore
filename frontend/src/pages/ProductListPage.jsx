import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import { getProducts } from "../api/products";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getProducts();
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load products right now.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const allCategories = new Set(["all"]);
    products.forEach((product) => {
      if (product.category) {
        allCategories.add(product.category);
      }
    });
    return Array.from(allCategories);
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (sort === "price-asc") {
      filtered.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return filtered;
  }, [products, search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("popular");
  };

  return (
    <div className="row g-4">
      <aside className="col-12 col-lg-3">
        <div className="surface-card p-4 mb-4 mb-lg-0">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Filters</h5>
            <button className="btn btn-link text-decoration-none p-0" onClick={clearFilters}>
              Reset
            </button>
          </div>

          <div className="mb-4">
            <label className="form-label text-muted text-uppercase small">Search</label>
            <input
              className="form-control"
              placeholder="Product name"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-muted text-uppercase small">Category</label>
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`chip ${category === cat ? "border-primary text-primary" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label text-muted text-uppercase small">Sort by</label>
            <select className="form-select" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="popular">Most popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest arrivals</option>
            </select>
          </div>
        </div>
      </aside>

      <section className="col-12 col-lg-9">
        <div className="section-heading mb-4">
          <div>
            <p className="text-uppercase small text-muted mb-1">Catalog</p>
            <h2>Discover your next favorite piece</h2>
          </div>
          <p className="text-muted mb-0">
            {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
          </p>
        </div>

        {error && <div className="alert alert-danger surface-card border-0">{error}</div>}

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status" aria-label="Loading products" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-12 col-sm-6 col-xl-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="surface-card p-5 text-center">
            <p className="h5 mb-2">No products match your filters.</p>
            <p className="text-muted mb-4">Try adjusting your search to find what you’re looking for.</p>
            <button className="btn btn-outline-secondary" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductListPage;
