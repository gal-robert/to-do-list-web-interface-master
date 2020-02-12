window.ToDoList = {

    API_BASE_URL: "http://localhost:8081/tasks",

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

    displayTasks: function(tasks) {
        var tableBody = '';
        
        tasks.forEach(element => tableBody += ToDoList.getTaskRow(task));
        $("#tasks-table tbody").html(tableBody)
    }

    

};

ToDoList.getTasks();
