const API_ORIGIN = "http://localhost:5000";

export function getProductImageUrl(image, fallback = "/placeholder-product.jpg") {
    if (!image) {
        return fallback;
    }

    if (/^https?:\/\//i.test(image)) {
        return image;
    }

    if (image.startsWith("/uploads/")) {
        return `${API_ORIGIN}${image}`;
    }

    return `${API_ORIGIN}/uploads/products/${image}`;
}
