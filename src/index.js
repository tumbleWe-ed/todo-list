import './styles.css';
import todoEditor from './functionality';

const projectSidebarUl = document.querySelector('.sidebar-project-list');
const projectCreatorBtn = document.querySelector('#project-creator-btn');

const mainBody = document.querySelector('.main-body');


// Projects
const arrOfProjectDivs = [];
const arrOfProjects = [];
let curProjectIndex = -1;
let i = 0;

let testBool = false;

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
            deletebutton.id = 'todo-del-btn'
            deletebutton.className= `todo-del-btn${i}`
            curTodoDiv.div.append(deletebutton);
            curTodoDiv.deleteBtn = deletebutton;
            

            testBool = true;
            console.log(testBool)
            /** const allTodos = document.querySelectorAll('.main-body div');
            allTodos.forEach((a) => {
                /** a.addEventListener('click',(todoEvent) => {
                    const curDivIndex = (a.className).slice(-1);
                    const todo = arrOfProjects[indexOfProject].arrOfTodos[curDivIndex];
                    const curDeleteBtn = arrOfProjects[indexOfProject].arrOfTodos[curDivIndex].deleteBtn
                    console.log(curDeleteBtn)

                    console.log('accessing div')
                    todoEvent.stopPropagation()

                    
                })
                const curDivIndex = (a.className).slice(-1);
                const todo = arrOfProjects[indexOfProject].arrOfTodos[curDivIndex];
                const curDeleteBtn = arrOfProjects[indexOfProject].arrOfTodos[curDivIndex].deleteBtn

                curDeleteBtn.addEventListener('click',(delEvent) => {
                        
                    // console.log(arrOfProjects[indexOfProject].arrOfTodos[curDivIndex])
                   todo.div.remove();

                   arrOfProjects[indexOfProject].arrOfTodos.splice(curDivIndex,1);

                    console.log(arrOfProjects)
                   delEvent.stopPropagation();
                    
                })
            })* */
            
            
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
            

            divEvent.stopPropagation()
            /** console.log(testBool)
            const allTodos = document.querySelectorAll('.main-body div');

            allTodos.forEach((a) => {
                a.addEventListener('click',(g) => {
                    console.log(g)
                })
            })* */

            
        })
    })
});
function testFunc() {
    if(testBool) {
        const allDelBtns = document.querySelectorAll('#todo-del-btn');
        allDelBtns.forEach((e) => {
            e.addEventListener('click',() => {
                if(arrOfProjects[curProjectIndex].arrOfTodos.length === 1) {
                    i = 0;
                }
                const curObj = arrOfProjects[curProjectIndex].arrOfTodos[(e.className).slice(-1)];
                const indexOfObj = (e.className).slice(-1);

                console.log(curObj)
                console.log(indexOfObj)
                console.log(arrOfProjects[curProjectIndex].arrOfTodos[indexOfObj])
                arrOfProjects[curProjectIndex].arrOfTodos[indexOfObj].div.remove()
                arrOfProjects[curProjectIndex].arrOfTodos.splice(indexOfObj,1);
            })
        })

    

        /** const allTodos = document.querySelectorAll('.main-body div');
            allTodos.forEach((a) => {
                /** a.addEventListener('click',(todoEvent) => {
                    const curDivIndex = (a.className).slice(-1);
                    const todo = arrOfProjects[indexOfProject].arrOfTodos[curDivIndex];
                    const curDeleteBtn = arrOfProjects[indexOfProject].arrOfTodos[curDivIndex].deleteBtn
                    console.log(curDeleteBtn)

                    console.log('accessing div')
                    todoEvent.stopPropagation()

                    
                })
                const curDivIndex = (a.className).slice(-1);
                const todo = arrOfProjects[indexOfProject].arrOfTodos[curDivIndex];
                const curDeleteBtn = arrOfProjects[indexOfProject].arrOfTodos[curDivIndex].deleteBtn

                curDeleteBtn.addEventListener('click',(delEvent) => {
                        
                    // console.log(arrOfProjects[indexOfProject].arrOfTodos[curDivIndex])
                   todo.div.remove();

                   arrOfProjects[indexOfProject].arrOfTodos.splice(curDivIndex,1);

                    console.log(arrOfProjects)
                   delEvent.stopPropagation();
                    
                })
            })* */
    }
}


setInterval(testFunc,1500)