import {
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  
  export abstract class BaseModel {
    @CreateDateColumn({
      type: 'timestamp',
      name: 'created_at',
    })
    @Exclude()
    createdAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      name: 'updated_at',
    })
    @Exclude()
    updatedAt: Date;
  
    @BeforeInsert()
    public initializeTimestamps() {
      const now = new Date();
      this.createdAt = now;
      this.updatedAt = now;
    }
  
    @BeforeUpdate()
    public updateTimestamps() {
      const now = new Date();
      this.updatedAt = now;
    }
  }
  