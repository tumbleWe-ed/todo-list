import './styles.css';

const mainBody = document.querySelector('.main-body');
const projectCreatorBtn = document.querySelector('#project-creator-btn');

function projectCreator(title,description,dueDate,priority,note) {
    return {title,description,dueDate,priority,note}
};

function projectDivCreator() {
    const projectDiv = document.createElement('div');
    mainBody.append(projectDiv);
}

