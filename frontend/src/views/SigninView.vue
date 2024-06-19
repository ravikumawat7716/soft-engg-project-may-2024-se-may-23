<template>
    <div class="h-screen">
        <div class="h-full flex flex-col items-center justify-center ">

            <div class="w-[400px] flex flex-col shadow-xl border border-gray-200 rounded-[18px] px-4 py-14 text-center">
                <h1 class="font-bold text-[18px]">Sign in to App</h1>

                <h1 class=" mt-[4px] text-[14px]">Welcome back! Please sign in to continue</h1>

                <button class="flex gap-2 mt-[24px] items-center mx-auto border-2 px-6 py-2 rounded-2xl hover:bg-purple-500 hover:text-white">
                    <span class="text-[14px]">
                        <v-icon name="fc-google"  />
                    </span>

                    <span class="text-[12px]">SignIn with Google</span>
                </button>
            </div>
            
        </div>
        
    </div>
</template>