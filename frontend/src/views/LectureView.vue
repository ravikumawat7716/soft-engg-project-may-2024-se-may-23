<template>
  <div class="h-full">

    <div class="flex mt-[32px] w-full justify-between ">
      <h1 class="font-semibold text-[18px]">Lecture1</h1>

      <button 
        class="mb-4 px-4 py-2 bg-purple-500 text-white rounded-full text-[14px] transition-colors duration-300"
      >
        create Notes with Ai
      </button>

      <button 
        @click="toggleModal" 
        class="mb-4 px-4 py-2 text-[14px] bg-purple-500 text-white rounded-full transition-colors duration-300"
      >
        Ai Support
      </button>
    </div>

    

    <div class="flex flex-col md:flex-row gap-3 w-full transition-all duration-500">
      <div :class="['video-div', isModalOpen ? 'w-[90%] md:w-[60%]' : 'w-full', 'flex flex-col gap-2', 'transition-all', 'duration-500']">
        <div class="w-full h-[400px] border border-gray-400 rounded-md flex justify-center items-center">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="rounded-md"
          ></iframe>
        </div>
        <div class="transcript">
          <h1 class="font-semibold">Video Transcripts</h1>
        </div>
      </div>

      <div 
        :class="['chat-bot-div', isModalOpen ? 'w-[90%] h-[540px] md:w-[40%]' : 'hidden', 'border-2', 'border-gray-400', 'rounded-md', 'h-[600px]', 'flex', 'flex-col', 'transition-all', 'duration-500']"
      >
        <div class="flex-1 p-4 overflow-y-auto">
          <div v-if="messages.length > 0">
            <div v-for="(message, index) in messages" :key="index" class="mb-2">
              <div :class="['p-2', 'rounded', message.from === 'bot' ? 'bg-gray-200' : 'bg-blue-500 text-white']">
                {{ message.text }}
              </div>
            </div>
          </div>
          <div v-else class="h-full w-full flex items-center justify-center">
            <div class="flex flex-col gap-2">
              <span class="text-center text-4xl">
                <v-icon  name="ai-figshare" width="42" height="42"/>
              </span>

              <span>
                Hi User, I am Ai. How Can I help you?
              </span>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-gray-300 flex">
          <textarea 
            v-model="newMessage" 
            @keyup.enter="sendMessage" 
            placeholder="Type your query..." 
            class="flex-1 p-2 outline-none border px-4 py-2 text-[14px] rounded-md resize-none overflow-hidden"
            rows="1" 
            ref="textarea"
            @input="adjustTextareaHeight"
          ></textarea>
          <button 
            @click="sendMessage" 
            class="ml-2 px-4 py-2 text-white bg-purple-500 rounded-md  transition-colors duration-300"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalOpen: false,
      messages: [
        
      ],
      newMessage: ''
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({ from: 'user', text: this.newMessage });
        this.newMessage = '';
        setTimeout(() => {
          this.messages.push({ from: 'bot', text: 'This is a simulated response.' });
        }, 1000);
        this.$nextTick(() => this.adjustTextareaHeight()); 
      }
    },
    adjustTextareaHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; 
    }
  }
};
</script>

<style scoped>
textarea {
  max-height: 120px; 
}
.icon-large {
  font-size: 100px;
}
</style>