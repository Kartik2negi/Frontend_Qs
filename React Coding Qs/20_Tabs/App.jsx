import React, { useState } from 'react';

const tabsData = [
  {
    id: 1,
    title: 'Home',
    content: '🏠 Welcome to Home Page',
  },
  {
    id: 2,
    title: 'About',
    content: '📘 This is About Page',
  },
  {
    id: 3,
    title: 'Contact',
    content: '📞 Contact us at support@test.com',
  },
];

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      style={{
        width: 500,
        margin: '50px auto',
        fontFamily: 'Arial',
      }}
    >
      {/* Tab Headers */}

      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid #ddd',
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            style={{
              flex: 1,
              padding: '12px',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === index ? '#1976d2' : '#f5f5f5',
              color: activeTab === index ? 'white' : 'black',
              fontWeight: 'bold',
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}

      <div
        style={{
          padding: 20,
          border: '1px solid #ddd',
          borderTop: 'none',
          minHeight: 150,
        }}
      >
        <h2>{tabs[activeTab].title}</h2>

        <p>{tabs[activeTab].content}</p>
      </div>
    </div>
  );
}

export default function App() {
  return <Tabs tabs={tabsData} />;
}
