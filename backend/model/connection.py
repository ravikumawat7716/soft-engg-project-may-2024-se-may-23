from model.mongo_utility import MongoDBHandler
from model.schemas import student_schema, llm_log_schema , course_schema


# def mongoDB():

# MongoDB connection details
uri = "mongodb+srv://22f2000060:KRLC9N4HY9O0cBQN@se.ywopr8k.mongodb.net/?retryWrites=true&w=majority&appName=SE"  # Replace with your MongoDB URI
db_name = "SE"  # Replace with your database name

# Initialize MongoDB handler
mongo_handler = MongoDBHandler(uri, db_name)


# Create the collections if they don't exist
def create_collection():
    mongo_handler.create_collection("StudentCluster", student_schema)
    mongo_handler.create_collection("LLMLogsCluster", llm_log_schema)
    mongo_handler.create_collection("CourseCluster", course_schema)


# return mongo_handler

# Example student data
new_student = {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "roll_no": "12345",
    "photo": "http://example.com/photo.jpg",
    "login_logs": [],
    "LLM_setting": {},
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

# Close the MongoDB connection when done
# mongo_handler.close_connection()
