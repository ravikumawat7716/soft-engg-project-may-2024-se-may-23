<template>
    <div class="flex h-[92vh] px-[10px] md:px-[80px]">
        <div class="hidden md:block md:w-[10%] border-r border-gray-400">
            <div class="my-[40px]">
                <h1 class="text-lg">Software Testing</h1>

                <div class="flex flex-col gap-2 mt-4 border-b-2 border-gray-300 pb-4">
                    <router-link to="/user-dashboard/courseId/lectureId" v-for="(point, index) in points" :key="index">{{ point }}</router-link>
                </div>

                <div class="flex flex-col gap-2 mt-4">
                    <router-link to="/user-dashboard/courseId/assignments/assignmentId" v-for="(point, index) in assignments" :key="index">{{ point }}</router-link>
                </div>
            </div>
        </div>

        <div class="w-[100%] md:w-[95%]">
            <div class="ml-[50px] w-full">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: "CourseView",
    data(){
        return {
            isModalOpen: false,
            points: [
                "Lecture 1",
                "Lecture 2",
                "Lecture 3",
                "Lecture 4",
                "Lecture 5"
            ],
            assignments: [
                "Assignment 1",
                "Assignment 2",
                "Assignment 3",
                "Assignment 4",
                "Assignment 5"
            ]
        }
    },
}

</script>