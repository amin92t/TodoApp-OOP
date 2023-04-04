class Todo{
    constructor(title) {
        this.title = title
        this.complete = false
    }
}

class TodoList{
    constructor(todoContainer) {
        this.todoContainer = todoContainer
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
        this.todoInput = document.getElementById('todo-item')
        this.addTodoBtn = document.querySelector('.form__button-submit')
        this.clearTodoBtn = document.querySelector('.form__button-reset')
        this.render()
    }

    render(){
        console.log('Class Created')

        this.addTodoBtn.addEventListener('click',event=>{
            event.preventDefault()
            this.addNewTodo(this.todoInput.value)
        })

        this.clearTodoBtn.addEventListener('click',(event)=> {
                event.preventDefault()
                this.clearTodos()
            }
        )

        this.addTodoToDom()
        this.saveTodoToLocalStorage()
    }
    clearTodos(){
        this.todos = []
        this.render()
        this.saveTodoToLocalStorage()

    }
    addNewTodo(newTodoTitle){
        if(newTodoTitle.trim()){
            this.todos.push(new Todo(newTodoTitle))
            this.saveTodoToLocalStorage()
            this.addTodoToDom()
            this.todoInput.value = ''
        }
    }

    addTodoToDom(){
        console.log('Created Todo')
        this.todoContainer.innerHTML = ''

        this.todos.forEach((todoItem, todoIndex)=>{
            let todo = document.createElement('div')
            todo.classList.add('todo')

            let todoTitleElem = document.createElement('p')
            todoTitleElem.className = 'todo__title'
            todoTitleElem.innerText = todoItem.title

            let completeBtn = document.createElement('button')
            completeBtn.className = 'todo__status'
            completeBtn.innerText = "Complete"
            todoItem.complete ? completeBtn.classList.add('complete') : null
            todoItem.complete ?  completeBtn.innerText = "UnComplete" :  completeBtn.innerText = "Complete"
            completeBtn.addEventListener('click',event=>{
                event.preventDefault()
                event.target.classList.toggle('complete')
                completeBtn.innerText = "UnComplete"
                todoItem.complete = !todoItem.complete
                this.saveTodoToLocalStorage()
                this.addTodoToDom()
            })

            let removeBtn = document.createElement('button')
            removeBtn.className = 'todo__delete'
            removeBtn.innerText = "Remove"
            removeBtn.addEventListener('click',e=>{
                e.preventDefault()
                let todoIndexNumber = this.todos.findIndex((todo, index)=>
                index == todoIndex)
                this.todos.splice(todoIndexNumber, 1)
                this.saveTodoToLocalStorage()
                this.addTodoToDom()
            })

            todo.append(todoTitleElem, completeBtn, removeBtn)


            this.todoContainer.append(todo)
        })
    }



    saveTodoToLocalStorage(){
        localStorage.setItem('todos',JSON.stringify(this.todos))
    }
}

new TodoList(document.querySelector('.todos__wrapper'))