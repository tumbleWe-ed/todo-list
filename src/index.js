import './styles.css';

const projectSidebarUl = document.querySelector('.sidebar-project-list');
const projectCreatorBtn = document.querySelector('#project-creator-btn');

const mainBody = document.querySelector('.main-body');


// Projects
const arrOfProjectDivs = [];
const arrOfProjects = [];

function projectCreator() {
    const arrOfTodos = [];
    return{arrOfTodos};
}

function projectDivCreator(projectTitle) {
    const projectDiv = document.createElement('li');
    projectSidebarUl.append(projectDiv);
    projectDiv.textContent = projectTitle;
    arrOfProjectDivs.push(projectDiv);


}



function todoListCreator(projectName,indexOfProject) {
    // todo Creator Btn
    const todoCreatorBtn = document.querySelector('.todo-btn');
   // mainBody.append(todoCreatorBtn);

    todoCreatorBtn.addEventListener('click', () => {


        const todoDiv = document.createElement('div');
        todoDiv.className = `${projectName}`
        mainBody.append(todoDiv);

        console.log(arrOfProjects)
        arrOfProjects[indexOfProject].arrOfTodos.push(todoDiv)
    })
}

// todo


projectCreatorBtn.addEventListener('click', () => {
    /** prompt("Enter your project's name") */
    const projectName = prompt("Enter your project's name")
    projectDivCreator(projectName);
    window[projectName] = projectCreator();
    arrOfProjects.push(window[projectName])
        
    arrOfProjectDivs.forEach((e) => {
        e.addEventListener('click',() => {
            mainBody.innerHTML = `<h2>${e.textContent}</h2> <button class='todo-btn'>+</button>`;

            
            const currentProjectIndex = arrOfProjectDivs.indexOf(e);
            todoListCreator(e.textContent,currentProjectIndex);

            arrOfProjects[currentProjectIndex].arrOfTodos.forEach((div) => {
                mainBody.append(div)
            })
            

                        
        })
    })
});

