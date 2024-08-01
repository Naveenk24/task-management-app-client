import React from 'react';

const FilterContext = React.createContext({
  activeTabId: 0,
  setActiveTabId: () => {},
});

export default FilterContext;
