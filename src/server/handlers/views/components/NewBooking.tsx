import type { ComponentProps } from "./tools"

export function NewBooking({userId}:ComponentProps){
    return(
	<div>
	<div x-data="bookingForm()" x-init={`userId = ${Number(userId)}`}>
	    <div class="booking-container">
		<h2>New Booking</h2>

		<div x-show="isLoading" class="loading-message">
		    Loading booking types...
		</div>

		<form hx-post="/api/user/new-booking"
		    hx-ext="json-enc"
		    hx-target="#booking-result"
		    hx-swap="innerHTML"
		    x-bind:hx-vals={`JSON.stringify({user_id: userId})`}
		    {...{"x-on:htmx:before-request":"isSubmitting = true"}}
		    {...{"x-on:htmx:after-request":"handleResponse($event)"}}
		>

		    <div class="form-group">
			<label for="start_date">Start Date:</label>
			<input 
			    type="date"
			    id="start_date"
			    name="start_date"
			    required
			    x-model="startDate"
			/>
		    </div>
		    <div class="form-group">
			<label for="end_date">End Date:</label>
			<input
			    type="date"
			    id="end_date"
			    name="end_date"
			    required
			    x-model="endDate"
			    x-bind:min="startDate"
			/>
		    <div x-show="startDate && endDate && !isValidDateRange" class="error-message">
			End date must be after or equal to start date
		    </div>
		    </div>

		    <div class="form-group">
			<label for="booking_type">Booking Type:</label>
			<select
			    id="booking_type"
			    name="booking_type"
			    required
			    x-model="selectedBookingType"
			>
			    <option value="">Select a booking type...</option>
			    <template x-for="type in bookingTypes" x-bind:key="type.id">
				<option x-bind:value="type.booking_type" x-text="type.booking_type.replace(/_/g,' ')"></option>
			    </template>
			</select>
		    </div>

		    <div class="form-group">
			<button
			    type="submit"
			    class="submit-btn"
			    x-bind:disabled="!canSubmit"
			    x-text="isSubmitting ? 'Submitting...':'Submit Booking'"
			></button>
		    </div>
		</form>
		<div x-show="responseMessage" class="response-message" x-bind:class="responseStatus">
		    <div x-text="responseMessage"></div>
		</div>
		<div id="booking-result" style="display: none;"></div>
	    </div>
	</div>
	</div>
    )
}
