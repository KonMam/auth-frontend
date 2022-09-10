import { useState } from "react"
import '../styles/TaskCreator.css'

async function createTask(text: {text: string}) {
    return fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(text)
    })
      .then(data => data.json())
}

export default function TaskList() {

    const [text, setText] = useState<string>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        if (text) {
            await createTask(
                {text}
            );
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="task-creator">
                <textarea 
                    name="text" 
                    className="create-task-element" 
                    id="create-task-input"
                    placeholder="New Note"
                    onChange={e => setText(e.target.value)}>
                </textarea>
                <button 
                    type="submit" 
                    value="Submit" 
                    className="create-task-element"
                    id='create-task-button'>
                Submit
                </button>
            </form>
        </div>
    )
}
