import React, { useState } from 'react';

// 1st Way
const folderData = {
  id: 1,
  name: 'src',
  isFolder: true,
  children: [
    {
      id: 2,
      name: 'components',
      isFolder: true,
      children: [
        { id: 3, name: 'Button.js', isFolder: false },
        { id: 4, name: 'Input.js', isFolder: false },
      ],
    },
    {
      id: 5,
      name: 'hooks',
      isFolder: true,
      children: [{ id: 6, name: 'useFetch.js', isFolder: false }],
    },
    { id: 7, name: 'index.js', isFolder: false },
  ],
};

const Folder = ({ data }) => {
  const [expand, setExpand] = useState({});

  const toggle = (id) => {
    setExpand((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      return newState;
    });
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <span
        style={{ cursor: data.isFolder ? 'pointer' : 'default' }}
        onClick={() => toggle(data.id)}
      >
        {data.isFolder ? (expand[data.id] ? '📂' : '📁') : '📄'} {data.name}
      </span>
      {expand[data.id] &&
        data.children?.length > 0 &&
        data.children.map((child) => {
          return <Folder key={child.id} data={child} />;
        })}
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Folder data={folderData} />
    </div>
  );
}

// 2nd Way

const folderData1 = [
  {
    id: 1,
    name: 'src',
    isFolder: true,
    children: [
      {
        id: 2,
        name: 'components',
        isFolder: true,
        children: [
          {
            id: 3,
            name: 'button',
            isFolder: true,
            children: [
              {
                id: 4,
                name: 'button.jsx',
                isFolder: false,
              },
            ],
          },
          {
            id: 5,
            name: 'index.js',
            isFolder: false,
          },
        ],
      },
      {
        id: 6,
        name: 'hooks',
        isFolder: true,
        children: [
          {
            id: 7,
            name: 'useFetch.js',
            isFolder: false,
          },
        ],
      },
    ],
  },
  {
    id: '8',
    name: 'package.json',
    isFolder: false,
  },
];

const Folder1 = ({ data }) => {
  const [expand, setExpand] = useState({});

  const toggle = (id) => {
    setExpand((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      return newState;
    });
  };
  console.log(expand);
  return (
    <div>
      {data.map((node) => {
        const isExpand = expand[node.id];
        return (
          <div key={node.id} style={{ marginLeft: '20px' }}>
            <div
              style={{ cursor: node.isFolder ? 'pointer' : 'default' }}
              onClick={() => toggle(node.id)}
            >
              {node.isFolder ? (isExpand ? '📂' : '📁') : '📄'} {node.name}
            </div>
            {isExpand && node.children?.length > 0 && (
              <Folder1 data={node.children} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Folder1 data={folderData1} />
    </div>
  );
}
