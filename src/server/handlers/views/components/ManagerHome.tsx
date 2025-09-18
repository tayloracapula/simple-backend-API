import type { ComponentProps } from "./tools"

export function ManagerHome({userId}:ComponentProps){
    return(
    <div class="home-container">
	manager {userId}
    </div>
    )
}
