<template>
    <div class="flex h-[92vh] px-[10px] md:px-[80px] relative">
        <button @click="toggleSidebar" class="block absolute top-4 left-4 z-20 p-2 cursor-pointer bg-blue-500 text-white rounded-md md:hidden">
            Toggle
        </button>
        <div class="sidebar hidden md:block md:w-[15%] border-r border-gray-400">
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

        <!-- for mobile sidebar -->
        <div :class="['mobile-sidebar', isToggleShow ? 'translate-x-0' : '-translate-x-full', 'md:hidden', 'transition-transform', 'duration-300', 'fixed', 'h-full', 'w-[60%]', 'bg-white', 'z-30', 'shadow-lg']">
            <div class="my-[40px]">
                <div class="flex justify-between items-center">
                    <h1 class="text-lg">Software Testing</h1>

                    <button @click="toggleSidebar" class="pr-5" >X</button>
                </div>
                

                <div class="flex flex-col gap-2 mt-4 border-b-2 border-gray-300 pb-4">
                    <router-link @click="toggleSidebar" to="/user-dashboard/courseId/lectureId" v-for="(point, index) in points" :key="index">{{ point }}</router-link>
                </div>

                <div class="flex flex-col gap-2 mt-4">
                    <router-link @click="toggleSidebar" to="/user-dashboard/courseId/assignments/assignmentId" v-for="(point, index) in assignments" :key="index">{{ point }}</router-link>
                </div>
            </div>
        </div>

        <div class="w-[100%] md:w-[85%]">
            <div class="ml-[50px] w-full">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CourseView",
    data() {
        return {
            isToggleShow: false,
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
    methods: {
        toggleSidebar() {
            this.isToggleShow = !this.isToggleShow;
        },
    },
}
</script>

<style scoped>
.mobile-sidebar {
    will-change: transform;
}
</style>