const openChatbotBtn = document.getElementById('openChatbotBtn');
const closeChatbotBtn = document.getElementById('closeChatbotBtn');
const chatbotModal = document.getElementById('chatbotModal');
const overlay = document.getElementById('overlay');
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');

const showModal = () => {
    chatbotModal.style.display = 'block';
    overlay.style.display = 'block';
}

const hideModal = () => {
    chatbotModal.style.display = 'none';
    overlay.style.display = 'none';
}
openChatbotBtn.addEventListener('click', () => {
    showModal();
});

closeChatbotBtn.addEventListener('click', () => {
    hideModal();
});

overlay.addEventListener('click', () => {
    hideModal()
});

sendMessageBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (userMessage !== '') {
        addChatBubble(userMessage, 'user-bubble');
        userInput.value = '';
        const response = await fetch('/generate-response', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: userMessage }),
          });
          
          const responseData = await response.json();
        // Simulate response after a short delay
        
        const botMessage = responseData.response;
        addChatBubble(botMessage, 'chat-bubble');
    }
});

function addChatBubble(message, bubbleClass) {
    const chatBubble = document.createElement('div');
    chatBubble.classList.add('chat-bubble', bubbleClass);
    chatBubble.textContent = message;
    chatContainer.appendChild(chatBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
}
