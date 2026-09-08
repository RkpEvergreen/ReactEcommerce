const customers = [
    { id: 1, name: "Ava Thompson", email: "ava@example.com", orders: 4 },
    { id: 2, name: "Liam Wilson", email: "liam@example.com", orders: 2 },
    { id: 3, name: "Sophia Garcia", email: "sophia@example.com", orders: 6 },
    { id: 4, name: "Noah Lee", email: "noah@example.com", orders: 1 }
];

function CustomerList() {
    return (
        <div className="admin-page">
            <div className="page-title">
                <div>
                    <h1>Customers</h1>
                    <p>Manage your customer accounts</p>
                </div>
            </div>

            <div className="product-table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total Orders</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.orders}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerList;
