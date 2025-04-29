import { department } from "db-src/entity/staticEntities/department";
import { Logger } from "server/Logger";
import type { DataSource } from "typeorm";


export async function initialise_department(dataSource:DataSource): Promise<void> {
    const departmentTableRepository = dataSource.getRepository(department);

    const rowCount = await departmentTableRepository.count();
    if (rowCount > 0) {
        departmentTableRepository.clear()
    }

    const staticDepartment = [
        {department: "Nuclear"},
        {department: "Energy"},
        {department: "Central"},
    ];
    await departmentTableRepository.save(staticDepartment);
    
    Logger.info(`Department data initialised successfully`);
} 