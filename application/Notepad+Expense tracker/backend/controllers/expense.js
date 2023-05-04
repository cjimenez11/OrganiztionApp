const ExpenseSchema = require("../models/ExpenseModel")

//This function is used to add new Expense data to DB.

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

//This function is used to get Expense data. 

exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

//This function deletes the expense from DB.

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    // ExpenseSchema.findByIdAndDelete(id)
    //     .then((income) =>{
    //         res.status(200).json({message: 'Expense Deleted'})
    //     })
    //     .catch((err) =>{
    //         res.status(500).json({message: 'Server Error'})
    //     })
    try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Expense Deleted" });
      } catch (err) {
        res.status(500).json({ message: "Server Error" });
      }
}