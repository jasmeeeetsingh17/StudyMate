# 📚 StudyMate - Smart Task Management for Students

A modern, beautiful, and feature-rich task management application designed specifically for students to organize their study schedule, track assignments, and boost productivity.

![StudyMate Banner](https://img.shields.io/badge/Version-2.0.0-blue) ![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react) ![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?logo=firebase) ![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🎯 Core Features
- **Task Management** - Create, edit, delete, and organize study tasks
- **Smart Categories** - Auto-categorize tasks by subject
- **Priority Levels** - High, Medium, Low priority with visual indicators
- **Due Dates** - Set deadlines and track overdue tasks
- **Task Completion** - Mark tasks as complete with visual feedback
- **Search & Filter** - Quickly find tasks with advanced filtering
- **Sorting Options** - Sort by due date, priority, title, or creation date
- **Bulk Operations** - Select multiple tasks for batch actions

### 🔐 Authentication
- **Firebase Authentication** - Secure user accounts
- **Email/Password Login** - Simple authentication flow
- **User Profiles** - Personalized experience for each user
- **Data Isolation** - Each user's data is completely separate

### 💾 Data Persistence
- **LocalStorage** - Fast, offline-first data storage
- **User-Specific Storage** - Data persists even after logout
- **Automatic Saving** - All changes saved instantly
- **Cross-Session** - Data persists across browser sessions

### 📊 Statistics & Insights
- **Task Analytics** - Track completed vs incomplete tasks
- **Completion Rate** - Monitor your productivity
- **Weekly Activity** - Visual charts of your study patterns
- **Category Breakdown** - See progress by subject

### 🎨 User Interface
- **Modern Design** - Beautiful gradient backgrounds and glassmorphism
- **Dark Mode Ready** - Automatically adapts to system theme
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Polished interactions and transitions
- **Intuitive Navigation** - Easy-to-use interface

### ⚡ Performance
- **Lazy Loading** - Components load on demand
- **Optimized Rendering** - React hooks for efficient updates
- **Fast Search** - Instant filtering and sorting
- **Error Boundaries** - Graceful error handling

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Firebase Account** - [Sign up free](https://firebase.google.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/studymate.git
   cd studymate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   
   Update `src/firebase/firebase.js` with your config:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```

4. **Enable Firebase Authentication**
   - Go to Firebase Console → Authentication
   - Enable "Email/Password" sign-in method

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage Guide

### Creating Your First Task

1. **Sign up** for an account or **Login** if you already have one
2. Click **"Add New Task"** or navigate to `/add-task`
3. Fill in the details:
   - **Subject** - e.g., Mathematics, Physics, Chemistry (Required)
   - **Topic** - e.g., Calculus, Mechanics (Required)
   - **Due Date** - Set a deadline (Optional)
   - **Priority** - Choose High, Medium, or Low
   - **Notes** - Add any additional information (Optional)
4. Click **"Create Task"**

### Managing Tasks

#### View All Tasks
- Navigate to **"All Tasks"** to see your complete task list
- Use the search bar to find specific tasks
- Filter by status: All, Pending, or Completed
- Sort by Due Date, Priority, Title, or Created Date

#### Edit a Task
1. Click the **"Edit"** button on any task
2. Modify the details
3. Click **"Save Changes"**

#### Complete a Task
- Click the **"Done"** button to mark as complete
- Click again to mark as incomplete

#### Delete a Task
- Click the **"Delete"** button
- Confirm the deletion

#### Bulk Actions
1. Select multiple tasks using checkboxes
2. Use bulk actions:
   - Mark all as complete
   - Delete selected
   - Clear selection

### Viewing Statistics

Navigate to **"Stats"** to see:
- Total tasks count
- Completion rate percentage
- Weekly activity chart
- Progress by category

### Account Management

Click on your profile icon to:
- View account details
- Logout from the app

---

## 🏗️ Project Structure

```
studymate/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── ErrorFallback.js      # Error boundary component
│   │   ├── Header.js              # Navigation header
│   │   ├── LoadingScreen.js       # Loading indicator
│   │   ├── Login.js               # Login form
│   │   ├── SignUp.js              # Registration form
│   │   ├── TaskForm.js            # Task creation/editing form
│   │   ├── TaskItem.js            # Individual task card
│   │   └── TaskList.js            # Task list view
│   ├── pages/
│   │   ├── HomePage.js            # Dashboard/home page
│   │   ├── AccountPage.js         # User account page
│   │   └── StatsPage.js           # Statistics page
│   ├── hooks/
│   │   ├── useAuth.js             # Authentication hook
│   │   └── useTasks.js            # Task management hook
│   ├── firebase/
│   │   └── firebase.js            # Firebase configuration
│   ├── utils/
│   │   └── storageDebug.js        # Debug utilities
│   ├── App.js                     # Main app component
│   ├── index.js                   # App entry point
│   └── index.css                  # Global styles
├── package.json
└── README.md
```

---

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

### Backend/Services
- **Firebase Authentication** - User management
- **LocalStorage API** - Client-side data persistence

### Development Tools
- **Create React App** - Project setup
- **ESLint** - Code linting
- **Git** - Version control

---

## 📱 Browser Support

StudyMate works on all modern browsers:

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style
- Write clear commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 StudyMate

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Jasmeet**
- Email: jasmeet@gmail.com
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Firebase** - For authentication services
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For beautiful icons
- **React Hot Toast** - For toast notifications
- **Community** - For feedback and support

---

## 📞 Support

Need help? Here's how to get support:

1. **Documentation** - Check this README first
2. **Issues** - Open an issue on GitHub
3. **Discussions** - Join GitHub Discussions
4. **Email** - Contact: jasmeet@gmail.com

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/studymate?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/studymate?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/studymate)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/studymate)

---

## 🌟 Star History

If you find StudyMate useful, please consider giving it a star on GitHub! ⭐

---

## 📝 Changelog

### Version 2.0.0 (Current)
- ✨ Complete UI redesign with modern aesthetics
- 🔐 Firebase authentication integration
- 💾 LocalStorage with user-specific data isolation
- 📊 Advanced statistics and analytics
- 🎨 Dark mode support (auto-detect)
- ⚡ Performance optimizations
- 🐛 Bug fixes and stability improvements

### Version 1.0.0
- 🎉 Initial release
- Basic task management
- Simple UI

---

## 🔗 Links

- **Live Demo**: [https://studymate-demo.vercel.app](https://studymate-demo.vercel.app)
- **Documentation**: [https://docs.studymate.app](https://docs.studymate.app)
- **GitHub**: [https://github.com/yourusername/studymate](https://github.com/yourusername/studymate)
- **Issues**: [https://github.com/yourusername/studymate/issues](https://github.com/yourusername/studymate/issues)

---

## 💡 Tips for Students

1. **Set Realistic Goals** - Don't overload yourself
2. **Use Priorities** - Focus on high-priority tasks first
3. **Regular Reviews** - Check your stats weekly
4. **Stay Organized** - Use categories effectively
5. **Track Progress** - Celebrate completed tasks!

---

<div align="center">

**Made with ❤️ for students by students**

**[⬆ Back to Top](#-studymate---smart-task-management-for-students)**

</div>
