# CarrerLink Project 🚀

## Overview
Welcome to the CarrerLink website, a full-stack platform that mimics the core functionalities of LinkedIn. This project is built using the MERN stack and integrates Mailtrap for secure email notifications, providing a smooth and responsive user experience on the frontend, coupled with a robust and scalable backend.

## Key Features 🔑

- **Secure Authentication**:
  - Implemented user authentication with email support via Mailtrap, allowing users to securely sign in and manage their accounts.

- **User-Friendly Interface**:
  - Built with React and styled using Tailwind CSS and DaisyUI, offering a smooth, intuitive, and responsive user experience.

- **Robust Backend**:
  - Powered by Express.js and Node.js, ensuring efficient handling of server-side operations with secure user data management.

- **Image Storage**:
  - Utilizing Cloudinary for efficient image storage and management, enabling users to upload and display their profile pictures seamlessly.

- **Scalable Data Management**:
  - Leveraging MongoDB for flexible and scalable database solutions, ensuring robust data handling.

- **Real-Time Functionality**:
  - Implemented with @tanstack/react-query for efficient data fetching, caching, and synchronization.

- **Notifications and Alerts**:
  - Integrated email notifications using Mailtrap, including:
    - **sendEmail**: To send verification and welcome emails to new users.
    - **sendCommentNotificationEmail**: To notify users when someone comments on their posts.
    - **sendConnectionAcceptedEmail**: To inform users when their connection requests are accepted.

## Tech Stack 🛠️

- **Frontend**: React, Redux, Tailwind CSS, DaisyUI, @tanstack/react-query, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Notifications**: Mailtrap
- **Image Storage**: Cloudinary
- **Hosting**: Render.com

## Installation & Setup ⚙️

1. **Clone the repository**:
   ```bash
   https://github.com/vikram17dp/CarrerLink
   cd Linkedin_Clone
2. **Install dependencies for both frontend and backend**:
   - Navigate to the **frontend** directory and install dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Then navigate to the **backend** directory and install dependencies:
     ```bash
     cd ../backend
     npm install
     ```
3. **Set up environment variables**:
   - Create a `.env` file in the root of the **backend** directory with the following:

     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     MAIL_TRAP_TOKEN=your_mailtrap_token
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```
4. **Run the application**:
   - Navigate to the **backend** directory and start the server:
     ```bash
     cd backend
     npm run dev
     ```
## 🔗 Links

- **Live Demo:** [CarrerLink Live](https://carrerlink.onrender.com/login)
- **GitHub Repository:** [GitHub](https://github.com/vikram17dp/CarrerLink.git)
- **LinkedIn Profile:** [Vikram D P](https://www.linkedin.com/in/vikram-d-p-20053127b/)

💡 About the Project
This project has been a fantastic learning experience, allowing me to dive deep into both frontend and backend development. I’m proud of the end result and excited about the potential applications of this LinkedIn clone in demonstrating a real-world authentication solution.

Contributing 🤝
Feel free to fork this repository, create a feature branch, and submit a pull request. Contributions, issues, and feature requests are welcome!

## 📫 Contact

Feel free to connect with me if you have any questions or want to discuss this project further.

- **GitHub:** [vikram17dp](https://github.com/vikram17dp)
- **LinkedIn:** [Vikram D P](https://www.linkedin.com/in/vikram-d-p-20053127b/)
