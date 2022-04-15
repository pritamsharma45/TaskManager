<template>
  <div>
    <h5>Meeting Details</h5>
    <b-form inline>
      <label class="sr-only" for="inline-form-input-meetingdate"
        >Date & Time</label
      >
      <b-input-group prepend="Date & Time" class="mb-2 mr-sm-2 mb-sm-0">
        <input
          id="meetingdate"
          type="datetime-local"
          name="meeting"
          v-model="meetings.date_time"
          :min="new Date()"
          class="form-control"
        />
      </b-input-group>
      <label class="sr-only" for="inline-form-input-duration">Duration</label>
      <b-input-group prepend="Duration" class="mb-2 mr-sm-2 mb-sm-0">
        <input
          id="duration"
          type="number"
          v-model="meetings.duration"
          class="form-control"
        />
      </b-input-group>
      <label class="sr-only" for="inline-form-input-Description"
        >Description</label
      >
      <b-input-group prepend="Description" class="mb-2 mr-sm-2 mb-sm-0 col-6">
        <input
          id="Description"
          type="text"
          v-model="meetings.description"
          class="form-control"
        />
      </b-input-group>
    </b-form>

    <!-- <b-form-row>
      <b-form-group
        id="fiedf-1"
        label="Date and Time:"
        label-for="meetingdate"
        class="col-md-3"
      >
        <input
          id="meetingdate"
          type="datetime-local"
          name="meeting"
          v-model="meetings.date_time"
          :min="new Date()"
          class="form-control"
        />
      </b-form-group>

      <b-form-group
        id="fiedf-2"
        label="Duration:"
        label-for="duration"
        class="col-md-1"
      >
        <input
          id="duration"
          type="number"
          v-model="meetings.duration"
          class="form-control"
        />
      </b-form-group>

      <b-form-group
        id="fieldset-1"
        label="Meeting Description"
        label-for="MeetingDescription"
        class="col-md-6"
      >
        <b-form-input
          id="MeetingDescription"
          v-model="meetings.description"
        ></b-form-input>
      </b-form-group>
    </b-form-row> -->
    <b-form-row>
      <b-col cols="4">
        <b-form-group
          id="fieldset-1"
          label="Select Attendees from Clients:"
          label-for="attendees"
        >
          <b-form-select
            id="attendees"
            v-model="meetings.attendees_clients"
            text-field="client_name"
            value-field="email"
            :options="configStore.state.tables['tbl_client']"
            multiple
            :select-size="6"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          id="fieldset-1"
          label="Select Attendees from Users:"
          label-for="attendeesusers"
        >
          <b-form-select
            id="attendeesusers"
            v-model="meetings.attendees_users"
            text-field="client_name"
            value-field="email"
            :options="configStore.state.tables['tbl_client']"
            multiple
            :select-size="6"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>

    <h1>Upcoming Meetings</h1>
    <pre>
      {{ meetings }}
    </pre>
  </div>
</template>

<script>
import configStore from "../store/configuration";
export default {
  data() {
    return {
      meetings: {
        attendees_clients: [],
        attendees_users: [],
        date_time: new Date(),
        duration: "",
        description: "",
      },
      configStore: configStore,
      disabled: false,
      isSaving: false,
      model: {},
      showSpinner: false,
    };
  },
  computed: {
    allAttendees: function () {
      const arr = [
        ...this.meetings.attendees_clients,
        ...this.meetings.attendees_users,
      ];

      return arr;
    },
  },
  mounted() {
    // this.model = this.schema.model();
    // this.getPreference();
  },
  methods: {
    createGoogleMeeting() {},
    getUpcomingEvents() {},
    getPassedEvents() {},
  },
};
</script>

<style>
</style>