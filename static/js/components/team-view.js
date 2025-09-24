function teamBookingsState() {
    return {
	userId: null,
	bookings: [],
	isLoading: true,

	async fetchBookings(){
	    try {
		this.isLoading=true;
		const response = await fetch(`/api/manager/pending-bookings?id=${this.userId}`)
	    	if (!response.ok) {
		    throw new Error(`HTTP error status: ${response.status}`)   	
		}
		const result = await response.json();
		if (result.success) {
		    this.bookings = result.data;
		} else {
		    console.error(`Failed to fetch bookings ${result}`)
		}
	    } catch (error) {
		console.error(`Error while fetching bookings: ${error}`)
	    } finally {
		this.isLoading=false
	    }
	},

	async approveDenyBooking(id,approval) {
	    try {
		const response = await fetch(`/api/manager/approve-booking?id=${id}&approve=${approval}`, {
		    method: 'PATCH'
		});
		if (!response.ok){
		    throw new Error(`HTTP error status: ${response.status}`)
		}
		const result = await response.json();
		if (result.success) {
		    await this.fetchBookings();
		}else {
		    alert(`Failed to ${approval ? 'approve' : 'deny'} booking`,result.message)
		}
	    } catch (error) {
		console.error(`Error ${approval ? 'approveing' : 'denying'} booking:`,error)
		alert(`Error processing booking. Please try again`);
	    }
	}
    }
}
