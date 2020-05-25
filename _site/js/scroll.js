  let scrollpos = window.scrollY;

  const header_height = 20;


  window.addEventListener('scroll', function() { 
    scrollpos = window.scrollY;

    if (scrollpos >= header_height) { document.querySelector(".nav").classList.add("scroll"); }
    else { document.querySelector(".nav").classList.remove("scroll"); }

    console.log(scrollpos)
  });