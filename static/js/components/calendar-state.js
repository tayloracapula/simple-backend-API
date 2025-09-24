function calendarState() {
    return {
	userId: null,
	currentDate: new Date(),
	selectedDate: null,
	bookings: [],
	isLoading: true,
	dayHeaders:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],

	async init(){
	},

	async fetchBookings(){
	    try {
		this.isLoading=true
		const response = await fetch(`/api/user/bookings?id=${this.userId}`)
	    	if (!response.ok) {
		    throw new Error(`HTTP error status:${response.status}`)
		}
		const result = await response.json();

		if (result.success) {
		    this.bookings= [...result.data];
		}else{
		    console.error(`Failed to fetch bookings ${result}`)
		}
	    } catch (error) {
		console.error(`Error while fetching bookings: ${error}`)
	    }finally{
		this.isLoading=false
	    }
	},

	get currentMonthYear() {
	    return this.currentDate.toLocaleDateString('en-GB',{
		month: 'long',
		year: 'numeric'
	    });
	},

	get calendarDays(){
	    const bookingsLength = this.bookings.length;
	    const isLoading = this.isLoading;

	    const year = this.currentDate.getFullYear();
	    const month = this.currentDate.getMonth();

	    const selectedDateString = this.selectedDate ? this.selectedDate.toISOString().split('T')[0]: null;

	    const firstDay = new Date(year, month, 1);
	    const lastDay = new Date(year,month + 1, 0);

	    const startDate = new Date(firstDay);
	    startDate.setDate(startDate.getDate() - startDate.getDay());

	    const endDate = new Date(lastDay);
	    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

	    const days = []
	    const currentDateObj = new Date(startDate);

	    while (currentDateObj <= endDate) {
		const dateString = currentDateObj.toISOString().split('T')[0];
		const dayBookings = this.getBookingsForDate(dateString);
		const hasBooking = dayBookings.length > 0;

		if (dateString >= '2025-09-07' && dateString <= '2025-09-10') {
		}

		days.push({
		    day: currentDateObj.getDate(),
		    date: new Date(currentDateObj),
		    dateString: dateString,
		    isCurrentMonth: currentDateObj.getMonth() === month,
		    isToday: this.isToday(currentDateObj),
		    hasBooking: hasBooking,
		    bookings: dayBookings,
		    isSelected: dateString === selectedDateString
		});

		currentDateObj.setDate(currentDateObj.getDate() + 1);
	    }
	    return days;
	},
	
	getBookingsForDate(dateString){
	    return this.bookings.filter(booking => {
		const startDate = booking.start_date;
		const endDate = booking.end_date;
		const adjustedStartDate = new Date(startDate);
	        adjustedStartDate.setDate(adjustedStartDate.getDate() - 1);
		const adjustedStartString = adjustedStartDate.toISOString().split('T')[0];
		const adjustedEndDate = new Date(endDate);
		adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);
		const adjustedEndString = adjustedEndDate.toISOString().split('T')[0];
	    
		const isInRange = dateString >= adjustedStartString && dateString <= adjustedEndString;

		return isInRange;
	    });
	},

	isToday(date) {
	    const today = new Date();
	    return date.toDateString() === today.toDateString();
	},

	previousMonth() {
	    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
	},

	nextMonth() {
	    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
	},

	selectDate(day){
	    this.selectedDate = day.date;
	},


	get selectedDateText() {
	    return this.selectedDate ? this.selectedDate.toLocaleDateString('en-GB',{
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	    }) : ''
	},

	get selectedDateBookings() {
	    if (!this.selectedDate) return []; 
	    const dateString = this.selectedDate.toISOString().split('T')[0];
	    return this.getBookingsForDate(dateString);
	},

	formatDate(dateString) {
	    return new Date(dateString).toLocaleDateString('en-GB',{
		month: 'short',
		day: 'numeric'
	    });
	}
    }
}
