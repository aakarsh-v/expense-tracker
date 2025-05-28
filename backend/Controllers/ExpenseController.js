const UserModel = require('../Models/User');

const addExpenses = async (req, res) => {
    const body = req.body;
    const {_id} = req.user;
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id, //user id
            {
                $push: {
                    expenses: body //expenses data
                }
            },
            {
                new: true // return the updated document
            }
        )
        return res.status(201).json({
            message: "Expense added successfully",
            success: true,
            data: userData?.expenses // return the updated expenses array
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        });
    };
}

const fetchExpenses = async (req, res) => {
    const body = req.body;
    const {_id} = req.user;
    try {
        const userData = await UserModel.findById(_id).select('expenses')
        return res.status(200).json({
            message: "Fetched Expenses successfully",
            success: true,
            data: userData?.expenses
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        });
        
    }
}

const deleteExpenses = async (req, res) => {
    const {_id} = req.user;
    const {expenseId} = req.params;
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            {
                $pull: { expenses: {_id: expenseId}}
            },
            {new: true}
        )
        return res.status(200).json({
            message: "Expense deleted succesfully",
            success: true,
            data: userData?.expenses
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        })
    }
}

module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpenses
}
