import Users from '../models/userModel.js'
export const getUsersController = async (req, res) => {
    try {
        const users = await Users.find();
        // console.log("Users", users)
        res.status(200).send(users);
    } catch (error) {
        res.send('intenal server error', error)
    }
};

export const editUsersController = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await Users.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    console.log(error);

    res.status(400).json({
      success:false,
      error
    });

  }
};
//delete Users
export const deleteUsersController = async (req, res) => {
    try {
        const { id } = req.params;
        await Users.findByIdAndDelete(id)

        res.status(200).json("Users Deleted");
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};