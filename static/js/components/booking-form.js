function bookingForm(){
    return {
	startDate: '',
	endDate: '',
	selectedBookingType:'',
	bookingTypes: [],
	isSubmitting: false,
	isLoading: true,
	userId: null,
	responseMessage: '',
	responseStatus: '',

	async init(){
	    await this.fetchBookingTypes()
	},

	async fetchBookingTypes(){
	    try {
		this.isLoading = true;
		const response = await fetch('/api/user/booking-types');
		if (!response.ok) {
		    throw new Error(`HTTP error status: ${response.status}`)
		}
	    	const result = await response.json();

		if (result.success){
		    this.bookingTypes = result.data;
		}else{
		    console.error('failed to fetch booking types')
		}
	    } catch (error) {
		console.error('Error fetching booking types', error)
	    } finally {
		this.isLoading = false;
	    }
	},

	handleResponse(event){
	    this.isSubmitting = false;
	    const responseText = event.detail.xhr.responseText;
	    try {
		const responseData = JSON.parse(responseText);
		this.responseMessage = responseData.message;
		this.responseStatus = responseData.success ? 'success' : 'error';
	    	
	    } catch (e) {
		this.responseMessage = responseText;
		this.responseStatus = event.detail.xhr.status === 200 ? 'success' : 'error';
	    }

	    if(this.responseStatus === 'success') {
		this.startDate = '';
		this.endDate = '';
		this.selectedBookingType = '';
	    }
	},

	get isValidDateRange() {
	    return this.startDate && this.endDate && new Date(this.startDate) <= new Date(this.endDate)
	},

	get canSubmit() {
	    return  this.selectedBookingType&&
		    this.startDate &&
		    this.endDate &&
		    !this.isSubmitting
	},
    }
}
