import { FaTimes } from 'react-icons/fa';

const Task = ({id, text, day, reminder, toggleTaskReminder, handleDeleteTask}) => (
    <div className={`card card-body my-2 ${reminder ? 'bg-primary text-white mx-3' : 'mx-4'}`}>
        <div className="d-flex justify-content-between align-items-center gap-3">
            <div className="w-100" style={{cursor: 'pointer', userSelect: 'none'}} onDoubleClick={() => toggleTaskReminder(id)}>
                <div className="h5">{text}</div>
                <span>{ day }</span>
            </div>
            <button className="btn btn-danger h-50 fw-bolder h5 m-0" onClick={() => handleDeleteTask(id)}><FaTimes/></button>
        </div>
    </div>
)

export default Task;