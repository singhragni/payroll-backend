import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

// export class LocalStrategy extends PassportStrategy(Strategy){
    
//     constructor(private authService: AuthService){
//         super(); 
//     }

//     async validate(...args: any[]): {
//         throw new Error("Method not implemented.");
//     }
// }  