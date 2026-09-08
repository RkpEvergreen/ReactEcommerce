import { useState } from "react";

function ProductSizes() {

    const [selectedSize, setSelectedSize] = useState("L");

    const sizes = [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ];

    return (
        <>
            <div className="size-header">

                <span>
                    Selected size:
                    <strong>
                        {selectedSize}
                    </strong>
                </span>

                <a href="#">
                    Size Guide
                </a>

            </div>

            <div className="size-options">

                {sizes.map((size) => (

                    <button
                        key={size}
                        className={
                            selectedSize === size
                                ? "size selected"
                                : "size"
                        }
                        onClick={() =>
                            setSelectedSize(size)
                        }
                    >
                        {size}
                    </button>

                ))}

            </div>
        </>
    );
}

export default ProductSizes;