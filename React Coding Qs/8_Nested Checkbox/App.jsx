import React, { useState } from 'react';

// ✅ Hierarchical data for checkbox tree
// Each item can optionally have nested children
const checkedData = [
    {
        id: 1,
        name: 'Dashboard',
        children: [
            { id: 2, name: 'View' },
            {
                id: 3,
                name: 'Edit',
                children: [
                    { id: 4, name: 'View child' },
                    { id: 14, name: 'View child 1' },
                ],
            },
        ],
    },
    {
        id: 5,
        name: 'Users',
        children: [
            { id: 6, name: 'View' },
            { id: 7, name: 'Edit' },
            { id: 8, name: 'Delete' },
        ],
    },
    { id: 9, name: 'Update' },
];

const CheckBox = ({ data, checked, setChecked }) => {
    // 🔹 Handles checkbox click for any node (parent or child)
    const handleChange = (isChecked, node) => {
        setChecked((prev) => {
            // Clone previous checked state
            const newState = { ...prev, [node.id]: isChecked };

            // 🔸 Step 1: Update all child checkboxes recursively (downward sync)
            const updateChildren = (node) => {
                node.children?.forEach((child) => {
                    newState[child.id] = isChecked;
                    // If the child also has children, recurse again
                    if (child.children) updateChildren(child);
                });
            };

            updateChildren(node);

            // 🔸 Step 2: Verify all parent nodes recursively (upward sync)
            const verifyAll = (nodes) => {
                nodes.forEach((node) => {
                    if (node.children) {
                        // Recurse deeper first — post-order traversal
                        verifyAll(node.children);

                        // Check if *all* children of current node are checked
                        const allChecked = node.children.every(
                            (child) => newState[child.id]
                        );

                        // Parent is checked only if all its children are checked
                        newState[node.id] = allChecked;
                    }
                });
            };

            // Apply upward verification from root
            verifyAll(checkedData);

            // Return the final updated state object
            return newState;
        });
    };

    // 🔹 Recursively render all checkboxes
    return (
        <div>
            {data.map((node) => (
                <div key={node.id} style={{ marginLeft: '20px' }}>
                    {/* Checkbox input */}
                    <input
                        type="checkbox"
                        checked={checked[node.id] || false}
                        onChange={(e) => handleChange(e.target.checked, node)}
                    />
                    <span>{node.name}</span>

                    {/* Render nested children (if any) */}
                    {node.children && (
                        <CheckBox
                            data={node.children}
                            checked={checked}
                            setChecked={setChecked}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

const App = () => {
    // Stores which checkboxes are checked, by id
    const [checked, setChecked] = useState({});

    return (
        <>
            <CheckBox data={checkedData} checked={checked} setChecked={setChecked} />
        </>
    );
};

export default App;
