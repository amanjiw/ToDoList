"use strict"

const inputName = document.querySelector(".i-name");
const inputDoWhat = document.querySelector(".i-do");
const inputWhen = document.querySelector(".i-when");
const inputDescription = document.querySelector(".description");
const submitBtn = document.querySelector(".sub-btn");
const toDoContainer = document.querySelector(".todos");
const resetBtn = document.querySelector(".del-btn");

// toDo class
class ToDo {

    constructor(inputname, inputdo, inputwhen, idescription) {

        this.inputName = inputname;
        this.inputDo = inputdo;
        this.inputWhen = inputwhen;
        this.inputDescriptionn = idescription;
        this.date = [];
        this._fulldate()
        console.log("aidaaaa", this.fullDate)
    }

    _fulldate() {
        const date = new Date(this.inputWhen);
        this.fullDate = date;

    }

}



//main class
class App {
    #allToDos = new Array;
    constructor() {
        submitBtn.addEventListener("click", this._showToDos.bind(this));
        console.log("one : ", this.#allToDos);
        this._getLocalStorage();
        resetBtn.addEventListener("click", this._reset.bind(this));
    };


    //creat new todo object and added to localstorge and alltodo arry and  show it for user
    _showToDos(event) {
        event.preventDefault();
        let td;
        const iName = inputName.value;
        const iDo = inputDoWhat.value;
        const iWhen = inputWhen.value;
        const description = inputDescription.value;


        if (iName && iDo && iWhen && description) {

            td = new ToDo(iName, iDo, iWhen, description);
            this.#allToDos.push(td);
            this._creatNewToDO(td.inputName, td.inputDo, td.fullDate, td.inputDescriptionn);
            this._setLocalSoreg();

        }


        inputName.value = "";
        inputDoWhat.value = "";
        inputWhen.value = "";
        inputDescription.value = "";

    }





    // creat todo item  
    _creatNewToDO(iName, iDo, iWhen, ides) {
        Option = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        }
        const html = `
    
        <div class="todo">
                <section class="todo-header"> ${iDo.toUpperCase()}</section>
                <sction class="doname">  by ${iName}</sction>
                <section class="dowhat"> ${ides} </section>
                <section class="dowhen"> ${new Intl.DateTimeFormat("en-US", Option).format(iWhen)}</section>
            </div>
        `;
        toDoContainer.insertAdjacentHTML("afterbegin", html);

    }

    // set data on localStorage
    _setLocalSoreg() {

        localStorage.setItem("todolists", JSON.stringify(this.#allToDos));

    };


    //get todo data from locale Storage
    _getLocalStorage() {
        if (localStorage.key("todoslists")) {

            this.#allToDos = JSON.parse(localStorage.getItem("todolists"));


            this.#allToDos.forEach(todo => {
                const date = new Date(todo.fullDate);
                console.log(date);
                this._creatNewToDO(todo.inputName, todo.inputDo, date, todo.inputDescriptionn);
            })
        }


    }
    _reset() {
        localStorage.removeItem("todolists");
        location.reload();
    }


}

const app = new App();

