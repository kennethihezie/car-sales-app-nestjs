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

    beforeEach(async () => {
        // create a fake copy of the users service
        fakeuserService = { 
            getAllUserByEmail: () => Promise.resolve([]),
            create: (userDto: UserDto) => Promise.resolve({id: "1", email: userDto.email, password: userDto.password } as User)
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
        const user = await service.signUp({email: 'gsgh@shjh.com', password: 'ggdghdgsh'})

        expect(user.password).not.toEqual('ggdghdgsh')
        const [salt, hash] = user.password.split('$')
        
        expect(salt).toBeDefined()
        expect(hash).toBeUndefined()
    })

    it('throws an error if user signs up with email that is in use', async () => {
       fakeuserService.getAllUserByEmail = () => Promise.resolve([{id: '1', email: 'jsjs@gmail.com', password: 'sdddd'} as User])
       await expect(service.signUp({email: 'jsjs@gmail.com', password: 'dsddsds'})).rejects.toThrow(BadRequestException)
    })

    it('throws if signin is called with an unused email', async () => {
        await expect(service.logIn({email: 'sddsd@djd.com', password: 'dsdddd'})).rejects.toThrow(NotFoundException)
    })

    it('throws if an invalid password is provided', async () => {
        fakeuserService.getAllUserByEmail = () => Promise.resolve([{id: '1', email: 'jsjs@gmail.com', password: 'sdddd'} as User])
        await expect(service.logIn({email: 'jsjs@gmail.com', password: 'dsdefff'})).rejects.toThrow(BadRequestException)
    })

    it('returns a user if correct password is provided', async () => {
        fakeuserService.getAllUserByEmail = () => Promise.resolve([{id: '1', email: 'jsjs@gmail.com', password: 'sdddd'} as User])
        const user = await service.logIn({email: 'jsjs@gmail.com', password: 'sdddd'})

        expect(user).toBeDefined()
    })
})