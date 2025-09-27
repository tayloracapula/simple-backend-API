import type { ComponentProps } from "./tools" 

export function AdminPortal({userId}:ComponentProps){
    return(
	<div x-data="adminPortalState()" x-init={`userId = ${Number(userId)}; switchTab('users')`} class="admin-portal-container">
	    <div class="admin-header">
		<h1>Admin Portal</h1>
	    </div>
	    <div class="admin-tabs">
		<button x-on:click="switchTab('users')"
			x-bind:class="{'active': activeTab ==='users'}"
			class="tab-button">
			Users
		</button>
		<button x-on:click="switchTab('roles')"
			x-bind:class="{'active': activeTab ==='roles'}"
			class="tab-button">
			Roles	
		</button>
		<button x-on:click="switchTab('departments')"
			x-bind:class="{'active': activeTab ==='departments'}"
			class="tab-button">
			Departments
		</button>
		<button x-on:click="switchTab('booking-types')"
			x-bind:class="{'active': activeTab ==='booking-types'}"
			class="tab-button">
			Booking Types	
		</button>
	    </div>

	    <div class="admin-content">
		{/*User Tab*/}
		<div x-show="activeTab === 'users'" class="tab-content">
		    <div class="section-header">
			<h2>User Management</h2>
			<button x-on:click="showCreateForm = true; showEditForm = false" class="create-btn">
			    Add User
			</button>
		    </div>
		    <div class="search-section">
			<h3>Search Users</h3>
			<div class="search-inputs">
			    <input x-model="userSearch.firstName"
				    x-on:input="searchUsers()"
				    type="text"
				    placeholder="First Name"/>
			    <input x-model="userSearch.lastName"
				    x-on:input="searchUsers()"
				    type="text"
				    placeholder="Last Name"/>
			    <input x-model="userSearch.email"
				    x-on:input="searchUsers()"
				    type="text"
				    placeholder="Email"/>
			    <button x-on:click="clearSearch()" class="clear-btn">Clear</button>
			</div>
			<div x-show="isSearching" class="loading-state">Searching...</div>
			<div x-show="!isSearching && searchResults.length > 0" class="search-results">
			    <div class="data-table">
				<div class="table-header">
				    <span>Name</span>
				    <span>Email</span>
				    <span>Actions</span>
				</div>

				<template x-for="user in searchResults" x-bind:key="user.user_id">
				    <div class="table-row">
					<span x-text="`${user.firstname} ${user.lastname}`"></span>
					<span x-text="user.email"></span>
					<div class="action-buttons">
					    <button x-on:click="editUser(user)" class="edit-btn">✎</button>
					    <button x-on:click="deleteUser(user.user_id)" class="delete-btn">🗑</button>
					</div>
				    </div>
				</template>
			    </div>
			</div>
			<div x-show="!isSearching && searchResults.length === 0 && hasSearched" class="no-results">
                        No users found matching your criteria
                    </div>
                </div>

                <div x-show="showCreateForm && activeTab === 'users'" class="modal-overlay" x-on:click="cancelCreate()">
		    <div class="modal-content" {...{"x-on:click.stop":""}}>
		    <div class="modal-header">
			<h3>Create New User</h3>
			<button x-on:click="cancelCreate()" class="close-btn">✕</button>
		    </div>
		    <div class="modal-form">
			<form {...{"x-on:submit.prevent":"createUser()"}}>
			    <div class="form-group">
				<label>First Name</label>
				<input x-model="newUser.first_name" type="text" required/>
			    </div>
			    <div class="form-group">
				<label>Last Name</label>
				<input x-model="newUser.last_name" type="text" required/>
			    </div>
			    <div class="form-group">
				<label>Email</label>
				<input x-model="newUser.email" type="email" required/>
			    </div>
			    <div class="form-group">
				<label>Password</label>
				<input x-model="newUser.password" type="password" required/>
			    </div>
			    <div class = "form-group">
				<label>Role</label>
				<select x-model="newUser.role" required>
				    <option value="">Select Role</option>
				    <template x-for="role in roles" x-bind:key="role.id">
					<option x-bind:value="role.role" x-text="role.role"></option>
				    </template>
				</select>
			    </div>
			    <div class = "form-group">
				<label>Department</label>
				<select x-model="newUser.department" required>
				    <option value="">Select Department</option>
				    <template x-for="department in departments" x-bind:key="department.id">
					<option x-bind:value="department.department" x-text="department.department"></option>
				    </template>
				</select>
			    </div>
			    <div class="form-group">
				<label>Manager</label>
				<select x-model="newUser.managerID">
				    <option value="">No Manager (Self-managed)</option>
				    <template x-for="manager in managers" x-bind:key="manager.user_id">
					<option x-bind:value="manager.user_id" x-text="`${manager.firstname} ${manager.lastname}`"></option>
				    </template>
				</select>
			    </div>
			    <div class="form-actions">
				<button type="button" x-on:click="cancelCreate()" class="cancel-btn">Cancel</button>
				<button type="submit" class="submit-btn">Create User</button>
			    </div>
			</form>
		    </div>
		    </div>
                </div>
		<div x-show="showEditForm" class="modal-overlay" x-on:click="cancelEdit()">
		    <div class="modal-content" {...{"x-on:click.stop":""}}>
		    <div class="modal-header">
			<h3>Edit User</h3>
			<button x-on:click="cancelEdit()" class="close-btn">✕</button>
		    </div>
		    <div class="modal-form">
			<form {...{"x-on:submit.prevent":"updateUser(editingUser.user_id)"}}>
			    <div class="form-group">
				<label>First Name</label>
				<input x-model="editingUser.first_name" type="text"/>
			    </div>
			    <div class="form-group">
				<label>Last Name</label>
				<input x-model="editingUser.last_name" type="text"/>
			    </div>
			    <div class="form-group">
				<label>Email</label>
				<input x-model="editingUser.email" type="email"/>
			    </div>
			    <div class="form-group">
				<label>Password <small>(leave blank to keep current)</small></label>
				<input x-model="editingUser.password" type="password" placeholder="New password (optional)"/>
			    </div>
			    <div class="form-group">
				<label>Role</label>
				<select x-model="editingUser.role" required>
				    <option value="">Select Role</option>
				    <template x-for="role in roles" x-bind:key="role.id">
					<option x-bind:value="role.role" x-text="role.role"></option>
				    </template>
				</select>
			    </div>
			    <div class="form-group">
				<label>Department</label>
				<select x-model="editingUser.department" required>
				    <option value="">Select Department</option>
				    <template x-for="dept in departments" x-bind:key="dept.id">
					<option x-bind:value="dept.department" x-text="dept.department"></option>
				    </template>
				</select>
			    </div>
			    <div class="form-group">
				<label>Manager <small>(optional)</small></label>
				<select x-model="editingUser.managerID">
				    <option value="">No Manager (Self-managed)</option>
				    <template x-for="manager in managers" x-bind:key="manager.user_id">
					<option x-bind:value="manager.user_id" x-text="`${manager.firstname} ${manager.lastname}`"></option>
				    </template>
				</select>
			    </div>
			    <div class="form-actions">
				<button type="button" x-on:click="cancelEdit()" class="cancel-btn">Cancel</button>
				<button type="submit" class="submit-btn">Update User</button>
			    </div>
			</form>
		    </div>
		    </div>
		</div>
		</div>
		{/*Roles Tab*/}
		<div x-show="activeTab === 'roles'" class="tab-content">
		    <div class="section-header">
			<h2>Role Management</h2>
			<button x-on:click="showCreateForm = true" class="create-btn">
			    Add Role
			</button>
		    </div>
		    
		    <div x-show="isLoading" class="loading-state">Loading Roles...</div>
		    
		    <div x-show="!isLoading" class="data-table">
			<div class="table-header">
			    <span>Role Name</span>
			    <span>Actions</span>
			</div>
			
			<template x-for="role in roles" x-bind:key="role.id">
			    <div class="table-row">
				<span x-text="role.role"></span>
				<div class="action-buttons">
				    <button x-on:click="deleteRole(role.id)" class="delete-btn">🗑️</button>
				</div>
			    </div>
			</template>
		    </div>

		    <div x-show="showCreateForm && activeTab === 'roles'" class="modal-overlay" x-on:click="cancelCreate()">
		    <div class="modal-content" {...{"x-on:click.stop":""}}>
		    <div class="modal-header">
			<h3>Create New Role</h3>
			<button x-on:click="cancelCreate()" class="close-btn">✕</button>
		    </div>
			<div class="modal-form">
			    <form {...{"x-on:submit.prevent":"createRole()"}}>
				<div class="form-group">
				    <label>Role Name</label>
				    <input x-model="newRole.name" type="text" required/>
				</div>
				<div class="form-actions">
				    <button type="button" x-on:click="cancelCreate()" class="cancel-btn">Cancel</button>
				    <button type="submit" class="submit-btn">Create Role</button>
				</div>
			    </form>
			</div>
			</div>
		    </div>
		</div>
		{/*Departments Tab*/}
		<div x-show="activeTab === 'departments'" class="tab-content">
		    <div class="section-header">
			<h2>Department Management</h2>
			<button x-on:click="showCreateForm = true" class="create-btn">
			    Add Department
			</button>
		    </div>
		    
		    <div x-show="isLoading" class="loading-state">Loading Departments...</div>
		    
		    <div x-show="!isLoading" class="data-table">
			<div class="table-header">
			    <span>Department Name</span>
			    <span>Actions</span>
			</div>
			
			<template x-for="department in departments" x-bind:key="department.id">
			    <div class="table-row">
				<span x-text="department.department"></span>
				<div class="action-buttons">
				    <button x-on:click="deleteDepartment(department.id)" class="delete-btn">🗑️</button>
				</div>
			    </div>
			</template>
		    </div>

		    <div x-show="showCreateForm && activeTab === 'departments'" class="modal-overlay" x-on:click="cancelCreate()">
		    <div class="modal-content" {...{"x-on:click.stop":""}}>
		    <div class="modal-header">
			<h3>Create New Department</h3>
			<button x-on:click="cancelCreate()" class="close-btn">✕</button>
		    </div>
			<div class="modal-form">
			<form {...{"x-on:submit.prevent":"createDepartment()"}}>
			    <div class="form-group">
				<label>Department Name</label>
				<input x-model="newDepartment.name" type="text" required/>
			    </div>
			    <div class="form-actions">
				<button type="button" x-on:click="cancelCreate()" class="cancel-btn">Cancel</button>
				<button type="submit" class="submit-btn">Create Department</button>
			    </div>
			</form>
			</div>
		    </div>
		    </div>
		</div>
		{/*Booking Types Tab*/}
		<div x-show="activeTab === 'booking-types'" class="tab-content">
		    <div class="section-header">
			<h2>Booking Type Management</h2>
			<button x-on:click="showCreateForm = true" class="create-btn">
			    Add Booking Type
			</button>
		    </div>
		    
		    <div x-show="isLoading" class="loading-state">Loading Booking Types...</div>
		    
		    <div x-show="!isLoading" class="data-table">
			<div class="table-header">
			    <span>Booking Type Name</span>
			    <span>Actions</span>
			</div>
			
			<template x-for="booking_type in bookingTypes" x-bind:key="booking_type.id">
			    <div class="table-row">
				<span x-text="booking_type.booking_type.replaceAll('_',' ')
									"></span>
				<div class="action-buttons">
				    <button x-on:click="deleteBookingType(booking_type.id)" class="delete-btn">🗑️</button>
				</div>
			    </div>
			</template>
		    </div>

		    <div x-show="showCreateForm && activeTab === 'booking-types'" class="modal-overlay" x-on:click="cancelCreate()">
		    <div class="modal-content" {...{"x-on:click.stop":""}}>
		    <div class="modal-header">
			<h3>Create Booking Type</h3>
			<button x-on:click="cancelCreate()" class="close-btn">✕</button>
		    </div>
			<div class="modal-form">
			<form {...{"x-on:submit.prevent":"createBookingType()"}}>
			    <div class="form-group">
				<label>Booking Type Name</label>
				<input x-model="newBookingType.name" type="text" required/>
			    </div>
			    <div class="form-actions">
				<button type="button" x-on:click="cancelCreate()" class="cancel-btn">Cancel</button>
				<button type="submit" class="submit-btn">Create Booking Type</button>
			    </div>
			</form>
			</div>
		    </div>
		</div>
	    </div>
	</div>
    </div>
    )
}
