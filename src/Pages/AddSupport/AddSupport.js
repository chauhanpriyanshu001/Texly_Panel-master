import React, { useState } from "react";
import BASE_URL from "../../variable";

const AddSupport = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        address: "",
        dob: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        userType: "ADMIN",
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/admin/addRole`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("User added successfully!");
                setFormData({ name: "", address: "", dob: "", mobileNumber: "", userType: "ADMIN" });
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (error) {
            alert("Error connecting to the server");
            console.error(error);
        }
    };


    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#121212", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: "#1e1e1e", padding: "2rem", borderRadius: "1rem", width: "100%", maxWidth: "500px" }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Add New User</h2>

                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem", backgroundColor: "#2c2c2c", color: "#fff", border: "none", borderRadius: "0.5rem" }}
                        required
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem", backgroundColor: "#2c2c2c", color: "#fff", border: "none", borderRadius: "0.5rem" }}
                        required
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem", backgroundColor: "#2c2c2c", color: "#fff", border: "none", borderRadius: "0.5rem" }}
                        required
                    />
                </div>


                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem", backgroundColor: "#2c2c2c", color: "#fff", border: "none", borderRadius: "0.5rem" }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem", backgroundColor: "#2c2c2c", color: "#fff", border: "none", borderRadius: "0.5rem" }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        style={{ width: "100%", padding: "0.5rem", backgroundColor: "#2c2c2c", color: "#fff", border: "none", borderRadius: "0.5rem" }}
                        required
                    ></textarea>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem", backgroundColor: "#2c2c2c", color: "#fff", border: "none", borderRadius: "0.5rem" }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem", backgroundColor: "#2c2c2c", color: "#fff", border: "none", borderRadius: "0.5rem" }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="userType">User Type</label>
                    <select
                        id="userType"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5rem", backgroundColor: "#2c2c2c", color: "#fff", border: "none", borderRadius: "0.5rem" }}
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUPPORT">SUPPORT</option>
                    </select>
                </div>

                <button type="submit" style={{ width: "100%", padding: "0.75rem", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "0.5rem", fontWeight: "bold" }}>
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddSupport;
