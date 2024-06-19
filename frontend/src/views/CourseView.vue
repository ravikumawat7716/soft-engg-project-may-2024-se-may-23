<template>
    <div class="flex h-screen px-[80px]">
        <div class="w-[15%] border-r border-gray-400">
            <div class="my-[40px]">
                <h1 class="text-lg">Software Testing</h1>

                <div class="flex flex-col gap-2 mt-4 border-b-2 border-gray-300 pb-4">
                    <router-link to="#" v-for="(point, index) in points" :key="index">{{ point }}</router-link>
                </div>

                <div class="flex flex-col gap-2 mt-4">
                    <router-link  v-for="(point, index) in assignments" :key="index">{{ point }}</router-link>
                </div>
            </div>
        </div>

        <div class="w-[85%]">
            <div class="ml-[50px] w-full">
                <h1>Lecture1</h1>

                <div class="flex gap-3 w-full ">
                    <div class="video w-[70%] ">
                        <div class="w-full h-[400px] border-2 border-gray-400 rounded-md flex justify-center items-center">
                            <h1 class="text-2xl">Video View</h1>
                        </div>
                    </div>

                    <div class="chat-bot border-2 border-gray-400 rounded-md h-[600px] w-[30%]">
                        Ai Chat Bot
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: "CourseView",
    data(){
        return {
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