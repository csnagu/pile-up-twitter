const getTsundokuNum = async () => {
    // Dependencies
    const axios = require('axios');

    // Load bearer token
    const todoistBearer = process.env["TODOIST_BEARER"]

    // Todoist REST API
    // Get All Tasks
    const allTasks = await axios.get("https://api.todoist.com/rest/v1/tasks", {
        headers: {
            Authorization: `Bearer ${todoistBearer}`
        }
    }).then(response => {
        return response;
    }).catch(function (error) {
        console.error(error);
    })

    // Filter tasks by project id and count it
    const project_id = process.env["TODOIST_PILE_UP_PROJECT_ID"];
    let todoistTsundokuList = 0;
    allTasks.data.forEach(item => {
        if (item.project_id == project_id) {
            todoistTsundokuList += 1;
        }
    })
    return todoistTsundokuList;
}
module.exports = getTsundokuNum;
