# Hospital Management System

This project is a Hospital Management System built with Next.js and SQL. It provides role-based access for users, allowing different functionalities based on user roles such as admin, doctor, and staff.

## Features

- User authentication and role management
- Dashboard for users to view relevant information
- Patient records management (view, add, edit)
- Role-based access control for different pages

## Project Structure

```
hospital-management-system
├── src
│   ├── pages
│   │   ├── index.tsx        # Home page
│   │   ├── login.tsx        # User login page
│   │   ├── dashboard.tsx     # User dashboard
│   │   └── patients.tsx      # Patient records management
│   ├── components
│   │   ├── Layout.tsx       # Layout component for pages
│   │   └── RoleGuard.tsx    # Component for role-based access control
│   ├── lib
│   │   └── db.ts            # Database connection logic
│   ├── models
│   │   └── user.ts          # User model definition
│   └── utils
│       └── auth.ts          # Authentication utility functions
├── prisma
│   └── schema.prisma        # Database schema definition
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd hospital-management-system
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up the database:
   - Configure your database connection in `src/lib/db.ts`.
   - Run the Prisma migrations to set up the database schema:
     ```
     npx prisma migrate dev
     ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage Guidelines

- Users can log in using the login page.
- Based on their roles, users will have access to different functionalities in the dashboard and patient management pages.
- Ensure to manage user roles properly to maintain security and access control.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.