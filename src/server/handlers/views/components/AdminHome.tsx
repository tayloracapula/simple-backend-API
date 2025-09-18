import type { ComponentProps } from "./tools" 

export function AdminHome({userId}:ComponentProps) {
    return(
    <div class="home-container">
	Admin {userId}
    </div>
    )
}
