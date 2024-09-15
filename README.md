# AI Powered LMS

<img src="https://raw.githubusercontent.com/ravikumawat7716/soft-engg-project-may-2024-se-may-23/main/frontend/public/SE%20Team%2023%20.jpg?token=GHSAT0AAAAAACWMK2EEDYU6VGHUSKBD2PSMZXHLOLQ">

## Local Project Setup

**Prerequisites:**

- **Git**: Ensure you have Git installed. If not, download and install it from [https://git-scm.com/](https://git-scm.com/).
- **Python**: Make sure you have Python 3.x installed. You can download it from [https://www.python.org/downloads/](https://www.python.org/downloads/).
- **Node.js**: You'll need Node.js and npm for the frontend. Download and install them from [https://nodejs.org/](https://nodejs.org/).

**Steps:**

1. **Clone the Repository:**
   - Open your terminal and run the following command to clone the repository to your local machine:
     ```
     git clone https://github.com/ravikumawat7716/soft-engg-project-may-2024-se-may-23.git
     ```

### Backend Setup:

- If you want to use your System's Global Python Environment then you can skip step 2 & 3 (Recommeded to make venv)

2. **Create a Virtual Environment:**

   - In the `backend` folder, create a virtual environment with the following command:
     ```
     python3 -m venv venv
     ```

3. **Activate the Virtual Environment:**

   - Activate the virtual environment based on your operating system:
     - On Linux:
       ```
       source ./venv/bin/activate
       ```
     - On Windows:
       ```
       .\venv\Scripts\activate
       ```

4. **Install Backend Dependencies:**

   - Install the required Python packages using pip:
     ```
     pip install -r requirements.txt
     ```

5. **Start the Backend Server:**
   - Run the backend server using:
     ```
     python main.py
     ```

# Ollama Installation and Running Qwen-2-0.5B

## Step 1: Download and Install Ollama

1. Visit the [Ollama download page for Windows](https://www.ollama.com/download/windows).
2. Download the installer and follow the on-screen instructions to complete the installation.

## Step 2: Run the given command in Terminal:

```
    ollama run qwen2:0.5b
```

This will download the Qwen2 model and run it.

### Frontend Setup:

12. **Navigate to the Frontend Directory:**

    - In your terminal, navigate to the `frontend` directory within the project folder.

13. **Install Frontend Dependencies:**

    - Install the required Node.js packages by running:
      ```
      npm install
      ```

14. **Run the Application:**
    - Start the frontend application by running:
      ```
      npm run dev
      ```

You're now ready to use the application locally. Access it in your web browser at [http://localhost:5173/](http://localhost:5173/).

Now you can start development process.
