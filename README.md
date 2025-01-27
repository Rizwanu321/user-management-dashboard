# User Management Dashboard

## Objective

Develop a simple web application where users can view, add, edit, and delete user details from a mock backend API.

## Features

- **User Management**

  - View list of users with details (ID, First Name, Last Name, Email, and Department)
  - Add new users with form validation
  - Edit existing user information
  - Delete users with confirmation

- **UI/UX Features**
  - Responsive design (mobile and desktop views)
  - Loading states with spinner
  - Error handling with user-friendly messages
  - Toast notifications for action feedback
  - Modal-based forms for user operations
  - Pagination with 5 users per page

## Tech Stack

- React
- Bootstrap for styling
- Lucide React for icons
- JSONPlaceholder API for mock data

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── ErrorMessage.jsx
│   │   ├── Loading.jsx
│   │   ├── Pagination.jsx
│   │   └── Toast.jsx
│   └── users/
│       ├── DeleteConfirmModal.jsx
│       ├── UserForm.jsx
│       ├── UserList.jsx
│       └── UserModal.jsx
├── services/
│   └── api.js
├── utils/
│   └── validation.js
└── App.jsx
```

## Setup Instructions

### Prerequisites

- Node.js installed on your system
- npm (Node Package Manager)

### Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/Rizwanu321/user-management-dashboard.git
```

2. Navigate to project directory:

```bash
cd user-management-dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

The application will run at `http://localhost:3000`

## Component Details

### Core Components

1. **App.jsx**

   - Main application container
   - Manages global state and CRUD operations
   - Handles pagination and toast notifications

2. **UserList**

   - Displays users in both card and table views
   - Implements responsive design
   - Handles edit and delete triggers

3. **UserForm**

   - Manages user input with validation
   - Handles both create and update operations
   - Includes department selection

4. **Common Components**
   - Loading: Displays spinner during data fetching
   - ErrorMessage: Shows error states
   - Toast: Provides user feedback
   - Pagination: Handles page navigation

## Challenges Faced

1. **API Integration**

   - Implemented client-side state management to handle JSONPlaceholder's non-persistent nature
   - Added optimistic updates for better user experience
   - Managed error states for failed API calls

2. **Responsive Design**
   - Created dual view system (cards for mobile, table for desktop)
   - Implemented responsive pagination placement
   - Ensured consistent user experience across devices

## Future Improvements

1. **Enhanced Features**

   - Add search functionality
   - Implement sorting capabilities
   - Add filtering by department
   - Include bulk user operations

2. **Technical Improvements**

   - Implement proper state management (Redux/Context)
   - Add comprehensive testing suite
   - Optimize performance for larger datasets
   - Add data caching

3. **UI Enhancements**
   - Add dark mode support
   - Implement drag-and-drop functionality
   - Add keyboard navigation
   - Enhance accessibility features

## Screenshots

### Mobile View

![Mobile Interface](https://res.cloudinary.com/dngzbeidb/image/upload/v1737995595/eca1vonadgf7tse51y2c.jpg)

### Desktop View

![Web Interface](https://res.cloudinary.com/dngzbeidb/image/upload/v1737995689/zbjeaihhpzbunfs9ure1.png)
