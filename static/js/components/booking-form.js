function bookingForm(){
    return {
	isOpen:false,
	selectedType: null,
	bookingTypes: [],
	loading: false,
	error: '',
	submitting: false,
	dateError: '',
	formData: {
	    startDate:'',
	    endDate:''
	},

	get canSubmit() {
	    return  this.selectedType &&
		    this.formData.startDate &&
		    this.formData.endDate &&
		    !this.dateError &&
		    !this.submitting
	},
	toggleDropdown(){
	    this.isOpen = !this.isOpen;
	    if (this.isOpen && this.bookingTypes.length === 0){
		this.loadBookingTypes();
	    }
	},
	closeDropdown(){
	    this.isOpen = false;
	},
	selectType(type){
	    this.selectedType = type;
	    this.closeDropdown();
	    console.log("selected type: ", type);
	},
	loadBookingTypes(){
	    this.loading = true;
	    this.error = '';
	},
	handleBookingTypes(event){
	    try {
                const response = JSON.parse(event.detail.xhr.responseText);
                console.log('API Response:', response);
                
                if (response.success) {
                    this.bookingTypes = response.data;
                    console.log('Loaded booking types:', this.bookingTypes);
                } else {
                    this.error = 'Failed to load booking types';
                }
            } catch (e) {
                console.error('Parse error:', e);
                this.error = 'Failed to parse response';
            } finally {
                this.loading = false;
            }
	},
	valiDates(){
	    if (this.formData.startDate && this.formData.endDate){
		const start = new Date(this.formData.startDate);
		const end = new Date(this.formData.endDate);
		if (end < start) {
		    this.dateError = 'End date must be after start date'
		}else {
		    this.dateError = ''
		}
	    }
	},
	handleSubmitResponse(event){
	    this.submitting = false;
	    if (event.detail.xhr.status >= 200 && event.detail.xhr.status < 300) {
		this.selectedType = null;
		this.formData = {startDate:'',endDate:''}
		this.isOpen = false;
		this.dateError = '';
		document.getElementById('booking-result').innerHTML = `
		    <div class="success-message">
			<h3>Booking Created Successfully.</h3>
			<p>Your request has been submitted.</p>
		    </div>
		`;
	    } else {
		console.error('Booking failed', event.detail.xhr.responseText)
		document.getElementById('booking-result').innerHTML = `
		    <div class="error-message">
			<h3>Booking Failed.</h3>
			<p>Please check details and try again.</p>
		    </div>
		`;
	    }
	}
    }
}

function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
	return parts.pop().split(';').shift();
    }
    return '';
}
window.getCookie = getCookie
