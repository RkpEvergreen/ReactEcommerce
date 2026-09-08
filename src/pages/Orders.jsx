import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Orders() {

    const [orders, setOrders] = useState([]);


    useEffect(() => {

        const savedOrders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];

        setOrders(savedOrders);

    }, []);


    return (
        <div className="orders-page">

            <div className="orders-breadcrumb">

                <Link to="/">
                    Homepage
                </Link>

                <span>›</span>

                <span>
                    Orders
                </span>

            </div>


            <h1>
                My Orders
            </h1>


            {orders.length === 0 ? (

                <div className="empty-orders">

                    <h2>
                        No orders found
                    </h2>

                    <p>
                        You haven't placed any
                        orders yet.
                    </p>

                    <Link to="/products">
                        Start Shopping
                    </Link>

                </div>

            ) : (

                <div className="orders-list">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order.id}
                        >

                            <div>

                                <strong>
                                    Order #
                                    {order.id}
                                </strong>

                                <p>
                                    {order.date}
                                </p>

                            </div>


                            <div>

                                <span>
                                    Status
                                </span>

                                <strong>
                                    {order.status}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Total
                                </span>

                                <strong>
                                    $
                                    {Number(
                                        order.total
                                    ).toFixed(2)}
                                </strong>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Orders;