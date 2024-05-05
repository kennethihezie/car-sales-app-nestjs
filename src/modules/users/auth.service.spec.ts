import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UserService } from "./users.service"
import { User } from "./model/user.entity"
import { UserDto } from "./dto/user.dto"
import { BadRequestException, NotFoundException } from "@nestjs/common"

// describe helps organise the test methods
describe('AuthService', () => {
    let service: AuthService
    let fakeuserService: Partial<UserService>

    const users: User[] = []

    // runs first
    beforeEach(async () => {
        // create a fake copy of the users service
        fakeuserService = { 
            getAllUsers: () => Promise.resolve([]),
            getAllUserByEmail: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email)
                return Promise.resolve(filteredUsers)
            },
            create: (userDto: UserDto) => {
               const user = ({id: Math.floor(Math.random() * 99999).toString(), email: userDto.email, password: userDto.password}) as User
               users.push(user)
               return Promise.resolve(user)
            }
        }
    
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    // provide is used provide UserService when its requested by the DI
                    provide: UserService,
                    // useValue is used to provide an instance of UserService
                    useValue: fakeuserService
                }
            ]
        }).compile()
    
        service = module.get<AuthService>(AuthService)
    })
    
    it('can create an instance of auth service', async () => {
        // ensures the variable is not undefined
        expect(service).toBeDefined()
    })

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signUp({email: 'gsgh@shjh.com', password: 'ggdghdgsh'})

        expect(user.password).not.toEqual('ggdghdgsh')
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('fails to hash password', async () => {
        const user = await service.signUp({email: 'hi@shjh.com', password: 'ggdghdgsh'})

        expect(user.password).not.toEqual('ggdghdgsh')
        const [salt, hash] = user.password.split('$')
        
        expect(salt).toBeDefined()
        expect(hash).toBeUndefined()
    })

    it('throws an error if user signs up with email that is in use', async () => {
        await service.signUp({email: 'jsjs@gmail.com', password: 'dsddsds'})
        await expect(service.signUp({email: 'jsjs@gmail.com', password: 'dsddsds'})).rejects.toThrow(BadRequestException)
    })

    it('throws if signin is called with an unused email', async () => {
        await expect(service.logIn({email: 'sddsd@djd.com', password: 'dsdddd'})).rejects.toThrow(NotFoundException)
    })

    it('throws if an invalid password is provided', async () => {
        await service.signUp({email: 'js@gmail.com', password: 'dsdefffx'})
        await expect(service.logIn({email: 'js@gmail.com', password: 'dsdefff'})).rejects.toThrow(BadRequestException)
    })

    it('returns a user if correct password is provided', async () => {
        await service.signUp({ email: 'hello@gmail.com', password: '67777gdddd' })
        const user = await service.logIn({email: 'hello@gmail.com', password: '67777gdddd'})

        expect(user).toBeDefined()
    })
})