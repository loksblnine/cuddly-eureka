import {Role} from "./Roles";
import {User} from "./Users";
import {UserToUser} from "./UserToUser";

UserToUser.removeAttribute('id');
User.hasOne(Role);
Role.belongsTo(User);
User.belongsToMany(User, {through: UserToUser, as: "bossUsers", foreignKey: "id"});
User.belongsToMany(User, {through: UserToUser, as: "regularUsers", foreignKey: "id"});

export {
  Role,
  User,
  UserToUser
};
