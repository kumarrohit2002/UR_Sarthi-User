
```markdown
# URSARATHI Frontend

URSARATHI is a mentorship platform designed to connect mentees (learners) with experienced mentors for guidance, support, and professional development. This is the **frontend** of the platform, built using **React.js** and **Tailwind CSS**, and integrates with the backend API and Razorpay for complete functionality.

---

## 👨‍🎓 PART 1: MENTEE (USER) MODULE

### ✨ Features for Mentees

- 🔐 User Signup/Login with OTP verification
![Signup Screenshot](public/signup.png)
- 📄 Create & update your user profile
- 🔍 Explore mentor profiles and filter by expertise
- 📅 Book appointments with mentors
- 💳 Pay securely using Razorpay integration
- ⭐ Submit reviews and ratings for mentors
- 📁 View & manage your appointment history

### 📂 Folder Structure (Relevant for Mentees)

```
src/
├── pages/User/
│   ├── Dashboard.js
│   ├── Profile.js
│   ├── ExploreMentors.js
│   └── BookAppointment.js
├── components/User/
│   └── MentorCard.js
```

### 🧪 Sample Mentee Workflow
![Signup Screenshot](public/signup.png)

1. **Signup/Login** using your email and password.
2. **Verify OTP** sent to your email.
3. Complete your **user profile** with name, phone number, and profile picture.
4. Browse mentors and **book an appointment**.
5. Make payment using **Razorpay**.
6. **Join session** at the scheduled time and **rate your experience**.

---
