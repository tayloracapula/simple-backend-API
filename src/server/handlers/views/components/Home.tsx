import type { ComponentProps } from "./tools" 

export function Home({userId}:ComponentProps) {
    return(
        <div class="home-container" x-data="homeData()" x-init={`userId = ${userId}; loadUserData()`}>
            <div class="home-header">
                <h1>Welcome Back!</h1>
                <p class="home-subtitle">Your Dashboard Overview</p>
            </div>

            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="card-header">
                        <h2>Leave Balance</h2>
                    </div>
                    <div class="card-content">
                        <div x-show="loading.leave" class="loading">Loading...</div>
                        <div x-show="!loading.leave && leaveData" class="leave-info">
                            <div class="stat-item">
                                <span class="stat-label">Remaining Days</span>
                                <span class="stat-value positive" x-text="leaveData?.remaining_leave || 0"></span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" x-bind:style="`width: ${getLeavePercentage()}%`"></div>
                            </div>
                            <div class="progress-text" x-text="`${getLeavePercentage()}% used`"></div>
                        </div>
                        <div x-show="!loading.leave && !leaveData" class="error">Failed to load leave data</div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <h2>Next Booking</h2>
                    </div>
                    <div class="card-content">
                        <div x-show="loading.bookings" class="loading">Loading...</div>
                        <div x-show="!loading.bookings && nextBooking" class="booking-info">
                            <div class="booking-item">
                                <div class="booking-date" x-text="formatBookingDate(nextBooking)"></div>
                                <div class="booking-type" x-text="nextBooking?.booking_type?.booking_type?.replace(/_/g, ' ') || 'Leave'"></div>
                                <span class="booking-status" 
                                      x-bind:class="nextBooking?.status?.status?.toLowerCase()" 
                                      x-text="nextBooking?.status?.status || 'Pending'"></span>
                            </div>
                        </div>
                        <div x-show="!loading.bookings && !nextBooking && bookingsLoaded" class="no-bookings">
                            <p>No upcoming bookings</p>
                        </div>
                        <div x-show="!loading.bookings && !bookingsLoaded" class="error">Failed to load bookings</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
