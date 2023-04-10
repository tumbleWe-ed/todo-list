import './styles.css';

const projectSidebar = document.querySelector('.sidebar-project')
const projectSidebarUl = document.querySelector('.sidebar-project-list');
const projectCreatorBtn = document.querySelector('#project-creator-btn');

const mainBody = document.querySelector('.main-body');


// Projects
const arrOfProjects = [];


function projectDivCreator(projectTitle) {
    const projectDiv = document.createElement('li');
    projectSidebarUl.append(projectDiv);
    projectDiv.textContent = projectTitle;
    arrOfProjects.push(projectDiv)


}

function todoDivCreator(projectName) {
    const todoDiv = document.createElement('div');
    todoDiv.className = `${projectName}`
    mainBody.append(todoDiv);

    return {todoDiv}
}

function todoListCreator(projectName) {
    // todo Creator Btn
    const todoCreatorBtn = document.querySelector('.todo-btn');
    mainBody.append(todoCreatorBtn);

    todoCreatorBtn.addEventListener('click', () => {
        todoDivCreator(projectName);

    })

}



// Test

projectCreatorBtn.addEventListener('click', () => {
    /** prompt("Enter your project's name") */
    projectDivCreator('a');

        
    arrOfProjects.forEach((e) => {
        e.addEventListener('click',() => {

            mainBody.innerHTML = `<h2>${e.textContent}</h2> <button class='todo-btn'>+</button>`;

            console.log(e)

            todoListCreator(e.textContent);

            
            
            
        })
    })
});


