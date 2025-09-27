function homeData() {
    return {
        userId: null,
        leaveData: null,
        bookings: [],
        nextBooking: null,
        bookingsLoaded: false,
        loading: {
            leave: false,
            bookings: false
        },

        async loadUserData() {
            await Promise.all([
                this.loadLeaveBalance(),
                this.loadBookings()
            ]);
        },

        async loadLeaveBalance() {
            this.loading.leave = true;
            try {
                const response = await fetch(`/api/user/remaining-leave?id=${this.userId}`);
                const result = await response.json();
                
                if (result.success) {
                    this.leaveData = {remaining_leave:result.data};
                }
            } catch (error) {
                console.error('Error loading leave balance:', error);
            } finally {
                this.loading.leave = false;
            }
        },

        async loadBookings() {
            this.loading.bookings = true;
            try {
                const response = await fetch(`/api/user/bookings?id=${this.userId}`);
                const result = await response.json();
                
                if (result.success) {
                    this.bookings = result.data || [];
                    this.findNextBooking();
                    this.bookingsLoaded = true;
                }
            } catch (error) {
                console.error('Error loading bookings:', error);
                this.bookingsLoaded = false;
            } finally {
                this.loading.bookings = false;
            }
        },

        findNextBooking() {
            const now = new Date();
	    now.setHours(0,0,0,0)

            const activeAndFutureBookings = this.bookings.filter(booking =>{ 
		const endDate = new Date(booking.end_date);
		endDate.setHours(23,59,59,999)
                return endDate > now
	    });

            if (activeAndFutureBookings.length > 0) {
                activeAndFutureBookings.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
                this.nextBooking = activeAndFutureBookings[0];
            }
        },

        formatBookingDate(booking) {
            if (!booking) return '';
            const start = new Date(booking.start_date).toLocaleDateString();
            const end = new Date(booking.end_date).toLocaleDateString();
            return `${start} - ${end}`;
        },

        getLeavePercentage() {
	    console.log("leave:",this.leaveData)
            if (!this.leaveData) return 0;
            const totalLeave = 25;
            const remaining = this.leaveData.remaining_leave || 0;
            const used = totalLeave - remaining;
            return Math.max(0, Math.min(100, Math.round((used/totalLeave)*100)))
        }
    }
}
