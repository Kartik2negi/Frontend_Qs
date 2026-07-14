import React, { useState } from 'react';

const users = [
    {
        id: 1,
        name: 'John',
        email: 'john@gmail.com',
        role: 'Frontend',
    },
    {
        id: 2,
        name: 'Alice',
        email: 'alice@gmail.com',
        role: 'Backend',
    },
    {
        id: 3,
        name: 'Bob',
        email: 'bob@gmail.com',
        role: 'QA',
    },
    {
        id: 4,
        name: 'Steve',
        email: 'steve@gmail.com',
        role: 'Frontend',
    },
];

export default function App() {
    const [search, setSearch] = useState('');

    const filteredUsers = users.filter((user) => {
        const keyword = search.toLowerCase();

        return (
            user.name.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword) ||
            user.role.toLowerCase().includes(keyword)
        );
    });

    return (
        <div style={{ padding: 20 }}>
            <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: 10,
                    width: 300,
                    marginBottom: 20,
                }}
            />

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No Results Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
