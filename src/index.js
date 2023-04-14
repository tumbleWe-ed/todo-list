import './styles.css';
import todoEditor from './functionality';

const projectSidebarUl = document.querySelector('.sidebar-project-list');
const projectCreatorBtn = document.querySelector('#project-creator-btn');

const mainBody = document.querySelector('.main-body');


// Projects
const arrOfProjectDivs = [];
const arrOfProjects = [];
let curProjectIndex;
let i = 0;

function projectCreator() {
    const arrOfTodos = [];
    return{arrOfTodos};
}

function projectDivCreator(projectTitle) {
    const projectDiv = document.createElement('li');
    projectSidebarUl.append(projectDiv);
    projectDiv.textContent = projectTitle;
    projectDiv.className = "project-div";
    arrOfProjectDivs.push(projectDiv);
}

function createATodo() {
    let title;
    let notes;
    let div;
    let deleteBtn;
    return{title,notes,div,deleteBtn}
}


function todoListCreator(projectName,indexOfProject) {
    
    // todo Creator Btn
    const todoCreatorBtn = document.querySelector('.todo-btn');
   // mainBody.append(todoCreatorBtn);

    todoCreatorBtn.addEventListener('click', () => {

        const curTodoDiv = createATodo()

        curTodoDiv.div = document.createElement('div');
        curTodoDiv.div.className = `${projectName}${i}`
        curTodoDiv.div.innerHTML = `<dialog class="form-dialog">
        <form method="dialog"class="form">
            <input type="text" id="title" placeholder="title"><br>
            <textarea id="notes" placeholder="Notes"></textarea><br>
            <button id="submit-btn">Submit</button> <button class="cancel-btn" type="reset">Cancel</button>
        </form>
    </dialog>`

        mainBody.append(curTodoDiv.div);

        // items in the dialog
        const curDialog = document.querySelector('.form-dialog');
        const title = document.querySelector('#title');
        const notes = document.querySelector('#notes')

        curDialog.showModal();
        // submit btn todo
        const submitBtn = document.querySelector('#submit-btn');

        submitBtn.addEventListener('click',(event) => {
            mainBody.append(curTodoDiv.div);

            arrOfProjects[indexOfProject].arrOfTodos.push(curTodoDiv);
            curTodoDiv.title = `${title.value}`;
            curTodoDiv.notes = `${notes.value}`;
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

            curTodoDiv.div.innerHTML = `title: ${curTodoDiv.title}<br>notes: ${curTodoDiv.notes}<br>`
            
            const deletebutton = document.createElement('button');
            deletebutton.textContent = 'Delete';
            deletebutton.classList.add(`delele-btn`)
            deletebutton.id = `todo-del-btn${i}`
            curTodoDiv.div.append(deletebutton);
            curTodoDiv.deleteBtn = deletebutton;
            
            
            i++;
            event.stopPropagation();
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
    if(projectName !== "" && projectName !== null) {
        projectDivCreator(projectName);
        window[projectName] = projectCreator();
        arrOfProjects.push(window[projectName])
            
        arrOfProjectDivs.forEach((e) => {
            e.addEventListener('click',(divEvent) => {
                mainBody.innerHTML = `<h2>${e.textContent}</h2> <button class='todo-btn'>+</button>`;

                
                const indexOfProject = arrOfProjectDivs.indexOf(e);
                todoListCreator(e.textContent,indexOfProject);

                arrOfProjects[indexOfProject].arrOfTodos.forEach((a) => {
                    mainBody.append(a.div)
                })

                curProjectIndex = indexOfProject;

                
            })
        })
    }
    
});
function testFunc(event) {
    const element = event.target;
    if(element.classList.contains("project-div")) {
        
        console.log(element)
        if(arrOfProjects[curProjectIndex].arrOfTodos.length === 0) {
            i = 0;
        } else {
            i = arrOfProjects[curProjectIndex].arrOfTodos.length -1;
        }
        console.log("i = ",i);
    }
    
    event.stopPropagation();
    
    if(element.classList.contains("delele-btn")) {
        const indexOfObj = element.id.slice(-1);
        const curObj = arrOfProjects[curProjectIndex].arrOfTodos[indexOfObj];
        curObj.div.remove()
        arrOfProjects[curProjectIndex].arrOfTodos.splice(indexOfObj,1);
        console.log(arrOfProjects[curProjectIndex].arrOfTodos.length);
        if(arrOfProjects[curProjectIndex].arrOfTodos.length === 1) {
            arrOfProjects[curProjectIndex].arrOfTodos[0].div.className = arrOfProjects[curProjectIndex].arrOfTodos[0].div.className.replace(/.$/,`0`);
            arrOfProjects[curProjectIndex].arrOfTodos[0].deleteBtn.id = arrOfProjects[curProjectIndex].arrOfTodos[0].deleteBtn.id.replace(/.$/,`0`)
        } else if (arrOfProjects[curProjectIndex].arrOfTodos.length === 0) {
            i = 0;
        } else {
            for(let j = 0; j < arrOfProjects[curProjectIndex].arrOfTodos.length; j++) {
                arrOfProjects[curProjectIndex].arrOfTodos[j].div.className = arrOfProjects[curProjectIndex].arrOfTodos[j].div.className.replace(/.$/,`${j}`);
                arrOfProjects[curProjectIndex].arrOfTodos[j].deleteBtn.id = arrOfProjects[curProjectIndex].arrOfTodos[j].deleteBtn.id.replace(/.$/,`${j}`)
                console.log(arrOfProjects[curProjectIndex].arrOfTodos[j])
            }
        }
        
        console.log(arrOfProjects)
        
    }    
}

document.addEventListener( "click", testFunc );