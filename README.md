# OS Maker

OS Maker is a web application that allows users to customize and generate personalized OS distributions, such as Ubuntu and Arch Linux.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Django
- **OS Manipulation**: Shell Scripts

## Package Installations

The project requires the following packages to be installed:

1. **Frontend**:
   - `react`
   - `react-dom`
   - `axios`
   - `tailwindcss`
   - `lucide-react`
   - `recharts`
   - `@shadcn/ui`
   - `lodash`

2. **Backend**:
   - `django`
   - `djangorestframework`
   - `requests`

## User Interface (UI)

The user interface of OS Maker consists of the following screens:

1. **OS Selection**: This screen allows the user to select the operating system they want to customize, such as Ubuntu or Arch Linux.

![OS Selection Screen]()

2. **Configuration Options**: This screen presents the user with two options: "Predefined" and "Customization". The user can choose the configuration they want to use.

![Configuration Options Screen]()

3. **Predefined Configuration**: If the user selects the "Predefined" option, they will see a set of pre-defined configurations, such as "Minimal", "Standard", and "RAM-Efficient".

![Predefined Configuration Screen]()

4. **Customization**: If the user selects the "Customization" option, they will be able to choose a custom wallpaper and select additional packages to be installed.

![Customization Screen]()

5. **Submission**: After configuring the OS, the user can submit their selection. For "Predefined" configurations, the user will be able to download the generated ISO file. For "Customization" configurations, the user will receive a confirmation message.

![Submission Screen]()

## Backend Implementation

The backend of OS Maker is implemented using Django, a popular Python web framework. The key features of the backend include:

1. **Configuration Submission**: The backend provides an API endpoint to handle the submission of OS configurations, both predefined and customized.
2. **Packages Management**: The backend is responsible for managing the package installation process, including writing the packages to a file and uploading it to a Flask server for further processing.
3. **ISO Generation**: The backend communicates with a Flask server to generate the ISO file based on the user's selected configuration.
4. **ISO Download**: For predefined configurations, the backend provides an API endpoint to download the generated ISO file.

The backend code can be found in the `views.py` file of the Django project.

## Conclusion

OS Maker is a web application that allows users to customize and generate personalized OS distributions. It leverages the power of React.js for the frontend, Django for the backend, and shell scripts for OS manipulation. The application provides a user-friendly interface and a comprehensive set of configuration options to cater to the diverse needs of users.
