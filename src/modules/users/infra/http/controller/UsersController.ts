import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUsersService from '@modules/users/services/CreateUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({ email, password });

    delete user.password;

    return response.json(user);
  }
}
