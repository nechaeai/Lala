<template>
  <div class="hello">

 <!-- Button to show the form -->
    <button @click="showMentorForm = !showMentorForm">Add Mentor</button>
    
    <!-- Form for creating a new mentor -->
    <form v-if="showMentorForm" @submit.prevent="createMentor">
      <input type="text" v-model="mentorForm.firstName" placeholder="First Name" required />
      <input type="text" v-model="mentorForm.lastName" placeholder="Last Name" required />
      <input type="email" v-model="mentorForm.email" placeholder="Email" required />
      <input type="number" v-model.number="mentorForm.hoursDedicated" placeholder="Hours Dedicated" required />
      <input type="text" v-model="mentorForm.availableTime" placeholder="Available Time" required />
      <input type="text" v-model="mentorForm.industry" placeholder="Industry" required />
      <input type="text" v-model="mentorForm.badges" placeholder="Badges (comma-separated)" />
      <button type="submit">Save Mentor</button>
    </form>
     
   
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      showMentorForm: false, // This property will control the visibility of the form
      mentorForm: {
        firstName: '',
        lastName: '',
        email: '',
        hoursDedicated: '',
        availableTime: '',
        industry: '',
        badges: ''
      }
    };
  },
  methods: {
    async createMentor() {
      // Process badges into an array
      const badgesArray = this.mentorForm.badges.split(',').map(badge => badge.trim());

      const newMentor = {
        firstName: this.mentorForm.firstName,
        lastName: this.mentorForm.lastName,
        email: this.mentorForm.email,
        hoursDedicated: this.mentorForm.hoursDedicated,
        availableTime: this.mentorForm.availableTime,
        industry: this.mentorForm.industry,
        badges: badgesArray
      };

      try {
        // Post the newMentor object to your backend
        const response = await axios.post('http://localhost:3000/add-mentor', newMentor);
        console.log('Mentor added with ID:', response.data.id);
        this.resetMentorForm();
        alert("Mentor successfully added!");
      } catch (error) {
        console.error('Error adding mentor:', error);
        alert("Error adding mentor. Please try again.");
      }
    },
     

   resetMentorForm() {
      this.mentorForm = {
        firstName: '',
        lastName: '',
        email: '',
        hoursDedicated: '',
        availableTime: '',
        industry: '',
        badges: ''
      };
    }
    
  }
};
</script>


<style scoped>
.hello {
  max-width: 600px; /* Adjust based on your preference */
  margin: 2rem auto;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
}

.hello button {
  background-color: #42b983; /* Vue green color */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.hello button:hover {
  background-color: #36a369;
}

.hello button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.hello form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px; /* Adjust the gap as needed */
}

.hello input {
  flex: 1 1 180px; /* Adjust the basis as needed */
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .hello form {
    flex-direction: column;
  }

  .hello input {
    flex: 1 1 auto;
  }
}
</style>