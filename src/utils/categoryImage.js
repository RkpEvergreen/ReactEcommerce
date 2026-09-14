import { getProductImageUrl } from "./productImage";

export function getCategoryImageUrl(image) {
    return getProductImageUrl(image, "/placeholder-product.jpg")
        .replace("/uploads/products/", "/uploads/categories/");
}
