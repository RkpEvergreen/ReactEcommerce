function Dashboard() {

    return (
        <div>

            <h1>Dashboard</h1>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Total Products</h3>
                    <strong>120</strong>
                </div>

                <div className="dashboard-card">
                    <h3>Total Orders</h3>
                    <strong>85</strong>
                </div>

                <div className="dashboard-card">
                    <h3>Customers</h3>
                    <strong>250</strong>
                </div>

                <div className="dashboard-card">
                    <h3>Revenue</h3>
                    <strong>$12,500</strong>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;