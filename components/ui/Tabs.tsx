'use client';

import { useState, useEffect, useRef, KeyboardEvent, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  onTabChange?: (tabId: string) => void;
}

export default function Tabs({
  tabs,
  defaultTab,
  className = '',
  tabClassName = '',
  contentClassName = '',
  onTabChange,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (defaultTab && tabs.some((tab) => tab.id === defaultTab)) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, tabs]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    const newTabId = tabs[newIndex]?.id;
    if (newTabId) {
      handleTabChange(newTabId);
      tabRefs.current[newIndex]?.focus();
    }
  };

  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <div className={`tabs-container ${className}`}>
      <div
        className="tabs-list"
        role="tablist"
        aria-label="Navegación por pestañas"
        aria-orientation="horizontal"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''} ${tabClassName}`}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tabs-content-wrapper">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            className={`tab-content ${activeTab === tab.id ? 'active' : ''} ${contentClassName}`}
            hidden={activeTab !== tab.id}
          >
            <div className="tab-content-inner">{tab.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

