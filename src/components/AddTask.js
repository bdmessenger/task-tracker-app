import { useState } from 'react'

const AddTask = ({ handleAddTask }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }

    handleAddTask({ text, day, reminder })

    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className="mb-4" onSubmit={onSubmit}>
      <div className='form-group mb-2'>
        <label>Task</label>
        <input
          className="form-control"
          type='text'
          placeholder='Add Task'
          value={text}
          required={true}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-group mb-2'>
        <label>Day & Time</label>
        <input
          className="form-control"
          type='text'
          placeholder='Add Day & Time'
          required={true}
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className='form-check mb-3'>
        <label className="form-check-label">Set Reminder</label>
        <input
          className="form-check-input"
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-success'/>
    </form>
  )
}

export default AddTask