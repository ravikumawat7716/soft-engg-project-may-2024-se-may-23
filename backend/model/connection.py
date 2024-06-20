# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi

# uri =

# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi("1"))

# # Send a ping to confirm a successful connection
# try:
#     client.admin.command("ping")
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)


from mongo_schema import MongoDBHandler


def main():
    uri = "mongodb+srv://22f2000060:KRLC9N4HY9O0cBQN@se.ywopr8k.mongodb.net/?retryWrites=true&w=majority&appName=SE"  # Replace with your MongoDB URI
    db_name = "SE"  # Replace with your database name

    # Initialize MongoDB handler
    mongo_handler = MongoDBHandler(uri, db_name)

    # Create the student cluster collection if it doesn't exist
    mongo_handler.create_student_cluster()

    # Example student data
    new_student = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "roll_no": "12345",
        "photo": "http://example.com/photo.jpg",
        "login_logs": [],
        "LLM_setting": {},
    }

    # Create a new student
    mongo_handler.create_student(new_student)

    # Retrieve a student by email
    student = mongo_handler.get_student_by_email("john.doe@example.com")
    if student:
        print("Student retrieved:", student)

    # Update a student
    update_data = {"name": "Johnathan Doe"}
    mongo_handler.update_student("john.doe@example.com", update_data)

    # Close the MongoDB connection when done
    mongo_handler.close_connection()


if __name__ == "__main__":
    main()
