function ProductMeta({ product }) {
    const metaItems = [
        {
            label: "SKU",
            value: product?.sku || product?.id || "N/A"
        },
        {
            label: "Category",
            value: product?.category_name || "Uncategorized"
        },
        {
            label: "Availability",
            value: product?.stock_quantity > 0 ? "In stock" : "Out of stock"
        },
        {
            label: "Shipping",
            value: "Free shipping available"
        }
    ];

    return (
        <div className="product-meta">
            {metaItems.map((item) => (
                <div
                    className="product-meta-item"
                    key={item.label}
                >
                    <span className="product-meta-label">{item.label}</span>
                    <strong>{item.value}</strong>
                </div>
            ))}
        </div>
    );
}

export default ProductMeta;
