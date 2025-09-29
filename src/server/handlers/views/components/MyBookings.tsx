import type { ComponentProps } from "./tools"

export function MyBookings({userId}:ComponentProps){
    return(
    <div x-data="calendarState()" x-init={`userId = ${Number(userId)}; fetchBookings()`}>
	<div class="calendar-container">
	    <div class="calendar">
		<div class="calendar-header">
		    <button x-on:click="previousMonth()" class="nav-btn">{"<"}</button>
		    <h2 x-text="currentMonthYear"></h2>
		    <button x-on:click="nextMonth()" class="nav-btn">{">"}</button>
		</div>

		<div x-show="isLoading" class="loading-message">
		    Loading bookings...
		</div>
		
		<div x-show="!isLoading" class="calendar-grid">
		    <div class="calendar-days-header">
			<template x-for="day in dayHeaders" x-bind:key="day">
			    <div class="day-header" x-text="day"></div>
			</template>
		    </div>

		    <div class="calendar-days">
			<template x-for="(day, index) in calendarDays" x-bind:key="`${currentDate.getFullYear()}-${currentDate.getMonth()}-${index}`">
			    <div class="calendar-day"
				x-bind:class="{
				    'other-month': !day.isCurrentMonth,
				    'today': day.isToday,
				    'has-booking': day.hasBooking,
				    'selected': day.isSelected
				}"
				x-on:click="selectDate(day)"
			    >
				<span class="day-number" x-text="day.day"></span>
				<div x-show="day.bookings.length > 0" class="booking-indicators">
				    <template x-for="booking in day.bookings" x-bind:key="booking.booking_id">
					<div class="booking-dot"
					    x-bind:class="[
					    booking.booking_type.booking_type.toLowerCase().replace('_','-'),
					    booking.status.status.toLowerCase()
					    ]"
					    x-bind:title="`${booking.booking_type.booking_type.replace('_', ' ' )} - ${booking.status.status}`"
					></div>
				    </template>
				</div>
			    </div>
			</template>
		    </div>
		</div>
	    </div>
	    <div x-show="selectedDate && !isLoading" class="booking-details">
		<h3 x-text="selectedDateText"></h3>
		<div x-show="selectedDateBookings.length > 0" class="bookings-list">
		    <template x-for="booking in selectedDateBookings" x-bind:key="booking.booking_id">
			<div class="booking-item"
			    x-bind:class="[
			    booking.booking_type.booking_type.toLowerCase().replace('_','-'),
			    booking.status.status.toLowerCase()
			    ]"
			>
			    <div class="booking-header">
				<span class="booking-type" x-text="booking.booking_type.booking_type.replace('_',' ')"></span>
				<span class="booking-status" x-text="booking.status.status"></span>
			    </div>
			    <div class="booking-dates">
				<span x-text="`${formatDate(booking.start_date)} - ${formatDate(booking.end_date)}`"></span>
			    </div>
			</div>
		    </template>
		</div>
		<div x-show="selectedDateBookings.length === 0" class="no-bookings">
		    <p>No bookings for this date</p>
		</div>
	    </div>
	</div>
    </div>
    )
}
