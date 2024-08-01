import FilterContext from '../../context/FilterContext';
import Cookies from 'js-cookie';
import { TbNotes } from 'react-icons/tb';
import { MdLabelImportant } from 'react-icons/md';
import { MdOutlineTask } from 'react-icons/md';
import { BiTaskX } from 'react-icons/bi';

import './index.css';

const Filter = () => {
  const taskList = [
    {
      id: 0,
      title: 'All Tasks',
      icon: <TbNotes className="filter-logo" />,
    },
    {
      id: 1,
      title: 'Important Tasks',
      icon: <MdLabelImportant className="filter-logo" />,
    },
    {
      id: 2,
      title: 'Completed Tasks',
      icon: <MdOutlineTask className="filter-logo" />,
    },
    {
      id: 3,
      title: 'Incompleted Tasks',
      icon: <BiTaskX className="filter-logo" />,
    },
  ];

  const name = Cookies.get('username');

  return (
    <div className="filter-container">
      <h1 className="filter-heading">{name}</h1>
      <FilterContext.Consumer>
        {(value) => {
          const { setActiveTabId } = value;
          return (
            <ul className="filter-list">
              {taskList.map((eachItem) => (
                <li key={eachItem.id} className="filter-item">
                  {eachItem.icon}
                  <button
                    className="filter-button"
                    onClick={() => setActiveTabId(eachItem.id)}
                  >
                    <p className="filter-para">{eachItem.title}</p>
                  </button>
                </li>
              ))}
            </ul>
          );
        }}
      </FilterContext.Consumer>
    </div>
  );
};

export default Filter;
