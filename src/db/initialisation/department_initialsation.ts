import { department } from "db/entity/staticEntities/department";
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
    
    console.log("Department data initialised successfully")

} 