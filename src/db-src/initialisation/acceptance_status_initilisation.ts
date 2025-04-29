import { acceptance_status } from "db-src/entity/staticEntities/acceptance_status";
import { Logger } from "server/Logger";
import type { DataSource } from "typeorm";

export async function initialise_acceptence_status(dataSource:DataSource): Promise<void> {
    const statusTableRepository = dataSource.getRepository(acceptance_status);

    const rowCount = await statusTableRepository.count();
    if (rowCount > 0) {
        statusTableRepository.clear()
    }

    const staticAcceptanceStatus = [
        {status: "Accepted"},
        {status: "Refused"},
        {status: "Pending"},
        {status: "Cancelled"}
    ];
    await statusTableRepository.save(staticAcceptanceStatus);
    
    Logger.info(`Acceptance status data initialised successfully`)
} 