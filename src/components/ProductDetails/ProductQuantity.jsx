import { useState } from "react";
import {
    Minus,
    Plus
} from "lucide-react";

function ProductQuantity() {

    const [quantity, setQuantity] = useState(1);

    return (
        <>

            <div className="quantity-label">
                Quantity:
            </div>

            <div className="quantity-control">

                <button
                    onClick={() =>
                        setQuantity(
                            Math.max(1, quantity - 1)
                        )
                    }
                >
                    <Minus size={14} />
                </button>

                <span>
                    {quantity}
                </span>

                <button
                    onClick={() =>
                        setQuantity(quantity + 1)
                    }
                >
                    <Plus size={14} />
                </button>

            </div>

        </>
    );
}

export default ProductQuantity;