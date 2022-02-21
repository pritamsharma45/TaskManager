<template>


        <div class="container">
        <!-- <div class="d-flex justify-content-start     mb-3">
            <router-link to="/" class="btn btn-sm btn-outline-secondary">back</router-link>
        </div> -->
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex flex-column align-items-start">
                <h2>Create Timesheet</h2>
                <!-- <span class="text-muted">Add new user record</span> -->
            </div>
        </div>
        <div class="card pl-4 pt-5 pb-5 pr-4 mt-5">
            <form action="" @submit.prevent="createEntity">
                <vue-form-generator tag="div" :schema="schema" :options="formOptions" :model="model" />
                <div class="d-flex justify-content-end mt-3 pr-4">
                    <button type="submit" class="btn btn-primary btn-lg">
                        {{ isSaving ? 'Saving...' : 'Submit'}}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import { createEntity } from '../mixins/createEntityMixin.js'

export default {
   mixins: [createEntity("timesheet")],
  name: 'CreateTimesheet',
}
</script>

<style></style>