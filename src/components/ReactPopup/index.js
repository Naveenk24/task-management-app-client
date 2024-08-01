import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { FaPlusCircle } from 'react-icons/fa';
import './index.css';

const ReactPopup = (props) => {
  const { makeApiRequest } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const jwtToken = Cookies.get('jwt_token');

  const submitTheTaskDetails = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
    };

    try {
      await axios.post('http://localhost:3005/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      makeApiRequest();
    } catch (error) {
      console.log('Error Adding New Task ', error);
    }
  };

  return (
    <div>
      <Popup
        modal
        trigger={
          <button className="add-icon-button">
            <FaPlusCircle className="add-icon" />
          </button>
        }
      >
        {(close) => (
          <>
            <div className="popup-container">
              <p className="add-task-heading">Add Task</p>
              <form className="add-task-form" onSubmit={submitTheTaskDetails}>
                <div className="add-input-container">
                  <label className="add-input-label">Title</label>
                  <input
                    type="text"
                    placeholder="title.."
                    className="add-input-element"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="add-input-container">
                  <label className="add-input-label">Description</label>
                  <textarea
                    rows={7}
                    cols={38}
                    placeholder="description.."
                    className="text-area"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="popup-close-button">
                  <button
                    className="close-input-button"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                  <button type="submit" className="add-input-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </Popup>
    </div>
  );
};

export default ReactPopup;
