import { useParams } from "react-router-dom";

function OrderDetails() {
    const { id } = useParams();

    return (
        <div className="admin-page">
            <h1>Order #{id}</h1>

            <div className="product-form">
                <div className="form-group">
                    <label>Customer</label>
                    <input type="text" value="Ava Thompson" readOnly />
                </div>

                <div className="form-group">
                    <label>Total Amount</label>
                    <input type="text" value="$245.00" readOnly />
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <input type="text" value="Processing" readOnly />
                </div>

                <div className="form-group">
                    <label>Shipping Address</label>
                    <textarea rows="3" readOnly value="123 Market Street, New York, NY" />
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
