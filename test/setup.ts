//This file will be run before the execution e2e test files

import { rm } from "fs/promises"
import { join } from "path"

global.beforeEach(async () => {
    try{
        await rm(join(__dirname, '..', 'test.sqlite'))
    } catch(e){}
})