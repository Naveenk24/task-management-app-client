import { FaRegHeart, FaHeart } from 'react-icons/fa';

import ReactEditPopup from '../ReactEditPopup/index';
import { MdDelete } from 'react-icons/md';
import './index.css';

const TaskItem = (props) => {
  const {
    taskDetails,
    deleteTaskItem,
    updateStatusApi,
    updateLikesApi,
    makeApiRequest,
  } = props;

  const { title, description, id, is_completed, is_like } = taskDetails;

  const completedStatus =
    is_completed === 0 ? 'task-item-incomplete' : 'task-item-status';

  const completedStatusText = is_completed === 0 ? 'In Progress' : 'Completed';

  const likedStatus =
    is_like === 0 ? (
      <FaRegHeart className="task-item-icons" />
    ) : (
      <FaHeart className="task-item-icons task-item-like" />
    );

  return (
    <li className="tasks-item">
      <p className="task-item-title">{title}</p>
      <p className="task-item-description">{description}</p>
      <div className="task-item-icons-container">
        <button className={completedStatus} onClick={() => updateStatusApi(id)}>
          {completedStatusText}
        </button>
        <button className="task-item-button" onClick={() => updateLikesApi(id)}>
          {likedStatus}
        </button>
        <ReactEditPopup
          taskDetails={taskDetails}
          makeApiRequest={makeApiRequest}
        />
        <button className="task-item-button" onClick={() => deleteTaskItem(id)}>
          <MdDelete className="task-item-icons" />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
