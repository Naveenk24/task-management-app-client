import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import FilterContext from '../../context/FilterContext.js';
import Navbar from '../Navbar/index.js';
import Filter from '../Filter/index.js';
import Tasks from '../Tasks/index.js';
import './index.css';
import { useState } from 'react';

export default function Home() {
  const [activeTabId, setFilterTabId] = useState(0);

  const setActiveTabId = (id) => {
    setFilterTabId(id);
  };

  const jwtToken = Cookies.get('jwt_token');

  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-container">
      <Navbar />
      <FilterContext.Provider
        value={{ activeTabId, setActiveTabId: setActiveTabId }}
      >
        <div className="filter-products-container">
          <Filter />
          <Tasks />
        </div>
      </FilterContext.Provider>
    </div>
  );
}
