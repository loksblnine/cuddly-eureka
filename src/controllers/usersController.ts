/**
 * usersController.ts
 * */

import {Request, Response} from "express";
import {User} from "../database/models";
import bcrypt from "bcrypt";

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

//rewrite
export const getAllUsers = async (request: Request, response: Response): Promise<void> => {
  try {
    console.log(request.body);
    response.status(201).json({success: true})
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
