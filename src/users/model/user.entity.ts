import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    email: string

    @Column()
    password: string


    
    // the below decorators.
    // AfterInsert
    // AfterUpdate
    // AfterRemove
    // Are called hooks. They are called when an event takes place on the entity
    @AfterInsert()
    logInsert(){
       console.log('Inserted user with ID: ', this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Updated user with ID: ', this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('Removed user with ID: ', this.id);
    }
}