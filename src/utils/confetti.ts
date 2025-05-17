const confetti = () => {
  const colors = ['#28DF99', '#99F3BD', '#D2F6C5', '#F6F7D4'];
  
  const createElements = (root: HTMLElement, elementCount: number) => {
    return Array.from({ length: elementCount }).map((_, index) => {
      const element = document.createElement('div');
      const color = colors[index % colors.length];
      
      element.style.backgroundColor = color;
      element.style.width = '10px';
      element.style.height = '10px';
      element.style.position = 'absolute';
      element.style.borderRadius = '50%';
      element.style.top = '0';
      element.style.left = '0';
      element.style.opacity = '0';
      element.style.pointerEvents = 'none';
      element.style.zIndex = '1000';
      
      root.appendChild(element);
      
      return element;
    });
  };
  
  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };
  
  const root = document.createElement('div');
  root.style.position = 'fixed';
  root.style.top = '0';
  root.style.left = '0';
  root.style.width = '100%';
  root.style.height = '100%';
  root.style.pointerEvents = 'none';
  root.style.zIndex = '1000';
  document.body.appendChild(root);
  
  const elements = createElements(root, 100);
  
  elements.forEach((element, index) => {
    const startPositionX = randomInRange(0, 100);
    const startPositionY = randomInRange(-10, 0);
    const endPositionX = startPositionX + randomInRange(-20, 20);
    const endPositionY = randomInRange(100, 120);
    
    const duration = randomInRange(1000, 1500);
    const delay = randomInRange(0, 300);
    
    element.animate(
      [
        {
          transform: `translate(${startPositionX}vw, ${startPositionY}vh) scale(${randomInRange(0.8, 1.2)})`,
          opacity: 1
        },
        {
          transform: `translate(${endPositionX}vw, ${endPositionY}vh) scale(${randomInRange(0.8, 1.2)}) rotate(${randomInRange(-360, 360)}deg)`,
          opacity: 0
        }
      ],
      {
        duration,
        delay,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      }
    );
  });
  
  // Clean up after animation
  setTimeout(() => {
    document.body.removeChild(root);
  }, 3000);
};

export default confetti;