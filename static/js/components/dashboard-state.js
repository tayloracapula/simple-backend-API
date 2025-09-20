function dashboardState() {
    return {
	loading: false,
	loadingMessage: '',
	notifications: [],

	setLoading(state,message =''){
	    this.loading = state;
	    this.loadingMessage = message;
	},

	showError(message){
	    this.addNotification(message,'error')
	},

	showSuccess(message){
	    this.addNotification(message,'success')
	},
	

	addNotification(message, type = 'info'){
	    const notification = {
		id: Date.now(),
		message,
		type,
		visible: true
	    };
	    this.notifications.push(notification);
	    setTimeout(()=>{
		this.dismissNotification(notification.id);
	    },5000)
	},
	dismissNotification(id){
	    const notification =this.notifications.find(n => n.id ===id);
	    if (notification) {
	    	notification.visible = false;
		setTimeout(()=>{
		    this.notifications = this.notifications.filter(n => n.id !== id);
		},300)
	    }
	}
    }
}

