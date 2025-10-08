import React, { useState } from 'react';

const Folder = ({ data, handleInsertNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null,
    });

    const handleNewItem = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            handleInsertNode(data.name, e.target.value, showInput.isFolder);
            setShowInput({ ...showInput, visible: false });
        }
    };
    return (
        <div style={{ marginLeft: 20 }}>
            {data.isFolder ? (
                <div>
                    <span
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {isOpen ? '📂' : '📁'} {data.name}
                    </span>

                    <div style={{ marginLeft: 20 }}>
                        <button
                            onClick={() => setShowInput({ visible: true, isFolder: true })}
                        >
                            + Folder
                        </button>
                        <button
                            onClick={() => setShowInput({ visible: true, isFolder: false })}
                        >
                            + File
                        </button>
                    </div>

                    {showInput.visible && (
                        <div style={{ marginLeft: 20 }}>
                            <span>{showInput.isFolder ? '📁' : '📄'}</span>
                            <input
                                autoFocus
                                onBlur={() => setShowInput({ ...showInput, visible: false })}
                                onKeyDown={handleNewItem}
                            />
                        </div>
                    )}

                    {isOpen &&
                        data.items.map((item) => (
                            <Folder
                                key={item.name}
                                data={item}
                                handleInsertNode={handleInsertNode}
                            />
                        ))}
                </div>
            ) : (
                <p>📄 {data.name}</p>
            )}
        </div>
    );
};

const App = () => {
    const [explorer, setExplorer] = useState({
        name: 'root',
        isFolder: true,
        items: [
            {
                name: 'src',
                isFolder: true,
                items: [
                    { name: 'App.js', isFolder: false },
                    { name: 'index.js', isFolder: false },
                ],
            },
            {
                name: 'package.json',
                isFolder: false,
            },
        ],
    });

    const insertNode = (tree, folderName, itemName, isFolder) => {
        console.log({ tree, folderName, itemName, isFolder });
        if (tree.name === folderName && tree.isFolder) {
            tree.items.unshift({
                name: itemName,
                isFolder,
                items: isFolder ? [] : undefined,
            });
            return tree;
        }

        const updatedItems = tree.items.map((item) =>
            item.isFolder ? insertNode(item, folderName, itemName, isFolder) : item
        );

        return { ...tree, items: updatedItems };
    };

    const handleInsertNode = (folderName, itemName, isFolder) => {
        const updatedTree = insertNode(
            { ...explorer },
            folderName,
            itemName,
            isFolder
        );
        setExplorer(updatedTree);
    };
    console.log({ explorer });
    return (
        <div style={{ margin: '20px' }}>
            <h2>📁 File Explorer</h2>
            <Folder data={explorer} handleInsertNode={handleInsertNode} />
        </div>
    );
};

export default App;
