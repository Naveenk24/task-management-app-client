import { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import FilterContext from '../../context/FilterContext';
import axios from 'axios';

import TaskItem from '../TaskItem/index';
import ReactPopup from '../ReactPopup/index';

import './index.css';

const Tasks = () => {
  const [taskDetails, setTaskDetails] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Get the JWT Token

  const jwtToken = Cookies.get('jwt_token');

  // Get Task Details

  const getTaskListDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3005/tasks', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setTaskDetails(response.data);
    } catch (error) {
      console.log('Error fetching tasks data ', error);
    }
  };

  // Delete Task Item

  const deleteTaskItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3005/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(response.data);
      getTaskListDetails();
    } catch (error) {
      console.log('Error will deleting the task', error);
    }
  };

  // Update Task Status

  const updateStatusApi = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3005/status/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      getTaskListDetails();
    } catch (error) {
      console.log('Error will update the task status', error);
    }
  };

  // Update Task Preference

  const updateLikesApi = async (id) => {
    try {
      await axios.put(
        `http://localhost:3005/likes/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      getTaskListDetails();
    } catch (error) {
      console.log('Error will update the task preference', error);
    }
  };

  // Initial Api Call

  useEffect(() => {
    getTaskListDetails();
  }, []);

  const makeApiRequest = () => {
    getTaskListDetails();
  };

  // Filtered The Task Items

  return (
    <div className="tasks-background">
      <div className="task-search-container">
        <input
          type="search"
          placeholder="search.."
          className="search-input-element"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <ReactPopup makeApiRequest={makeApiRequest} />
      </div>
      <p className="task-name">Tasks</p>

      <hr />

      <FilterContext.Consumer>
        {(value) => {
          const { activeTabId } = value;

          const getFilteredTasks = () => {
            if (activeTabId === 1) {
              return taskDetails.filter((eachItem) => eachItem.is_like === 1);
            } else if (activeTabId === 2) {
              return taskDetails.filter(
                (eachItem) => eachItem.is_completed === 1
              );
            } else if (activeTabId === 3) {
              return taskDetails.filter(
                (eachItem) => eachItem.is_completed === 0
              );
            }
            return taskDetails;
          };

          const activeTabFilter = getFilteredTasks(taskDetails);

          const filteredTaskList = activeTabFilter.filter((eachItem) =>
            eachItem.title.toLowerCase().includes(searchInput)
          );

          return (
            <div className="task-item-container">
              {filteredTaskList.length === 0 ? (
                <h1 className="no-task">No Tasks Found</h1>
              ) : (
                <ul className="task-list">
                  {filteredTaskList.map((eachItem, i) => (
                    <TaskItem
                      key={eachItem.id}
                      taskDetails={eachItem}
                      deleteTaskItem={deleteTaskItem}
                      updateStatusApi={updateStatusApi}
                      updateLikesApi={updateLikesApi}
                      makeApiRequest={makeApiRequest}
                    />
                  ))}
                </ul>
              )}
            </div>
          );
        }}
      </FilterContext.Consumer>
    </div>
  );
};

export default Tasks;
// werfrf
