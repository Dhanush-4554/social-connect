import User from "../models/User.js";

/* read */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by id
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by id
    const user = await User.findById(id);

    // Find and format user's friends
    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    // Find user by id
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Add or remove friend based on user's friends list
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((currentFriendId) => currentFriendId !== friendId);
      friend.friends = friend.friends.filter((currentFriendId) => currentFriendId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Save changes to both users
    await user.save();
    await friend.save();

    // Get and format user's updated friends
    const updatedFriends = await Promise.all(
      user.friends.map((updatedFriendId) => User.findById(updatedFriendId))
    );
    const formattedUpdatedFriends = updatedFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedUpdatedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
