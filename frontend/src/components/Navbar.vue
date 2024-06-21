<template>
    <div class="sticky z-50 top-0 h-14 border-b flex items-center bg-gray-100 justify-between px-[10px] md:px-[80px]">
        <div class="flex items-center gap-2">
            <div><v-icon name="ai-sci-hub-square" width="32" height="32" /></div>

            <h1 class="text-[20px]">Coursera</h1>
        </div>


        <div class="flex items-center gap-10">
            <div class="user-info items-center flex gap-2">
                <div class="image border-2 rounded-full p-2">
                    <img class="w-[24px] h-[24px]" :src="vue" alt="Profile">
                </div>

                <div class="email flex flex-col gap-[1px]">
                    <h1 class="text-[12px]">student</h1>
                    <h1 class="text-[12px]">lokeshkumar@mail.com</h1>
                </div>
            </div>

            <div class="sign-out">
                <button class="border-2 px-4 py-2 cursor-pointer rounded-full hover:bg-purple-500 hover:text-white">Sign Out</button>
            </div>
        </div>

    </div>
</template>

<script>
import vue from "../assets/vue.svg";

export default {
  data() {
    return {
      vue
    }
  }
}
</script>