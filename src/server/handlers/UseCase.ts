import type { Repository } from "typeorm"

export interface UseCase {
    execute(...args: any[]):Promise<any>;
}