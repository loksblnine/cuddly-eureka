/**
 * usersController.ts
 * */

import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {User, UserToUser} from "../database/models";

export const createUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const email = String(request.body.email),
      password = String(request.body.password),
      role = Number(request.body.role);

    const encryptedPassword: string = await bcrypt.hash(password, 5);

    const user: User = await User.create({
      email, password: encryptedPassword, role
    });

    response.status(201).json(
      user
    );
  } catch (e) {
    response.status(500).json("Something went wrong");
  }
};

const fetchRegulars = async (bossId: number) => {
  const regularIds = await UserToUser.findAll({
    attributes: ["regularId"],
    where: {
      "bossId": Number(bossId)
    },
    raw: true,
  })
    .then((arr) => arr.map((r) => r.regularId));

  let promises: Promise<any>[] = [];
  regularIds.map((index) => {
    promises.push(User.findOne({
      attributes: ["id", "email", "role"],
      where: {
        id: Number(index)
      },
      raw: true
    }));
  });
  return Promise.all(promises)
    .then((resp) => {
      return resp.map((elem) => {
        if (elem.role === 2) {
          elem.regulars = fetchRegulars(elem.id);
        }
        return elem;
      });
    });
};

export const getAllUsers = async (request: Request, response: Response): Promise<void> => {
  try {
    const user = request.body.user;
    const limit = Number(request.query.limit) || 10,
      offset = Number(request.query.offset) || 0;

    switch (Number(user.role)) {
      case 1: {
        const users = await User.findAll({
          attributes: ["id", "email", "role"],
          limit,
          offset
        });
        response.status(201).json(users);
        break;
      }
      case 2: {
        const result = {...user};
        result.regulars = await fetchRegulars(user.id);
        response.status(201).json(result);
        break;
      }
      case 3: {
        const regular = await User.findOne({
          attributes: ["id", "email", "role"],
          where: {
            id: Number(user.id)
          }
        });
        response.status(201).json(regular);
        break;
      }
      default: {
        response.status(201).json([]);
      }
    }
  } catch (e) {
    response.status(500).json("Something went wrong");
  }
};

export const getUserById = async (request: Request, response: Response): Promise<void> => {
  try {
    const id: string = request.params.id;
    const user: User | null = await User.findOne({
      where: {
        id
      }
    });
    response.status(201).json(
      user
    );
  } catch (e) {
    response.status(500).json("Something went wrong");
  }
};

export const deleteUserById = async (request: Request, response: Response): Promise<void> => {
  try {
    const id = Number(request.params.id);
    await User.destroy({
      where: {
        id
      }
    });
    response.status(201).json(
      `User ${id} was removed successfully`
    );
  } catch (e) {
    response.status(500).json("Something went wrong");
  }
};

export const updateUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const id = Number(request.params.id);
    const email = String(request.body.email),
      role = Number(request.body.role),
      password = String(request.body.password);
    const encryptedPassword: string = await bcrypt.hash(password, 5);

    await User.update({
        email, password: encryptedPassword, role
      },
      {
        where: {
          id
        }
      });
    response.status(201).json(
      "Updated"
    );
  } catch (e) {
    response.status(500).json("Something went wrong");
  }
};

export const changeBoss = async (request: Request, response: Response): Promise<Response> => {
  try {
    const regularId = Number(request.body.regularId);
    const newBossId = Number(request.body.newBossId);
    await UserToUser.update({bossId: newBossId}, {
      where: {
        regularId
      },
    });
    return response.status(201).json(
      "Boss was changed"
    );
  } catch (e) {
    return response.status(500).json("Something went wrong");
  }
};

export const addRegulars = async (request: Request, response: Response): Promise<Response> => {
  try {
    const regularId = Number(request.body.regularId);
    const bossId = Number(request.body.bossId);
    await UserToUser.create( {
        bossId,
        regularId
    }, {
      returning: ["bossId", "regularId"]
    });
    return response.status(201).json(
      "Regular was added to boss"
    );
  } catch (e) {
    return response.status(500).json("Something went wrong");
  }
};

