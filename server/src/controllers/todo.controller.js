const todoModel  = require('../models/todo.model');
const userModel  = require('../models/user.model');

// Get all todo
exports.getTodo = async (req, res) => {
    try {
        const todo = await todoModel.find();
        if (todo.length === 0) {
            return res.status(404).json({ message: 'No todo found' });
        } 
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get todo by id
exports.getTodoById = async (req, res) => {
    try {
        const todo = await todoModel.findById(req.params.id);
        if (todo === null) {
            return res.status(404).json({ message: 'Todo not found' });
        } 
        res.status(200).json(todo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// Create new todo
exports.createTodo = async (req, res) => {
    
    const { Title, Status, Priority, DueDate, Comment, User:userId } = req.body;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const todo = new todoModel({
            Title,
            Status: Status || 'To-Do',
            Priority: Priority || 'Normal',
            DueDate: DueDate || null,
            Comment: Comment || null,
            User:userId,
        });

        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// Update todo by id
exports.updateTodo = async (req, res) => {

    const id = req.params.id;
    const {Title , Status, Priority,DueDate,Comment} = req.body;
    try {

        const todo = await todoModel.findByIdAndUpdate(id ,{
            Title,
            Status,
            Priority,
            DueDate,
            Comment,
        } , {new: true}); 
        if (todo === null) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};


// delete todo
exports.deleteTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await todoModel.findByIdAndDelete(id);
        if (todo === null) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Get Todo By ID
exports.getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await todoModel.findById(id);
        if (todo === null) {
            return res.status(404).json({ message: 'Todo not found' });
        } 
        res.status(200).json(todo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


//Get Todo By Status
exports.getTodoByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const todo = await todoModel.find({Status: status});
        if (todo === null) {
            return res.status(404).json({ message: 'Todo not found' });
        } 
        res.status(200).json(todo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

