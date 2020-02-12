window.ToDoList = {

    API_BASE_URL: "http://localhost:8082/tasks",

    getTasks: function () {
        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            ToDoList.displayTasks(JSON.parse(response));
        })
    },

    getTaskRow: function (task) {
        ///...                           spread operator
        let formattedDeadline = new Date(...task.deadline).toLocaleDateString('ro');
        let checkedAttribute = task.done ? " checked" : "";

        return `<tr>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
            <td><input type="checkbox" data-id=${task.id} class="mark-done"/> ${checkedAttribute}</td>
            <td><a href="#" data-id=${task.id} class="delete-task">
                <i class="fas fa-trash-alt"></i>
        </tr>`
    },

    displayTasks: function (tasks) {
        var tableBody = '';

        tasks.forEach(task => tableBody += ToDoList.getTaskRow(task));
        $("#tasks-table tbody").html(tableBody)
    },

    updateTask: function(id, done) {
        let reqBody = {
            done: done,
        }

        $.ajax({
            url: ToDoList.API_BASE_URL + "?id=" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(reqBody)
        }).done(()=>{
            ToDoList.getTasks();
        })
    },

    createTask: function () {
        //
        let descriptionValue = $("#description-field").val();
        let deadlineValue = $("#deadline-field").val();

        let reqBody = {
            description: descriptionValue,
            deadline: deadlineValue
        }
        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(reqBody)
        }).done(()=> {
            ToDoList.getTasks()
        })
    },

    deleteTasks: (id) => {
        $.ajax({
            url: ToDoList.API_BASE_URL + "?id=" + id,
            method: "DELETE"
        }).done( () => {
            ToDoList.getTasks();
        })
    },

    bindEvents: function () {
        //binding submit event to createTask method
        $("#new-task-from").submit((e)=> {
            e.preventDefault();
            ToDoList.createTask();
        })

        $("#tasks-table").delegate(".mark-done", "change", (e) => {
            e.preventDefault();

            //reading data attr
            let taskID = $(this).data("id");
            let done = $(this).is(":checked")

            ToDoList.updateTask(taskID, done)
        })

        $("#tasks-table").delegate(".delete-task", "click", (event) => {
                event.preventDefault();

                //reading data attr
                let taskID = $(this).data("id");

                ToDoList.deleteTasks(taskID)
            })
        }


};

ToDoList.getTasks();
ToDoList.bindEvents();
