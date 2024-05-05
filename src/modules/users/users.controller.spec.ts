import { Test, TestingModule } from "@nestjs/testing"
import { UsersController } from "./users.controller"
import { UserService } from "./users.service"
import { AuthService } from "./auth.service"
import { User } from "./model/user.entity"
import { UserDto } from "./dto/user.dto"
import { NotFoundException } from "@nestjs/common"


describe('UserController', () => {
    let controller: UsersController
    let fakeUserService: Partial<UserService>
    let fakeAuthService: Partial<AuthService>

    beforeEach(async () => {
      fakeUserService = {
        getAllUserByEmail: (email: string) => Promise.resolve([{id: "4", email: "hghgh@hggh.com", password: "bbjhj"} as User]),
        getUserById: (id: string) => Promise.resolve({id: "4", email: "hghgh@hggh.com", password: "bbjhj"} as User),
        deleteUser: (id: string) => Promise.resolve({id: "4", email: "hghgh@hggh.com", password: "bbjhj"} as User),
        create: (userDto: UserDto) => Promise.resolve({id: "4", email: userDto.email, password: userDto.password} as User),
        // updateUser: () => {}
      }

      fakeAuthService = {
        signUp: (userDto: UserDto) => Promise.resolve({id: "4", email: userDto.email, password: userDto.password} as User),
        // logIn: () => {}
      }


        const module: TestingModule = await Test.createTestingModule({
            controllers: [ UsersController ],
            providers: [
                {
                    provide: UserService,
                    useValue: fakeUserService
                },

                {
                    provide: AuthService,
                    useValue: fakeAuthService
                }
            ]
        }).compile()

        controller = module.get<UsersController>(UsersController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('getAllUserByEmail returns a list of users with the given email', async () => {
        const users = await controller.getAllUserByEmail('hghgh@hggh.com')
        expect(users.length).toEqual(1)
        expect(users[0].email).toEqual('hghgh@hggh.com')
    })

    it('returns a signle user with the given id', async () => {
        const user = await controller.getUserById('4')
        expect(user).toBeDefined()
    })

    it('getUserById throws an error if user with given id is not found', async () => {
      fakeUserService.getUserById = () => null
      await expect(controller.getUserById('1')).rejects.toThrow(NotFoundException);
    })

    it('signin updates session object and returns user', async () => {
        const session = {
            userId: "9"
        }
        const user = await controller.createUser({email: 'dsdsd@dds.com', password: 'ddssdd'}, session)

        expect(user.id).toEqual("4")
        expect(session.userId).toEqual("4")
    })
})