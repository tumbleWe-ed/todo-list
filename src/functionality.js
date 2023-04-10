/** function todoListCreator(title,description,dueDate,priority,note) {
    return {title,description,dueDate,priority,note}
};

function projectCreator(projectName) {
    const projectTodos = []
    return{projectTodos}
}* */
export default function todoEditor() {
    const title = document.querySelector('#title');
    const notes = document.querySelector('#notes');
    const submitBtn = document.querySelector('#submit-btn');
    submitBtn.addEventListener('click', (event) => {
        console.log(title.value,notes.value)
        event.preventDefault();
    })
}
