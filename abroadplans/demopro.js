document.addEventListener("DOMContentLoaded", () => {
  
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 && 
      rect.bottom >= 0
    );
  };

  
  const countrySections = document.querySelectorAll(".reveal-on-scroll");

  const checkCountrySections = () => {
    countrySections.forEach((section) => {
      if (isInViewport(section) && !section.classList.contains("visible")) {
        section.classList.add("visible");
        
        revealNestedContent(section);
        highlightKeywords(section);
      }
    });
  };

  
  const revealNestedContent = (parentSection) => {
    const infoBlocks = parentSection.querySelectorAll(
      ".info-block.reveal-content"
    );
    infoBlocks.forEach((block, index) => {
      setTimeout(() => {
        block.classList.add("visible");
      }, 300 * (index + 1)); 
    });

    
    const listItems = parentSection.querySelectorAll(".list-item-reveal");
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible");
      }, 100 * (index + 1)); 
    });
  };

  
  const highlightKeywords = (parentSection) => {
    const highlightElements = parentSection.querySelectorAll(".highlight-text");
    highlightElements.forEach((element) => {
      if (!element.classList.contains("highlighted")) {
        element.classList.add("highlighted");
      }
    });
  };

  
  checkCountrySections();

  
  window.addEventListener("scroll", checkCountrySections);
});