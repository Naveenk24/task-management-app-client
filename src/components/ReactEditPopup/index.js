import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { FaEdit } from 'react-icons/fa';
import './index.css';

const ReactEditPopup = (props) => {
  const { taskDetails, makeApiRequest } = props;
  const { title, description, id } = taskDetails;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const jwtToken = Cookies.get('jwt_token');

  const submitTheTaskDetails = async (e) => {
    e.preventDefault();

    const newTask = {
      newTitle,
      newDescription,
    };

    try {
      await axios.put(`http://localhost:3005/update-task/${id}`, newTask, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      makeApiRequest();
    } catch (error) {
      console.log('Error will update the task', error);
    }
  };

  return (
    <div>
      <Popup
        modal
        trigger={
          <button className="task-item-button">
            <FaEdit className="task-item-icons" />
          </button>
        }
      >
        {(close) => (
          <>
            <div className="popup-container">
              <p className="add-task-heading">Edit</p>
              <form className="add-task-form" onSubmit={submitTheTaskDetails}>
                <div className="add-input-container">
                  <label className="add-input-label">Title</label>
                  <input
                    type="text"
                    placeholder="title.."
                    className="add-input-element"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="add-input-container">
                  <label className="add-input-label">Description</label>
                  <textarea
                    rows={7}
                    cols={38}
                    placeholder="description.."
                    className="text-area"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
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
                    Update
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

export default ReactEditPopup;
