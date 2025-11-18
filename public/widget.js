(function() {
  'use strict';

  // Get the chatbot ID from the script tag
  const script = document.currentScript;
  const chatbotId = script.getAttribute('data-chatbot-id');

  if (!chatbotId) {
    console.error('ChatBot Widget: data-chatbot-id attribute is required');
    return;
  }

  // Get the base URL from the script src
  const scriptSrc = script.src;
  const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));

  // Create widget container
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'chatbot-widget-container';
  widgetContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  `;

  // Create toggle button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'chatbot-toggle-btn';
  toggleButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;
  toggleButton.style.cssText = `
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: transform 0.2s, box-shadow 0.2s;
  `;

  toggleButton.addEventListener('mouseenter', () => {
    toggleButton.style.transform = 'scale(1.1)';
    toggleButton.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
  });

  toggleButton.addEventListener('mouseleave', () => {
    toggleButton.style.transform = 'scale(1)';
    toggleButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  });

  // Create iframe for chat
  const chatFrame = document.createElement('iframe');
  chatFrame.id = 'chatbot-iframe';
  chatFrame.src = `${baseUrl}/chat/${chatbotId}`;
  chatFrame.style.cssText = `
    display: none;
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 400px;
    height: 600px;
    max-width: calc(100vw - 40px);
    max-height: calc(100vh - 120px);
    border: none;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    z-index: 999998;
  `;

  // Toggle chat visibility
  let isOpen = false;
  toggleButton.addEventListener('click', () => {
    isOpen = !isOpen;
    chatFrame.style.display = isOpen ? 'block' : 'none';
    toggleButton.innerHTML = isOpen
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <line x1="18" y1="6" x2="6" y2="18"></line>
           <line x1="6" y1="6" x2="18" y2="18"></line>
         </svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
         </svg>`;
  });

  // Append elements to page
  widgetContainer.appendChild(chatFrame);
  widgetContainer.appendChild(toggleButton);
  document.body.appendChild(widgetContainer);

  // Responsive design for mobile
  function adjustForMobile() {
    if (window.innerWidth < 768) {
      chatFrame.style.width = 'calc(100vw - 40px)';
      chatFrame.style.height = 'calc(100vh - 120px)';
      chatFrame.style.right = '20px';
      chatFrame.style.bottom = '90px';
    } else {
      chatFrame.style.width = '400px';
      chatFrame.style.height = '600px';
      chatFrame.style.right = '20px';
      chatFrame.style.bottom = '90px';
    }
  }

  window.addEventListener('resize', adjustForMobile);
  adjustForMobile();
})();
