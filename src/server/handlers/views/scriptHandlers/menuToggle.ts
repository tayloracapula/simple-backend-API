import type { UseCase } from "server/handlers/UseCase"; 

export class ToggleMenu implements UseCase {

    async execute(){
        return (
	`<script>
	    document.body.classList.toggle('menu-open')
	 </script>`
	)
    }

}
