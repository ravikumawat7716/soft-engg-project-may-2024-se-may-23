<template>
    <div class="flex h-[92vh] px-[10px] md:px-[80px]">
        <div class="w-[10%]  md:w-[20%] border-r border-gray-400">
            <div class="my-[40px]">
                <h1 class="text-lg font-semibold">My DashBoard</h1>

                <div class="flex flex-col gap-2 mt-4">
                    <router-link class="text-[14px]" to="#" v-for="(point, index) in points" :key="index">{{ point }}</router-link>
                </div>
            </div>
        </div>

        <div class="w-[90%] md:w-[80%]">
            <div class="ml-[100px] my-[40px]">
                <h1 class="font-semibold mb-4 text-2xl">My Current Courses</h1>
                <div class="flex flex-wrap gap-2 ">
                    <router-link to="/user-dashboard/courseId/lectureId"  class="border-2 rounded-lg p-8 py-[50px] text-white bg-red-700 cursor-pointer w-[300px]" >
                        <h1 class="text-2xl font-semibold">Software Engineering</h1>
                    </router-link>

                    <router-link to="/user-dashboard/courseId/lectureId"  class="border-2 rounded-lg p-8 py-[50px] text-white bg-red-700 cursor-pointer w-[300px]" >
                        <h1 class="text-2xl font-semibold">Software Testing</h1>
                    </router-link>

                    <router-link to="/user-dashboard/courseId/lectureId"  class="border-2 rounded-lg p-8 py-[50px] text-white bg-red-700 cursor-pointer w-[300px]" >
                        <h1 class="text-2xl font-semibold">Deep Learning</h1>
                    </router-link>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: "UserDashboard",
    data(){
        return {
            points: [
                "My Current Courses",
                "MY Current Projects",
                "Complected & Pending Courses",
                "certificates",
                "Academics Calender"
            ]
        }
    },
}

</script>