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



// 2nd Way

import React, { useState } from 'react';

const initialData = [
  {
    id: 1,
    name: 'src',
    isFolder: true,
    children: [],
  },
];

const Folder1 = ({ data, expandedIds, toggleExpand, handleAddNode }) => {
  return (
    <div style={{ marginLeft: 20 }}>
      {data.map((node) => {
        const isExpanded = expandedIds.has(node.id);

        return (
          <div key={node.id}>
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <span
                onClick={() => node.isFolder && toggleExpand(node.id)}
                style={{
                  cursor: node.isFolder ? 'pointer' : 'default',
                }}
              >
                {node.isFolder ? (isExpanded ? '📂' : '📁') : '📄'} {node.name}
              </span>

              {node.isFolder && (
                <>
                  <button onClick={() => handleAddNode(node.id, true)}>
                    + Folder
                  </button>

                  <button onClick={() => handleAddNode(node.id, false)}>
                    + File
                  </button>
                </>
              )}
            </div>

            {isExpanded && node.children?.length > 0 && (
              <Folder1
                data={node.children}
                expandedIds={expandedIds}
                toggleExpand={toggleExpand}
                handleAddNode={handleAddNode}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export function App1() {
  const [tree, setTree] = useState(initialData);

  const [expandedIds, setExpandedIds] = useState(new Set());

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const addNode = (tree, folderId, newNode) => {
    return tree.map((node) => {
      if (node.id === folderId && node.isFolder) {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      }

      if (node.children) {
        return {
          ...node,
          children: addNode(node.children, folderId, newNode),
        };
      }

      return node;
    });
  };

  const handleAddNode = (folderId, isFolder) => {
    const name = prompt(`Enter ${isFolder ? 'folder' : 'file'} name`);

    if (!name) return;

    const newNode = {
      id: Date.now(),
      name,
      isFolder,
      children: isFolder ? [] : undefined,
    };

    setTree((prev) => addNode(prev, folderId, newNode));

    // auto expand parent
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.add(folderId);
      return next;
    });
  };

  return (
    <div>
      <h2>📁 File Explorer</h2>

      <Folder1
        data={tree}
        expandedIds={expandedIds}
        toggleExpand={toggleExpand}
        handleAddNode={handleAddNode}
      />
    </div>
  );
}
