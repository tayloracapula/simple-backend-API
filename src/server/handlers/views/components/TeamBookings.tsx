import type { ComponentProps } from "./tools"

export function TeamBookings({userId}:ComponentProps){
    return(
    <div x-data="teamBookingsState()" x-init={`userId = ${Number(userId)}; fetchBookings()`} class="team-bookings-container">
	<h2 class="team-bookings-header">Team Bookings</h2> 
	
	<div x-show="isLoading" class="loading-message">Loading Bookings</div>
	
	<div x-show="!isLoading">
	    <template x-for="booking in bookings" x-bind:key="booking.booking_id">
		<div class="booking-detail">
		    <div class="booking-info">
			<div class="user-name" x-text="`${booking.user.firstname} ${booking.user.lastname}`"></div>
			<div class="booking-type" x-text="booking.booking_type.booking_type.replace('_',' ')"></div>
			<div class="date-range" x-text="`${booking.start_date} - ${booking.end_date}`"></div>
		    </div>
		    <div class="booking-actions">
			<button x-on:click="approveDenyBooking(booking.booking_id,true)" class="approve-btn">
			    Approve
			</button>
			<button x-on:click="approveDenyBooking(booking.booking_id,false)" class="reject-btn">
			    Reject 
			</button>
		    </div>
		</div>
	    </template>
	    <div x-show="booking.length === 0" class="no-bookings">
		No pending bookings
	    </div>
	</div>
    </div>
    )
}
