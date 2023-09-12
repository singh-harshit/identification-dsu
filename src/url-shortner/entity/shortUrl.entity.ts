import { IsString } from "class-validator";
import { type } from "os";
import {Entity, Column, PrimaryColumn} from "typeorm"; 

@Entity() 
export class ShortUrl {   

   @PrimaryColumn({ type: 'varchar', length: 4 }) 
   shortUrl: string; 
   
   @Column({ type: 'varchar', length: 255 }) 
   url: string; 
}