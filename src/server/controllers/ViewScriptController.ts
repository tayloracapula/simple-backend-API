import { ToggleMenu } from "../handlers/views/scriptHandlers/scriptIndex.ts";

export class ViewScriptController {
    async toggleMenu() {
	const scriptInjector = new ToggleMenu();
	return await scriptInjector.execute();
    }
}
