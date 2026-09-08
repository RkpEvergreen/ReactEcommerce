import { Link } from "react-router-dom";

const orders = [
    { id: 1001, customer: "Ava Thompson", total: "$245.00", status: "Processing" },
    { id: 1002, customer: "Liam Wilson", total: "$130.00", status: "Shipped" },
    { id: 1003, customer: "Sophia Garcia", total: "$540.00", status: "Delivered" },
    { id: 1004, customer: "Noah Lee", total: "$78.50", status: "Pending" }
];

function OrderList() {
    return (
        <div className="admin-page">
            <div className="page-title">
                <div>
                    <h1>Orders</h1>
                    <p>Review recent customer orders</p>
                </div>
            </div>

            <div className="product-table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.total}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Link to={`/admin/orders/${order.id}`} className="edit-btn">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderList;
