import React, { useState } from "react";

const checkedData = [
    {
        id: 1,
        name: "Dashboard",
        children: [
            { id: 2, name: "View" },
            {
                id: 3,
                name: "Edit",
                children: [
                    { id: 4, name: "View child" },
                    { id: 14, name: "View child 1" },
                ],
            },
        ],
    },
    {
        id: 5,
        name: "Users",
        children: [
            { id: 6, name: "View" },
            { id: 7, name: "Edit" },
            { id: 8, name: "Delete" },
        ],
    },
    { id: 9, name: "Update" },
];

const CheckBox = ({ data, checked, indeterminate, setChecked, setIndeterminate }) => {
    const handleChange = (isChecked, node) => {
        setChecked((prev) => {
            const newState = { ...prev, [node.id]: isChecked };
            const newIndeterminate = { ...indeterminate };

            // 🔽 Step 1: Update all children recursively
            const updateChildren = (node) => {
                node.children?.forEach((child) => {
                    newState[child.id] = isChecked;
                    newIndeterminate[child.id] = false; // clear partial state
                    if (child.children) updateChildren(child);
                });
            };
            updateChildren(node);

            // 🔼 Step 2: Verify all parent nodes recursively
            const verifyAll = (nodes) => {
                nodes.forEach((node) => {
                    if (node.children) {
                        verifyAll(node.children);

                        const allChecked = node.children.every((child) => newState[child.id]);
                        const noneChecked = node.children.every((child) => !newState[child.id]);

                        // Parent is checked if all children checked
                        newState[node.id] = allChecked;
                        // Parent is indeterminate if some (but not all) children checked
                        newIndeterminate[node.id] = !allChecked && !noneChecked;
                    }
                });
            };

            verifyAll(checkedData);

            // update both states
            setIndeterminate(newIndeterminate);
            return newState;
        });
    };

    return (
        <div>
            {data.map((node) => (
                <div key={node.id} style={{ marginLeft: "20px" }}>
                    <input
                        type="checkbox"
                        checked={checked[node.id] || false}
                        // ⬇️ Here we set the indeterminate property manually
                        ref={(el) => {
                            if (el) el.indeterminate = indeterminate[node.id] || false;
                        }}
                        onChange={(e) => handleChange(e.target.checked, node)}
                    />
                    <span>{node.name}</span>

                    {node.children && (
                        <CheckBox
                            data={node.children}
                            checked={checked}
                            indeterminate={indeterminate}
                            setChecked={setChecked}
                            setIndeterminate={setIndeterminate}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

const App = () => {
    // ✅ Two states now — one for checked, one for partial/indeterminate
    const [checked, setChecked] = useState({});
    const [indeterminate, setIndeterminate] = useState({});

    return (
        <>
            <CheckBox
                data={checkedData}
                checked={checked}
                indeterminate={indeterminate}
                setChecked={setChecked}
                setIndeterminate={setIndeterminate}
            />
        </>
    );
};

export default App;
