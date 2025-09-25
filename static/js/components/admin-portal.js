function adminPortalState() {
    return {
	userId: null,
	activeTab: 'users',
	isLoading: false,
	isSearching: false,
	hasSearched: false,
	showCreateForm: false,
	showEditForm: false,
	searchTimeout: null,

	userSearch: {
	    firstName: '',
	    lastName: '',
	    email: ''
	},
	searchResults: [],

	roles: [],
	departments: [],
	bookingTypes: [],

	newUser: {},
	newRole: {name: ''},
	newDepartment:{name: ''},
	newBookingType:{name: ''},
	editingUser:{},

	async switchTab(tab) {
	    this.activeTab = tab;
	    this.showCreateForm = false;
	    this.showEditForm = false;
	    switch(tab) {
		case 'users':
		    this.clearSearch();
		    break;
		case 'roles':
		    if(!this.roles.length) await this.fetcher(tab,'roles');
		    break;
		case 'departments':
		    if(!this.departments.length) await this.fetcher(tab,'departments');
		    break;
		case 'booking-types':
		    if(!this.bookingTypes.length) await this.fetcher(tab,'bookingTypes');
	    }
	},
	async fetcher(apiTarget,stateProperty){
	    try{
		this.isLoading = true;
		const response = await fetch(`/api/admin/${apiTarget}`);
		const result = await response.json();
		if(result.success){
		    this[stateProperty]= result.data;
		}
	    }catch (error) {
		console.error(`Error fetching ${apiTarget} :`, error);
	    }finally {
		this.isLoading = false;
	    }
	},
	async deleter(apiTarget,fetchTarget,stateProperty,id){
	    if (!confirm(`Are you sure you want to delete this ${apiTarget.slice(0, -1)}?`)) {
	    	return;
	    }
	    try {
		const response = await fetch(`/api/admin/${apiTarget}?id=${id}`,{
		    method:'DELETE'
		});
		const result = await response.json();
		if (result.success){
		    await this.fetcher(fetchTarget,stateProperty);
		} else {
		    alert('Delete failed: ' + (result.message || 'Unknown error'));
		}
	    } catch (error) {
		alert('Error occured while deleting');
	    }
	},
	async deleteRole(id){
	    await this.deleter('delete-role','roles','roles', id);
	},
	async deleteDepartment(id){
	    await this.deleter('delete-department','departments','departments',id);
	},
	async deleteBookingType(id){
	    await this.deleter('delete-booking-type','booking-types','bookingTypes',id)
	},

	async creator(apiTarget,fetchTarget,newDataProperty,stateProperty) {
	    try {
		const response = await fetch(`/api/admin/${apiTarget}`,{
		    method: 'POST',
		    headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify(this[newDataProperty])
		});

		const result = await response.json();
		if (result.success) {
		    this.cancelCreate();
		    await this.fetcher(fetchTarget,stateProperty);
		} else {
		    alert('Create failed: '+ (result.message || 'Unknown error'))
		}
	    } catch (error) {
		alert(`Error creating ${apiTarget}`)
	    }
	},

	async createRole(){
	    await this.creator('new-role','roles','newRole','roles');
	},
	async createDepartment(){
	    await this.creator('new-department','departments','newDepartment','departments');
	},
	async createBookingType(){
	    await this.creator('new-booking-type','booking-types','newBookingType','bookingTypes');
	},

	async searchUsers() {
	    clearTimeout(this.searchTimeout);
	    this.searchTimeout = setTimeout(async () => {
		try{
		    this.isSearching = true;
		    const criteria = {};
		    if(this.userSearch.firstName) criteria.firstName = this.userSearch.firstName;
		    if(this.userSearch.lastName) criteria.lastName= this.userSearch.lastName;
		    if(this.userSearch.email) criteria.email= this.userSearch.email;
		    if(Object.keys(criteria).length === 0) {
			this.searchResults = [];
			this.hasSearched=false;
			return;
		    }
		    const params = new URLSearchParams(criteria)
		    const response = await fetch(`/api/admin/search-users?${params}`);
		    const result = await response.json();

		    if(result.success){
			this.searchResults = result.data;
			this.hasSearched = true;
		    }
		}catch(error){
		    console.error('Error searching users:', error);
		}finally{
		    this.isSearching = false;
		}
	    },300);
	},

	async createUser() {
	    try {
		const response = await fetch('/api/admin/new-user', {
		    method: 'POST',
		    headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify(this.newUser)
		});
	    	
		const result = await response.json();
		if (result.success) {
		    this.cancelCreate();
		    if (this.hasSearched) {
		    	await this.searchUsers();
		    }
		}else{
		    alert('Create failed: ' + (result.message||'Unknown error'));
		}
	    } catch (error) {
		alert('Error creating user');
	    }
	},

	async deleteUser(id){
	    if (!confirm('Are you sure you want to delete this user?')) {
	    	return;
	    }
	    try {
		const response = await fetch(`/api/admin/delete-user?id=${id}`,{
		    method: 'DELETE'
		});
	    	const result = await response.json();
		if(result.success){
		    if(this.hasSearched){
			await this.searchUsers();
		    }
		}else{
		    alert('Delete failed: ' + (result.message || 'Unknown Error'));
		}
	    } catch (error) {
		alert('Error deleting user')
	    }
	},
	async editUser(user){
	    this.editingUser = {...user};
	    this.showEditForm = true;
	    this.showCreateForm = false;
	},
	async updateUser(id){
	    try {
		const response = await fetch(`/api/admin/edit-user?id=${id}`,{
		    method: 'PATCH',
		    headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify(this.editingUser)
		});
		const result = await response.json();
		if(result.success){
		    this.cancelEdit();
		    if(this.hasSearched){
			await this.searchUsers();
		    }
		}else{
		    alert('Update failed: ' + (result.message || 'Unknown Error'));
		}
	    } catch (error) {
		alert('Error updating user')
	    }
	},
	clearSearch() {
	    this.userSearch = {
		firstName: '',
		lastName: '',
		email: ''
	    };
	    this.searchResults = [];
	    this.hasSearched = false;
	},
	cancelCreate() {
	    this.showCreateForm = false;
	    this.newUser = {};
	    this.newRole = {name: ''};
	    this.newDepartment = {name: ''};
	    this.newBookingType = {name: ''};
	},

	cancelEdit() {
	    this.showEditForm = false;
	    this.editingUser = {};
	}
    }
}
