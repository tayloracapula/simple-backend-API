import type { ComponentProps } from "./tools"

export function NewBooking({userId}:ComponentProps){
    return(
	<div>
	<script src="/static/js/components/booking-form.js"></script>
	<div x-data="bookingForm()">
	    <div class="booking-container">
		<h2>New Booking</h2>
		<form hx-post="/api/user/new-booking"
		    hx-ext="json-enc"
		    hx-headers='{"Authorization": "Bearer " + getCookie("token")}'

		>
		</form>
	    </div>
	</div>
	</div>
    )
}
