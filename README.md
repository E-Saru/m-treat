# M-Treat
This project is a full-stack application for managing patient information. It includes a user authentication system, a dashboard displaying patient details, and an interface for updating patient information.

## Features
- **User authentication system**  : Users can register and log in to access the application.
- **Login System**: Secure user authentication with username and password.
- **Dashboard**: Displays a personalized greeting, patient details, and an edit profile feature.
- **Edit Profile**: Update patient name and phone number with real-time form validation.

## Technologies Used
### Frontend
- **React**: For building the user interface.
- **Redux**: For state management.
- **React Router**: For navigation.
- **Axios**: For API requests.

### Backend
- **Django**: For API and user authentication.
- **PostgreSQL**: For database management.

## Installation

### Prerequisites
- Node.js
- Python
- PostgreSQL

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>>
   cd m_back
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate  # Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure the database in `settings.py`.
5. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
   or

   ```bash
   python3 manage.py makemigrations
   python3 manage.py migrate
   ```


6. Start the server:
   ```bash
   python manage.py runserver
   ```
   or
   ```bash
   python3 manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd m-front
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---
## Usage

1. Navigate to the register page: `http://localhost:3000/`.
2. Fill out the registration form and submit it.
3. Navigate to the login page: `http://localhost:3000/login`.
4. Fill out the login form and submit it.
5. You will be redirected to the dashboard page.
6. You can view your profile information and edit it.
7. Save changes, and the updated details will be displayed.

---
## API Endpoints
### Authentication
- **POST** `api/register`: Create a new user account.
 - Request Body: `name`, `email`, `phone`, `password`
- **POST** `api/login`: Login to an existing user account.
 - Request Body: `username`, `password`
- **GET** `api/dashboard`: Get the current user's information.
- **PUT** `api/dashboard`: Update the current user's profile information.
 - Request Body: `name`, `phone`
- **POST /logout**: Logout of the current user account.

## Project Structure
```m-treat/
│
├── m-front/              # React frontend
│   ├── public/           # Static files
│   ├── src/              # Source files
│   └──package.json       # Frontend dependencies
├── m-back/               # Django backend
│   ├── m-back/
|   ├── patients/         # Patient models and views
│   └── manage.py         # Django project management
└── README.md
```
---

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.


## Contact
For questions or feedback, feel free to reach out:
- **Email**: [esaru008@gmail.com](mailto:esaru008@gmail.com)
- **GitHub**: [https://github.com/E-Saru](https://github.com/https://github.com/E-Saru)