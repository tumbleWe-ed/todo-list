import './styles.css';
import todoEditor from './functionality';

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

function createATodo() {
    let title;
    let notes;
    let div;
    return{title,notes,div}
}


function todoListCreator(projectName,indexOfProject) {
    // todo Creator Btn
    const todoCreatorBtn = document.querySelector('.todo-btn');
   // mainBody.append(todoCreatorBtn);

    todoCreatorBtn.addEventListener('click', () => {

        const curTodoDiv = createATodo()

        curTodoDiv.div = document.createElement('div');
        curTodoDiv.div.className = `${projectName}`
        curTodoDiv.div.innerHTML = `<dialog class="form-dialog">
        <form method="dialog"class="form">
            <input type="text" id="title" placeholder="title"><br>
            <textarea id="notes" placeholder="Notes"></textarea><br>
            <button id="submit-btn">Submit</button> <button class="cancel-btn" type="reset">Cancel</button>
        </form>
    </dialog>`

        mainBody.append(curTodoDiv.div);

        const curDialog = document.querySelector('.form-dialog');
        curDialog.showModal();
        // submit btn todo
        const submitBtn = document.querySelector('#submit-btn');

        submitBtn.addEventListener('click',(event) => {
            mainBody.append(curTodoDiv.div);

            arrOfProjects[indexOfProject].arrOfTodos.push(curTodoDiv);
            event.preventDefault();

            todoEditor();

            console.log(arrOfProjects);
            curDialog.close();

            // fixes duplication in arr of todos
            arrOfProjects.forEach((e) => {
                e.arrOfTodos = e.arrOfTodos.filter((value,index,self) => 
                    index === self.findIndex((t) => (
                        t.div === value.div
                    ))
                )
            }) 
        })

        const cancelBtn = document.querySelector('.cancel-btn');
        cancelBtn.addEventListener('click',() => {
            curDialog.close();
            curTodoDiv.div.remove();

            console.log(arrOfProjects);
        })
        
        
        
        

        
    })
}

// todo


projectCreatorBtn.addEventListener('click', () => {
    /** prompt("Enter your project's name") */
    const projectName = prompt("Enter your project's name");
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

