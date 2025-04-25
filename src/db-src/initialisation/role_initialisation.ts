import { role } from "db-src/entity/staticEntities/role";
import type { DataSource } from "typeorm";


export async function initialise_roles(dataSource:DataSource): Promise<void> {
    const rolesTableRepository = dataSource.getRepository(role);

    const rowCount = await rolesTableRepository.count();
    if (rowCount > 0) {
        rolesTableRepository.clear()
    }

    const staticRoles = [
        {role: "Employee"},
        {role: "Manager"},
        {role: "Admin"},
    ];
    await rolesTableRepository.save(staticRoles);
    
    console.log("Roles data initialised successfully")

} 