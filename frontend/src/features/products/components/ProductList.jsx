import ProductCard from "./ProductCard.jsx";

const ProductList = ({ products }) => {
    if (!products || products.length === 0) {
        return (
            <p className="text-center text-muted">No products found.</p>
        );
    }

    return (
        <div className="row">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
