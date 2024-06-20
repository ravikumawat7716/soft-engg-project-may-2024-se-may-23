# app.py

from mongo_schema import MongoDBHandler
from schemas import student_schema, teacher_schema


uri = "mongodb+srv://22f2000060:KRLC9N4HY9O0cBQN@se.ywopr8k.mongodb.net/?retryWrites=true&w=majority&appName=SE"  # Replace with your MongoDB URI
db_name = "SE"  # Replace with your database name

# Initialize MongoDB handler
mongo_handler = MongoDBHandler(uri, db_name)

# Create the collections if they don't exist
mongo_handler.create_collection("StudentCluster", student_schema)
mongo_handler.create_collection("TeacherCluster", teacher_schema)

# Example student data
new_student = {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "roll_no": "12345",
    "photo": "http://example.com/photo.jpg",
    "login_logs": [],
    "LLM_setting": {},
}

# Example teacher data
new_teacher = {
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "employee_id": "T12345",
    "photo": "http://example.com/photo.jpg",
    "courses": ["Math", "Science"],
}

# CRUD operations for StudentCluster
mongo_handler.insert_document("StudentCluster", new_student)
student = mongo_handler.get_document_by_field(
    "StudentCluster", "email", "john.doe@example.com"
)
if student:
    print("Student retrieved:", student)
update_data_student = {"name": "Johnathan Doe"}
mongo_handler.update_document(
    "StudentCluster", "email", "john.doe@example.com", update_data_student
)
mongo_handler.delete_document("StudentCluster", "email", "john.doe@example.com")

# CRUD operations for TeacherCluster
mongo_handler.insert_document("TeacherCluster", new_teacher)
teacher = mongo_handler.get_document_by_field(
    "TeacherCluster", "email", "jane.smith@example.com"
)
if teacher:
    print("Teacher retrieved:", teacher)
update_data_teacher = {"name": "Dr. Jane Smith"}
mongo_handler.update_document(
    "TeacherCluster", "email", "jane.smith@example.com", update_data_teacher
)
# mongo_handler.delete_document("TeacherCluster", "email", "jane.smith@example.com")

# Close the MongoDB connection when done
mongo_handler.close_connection()
