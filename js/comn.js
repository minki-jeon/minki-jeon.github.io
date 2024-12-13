(function(){


  // left navmenu-links
  let navmenulinks = document.querySelectorAll('.navmenu a');

  /**
   * Navmenu Scrollspy
   */
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
        // Toggle dropdown menu
        if (navmenulink.parentElement.classList.contains('dropdown')) {
          let dropdownMenu = navmenulink.parentElement.querySelector('ul');
          dropdownMenu.classList.add('dropdown-active');
        }
      } else {
        navmenulink.classList.remove('active');
        // Toggle dropdown menu
        if (navmenulink.parentElement.classList.contains('dropdown')) {
          let dropdownMenu = navmenulink.parentElement.querySelector('ul');
          dropdownMenu.classList.remove('dropdown-active');
        }
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

/*
** 스크롤 동작 스크립트 (ref. ChatGPT)
* TODO. 소스 분석, 구조 수정, 기존 템플릿 스크롤 스크립트 삭제 가능 여부 확인
* TODO. 스크립트 추가 후, a해시태그에 url 삽입되지않은것과 새로고침할 때 해시태그로 이동되지 않는 이슈 분석 및 수정
 */

  // Handle smooth scrolling and dropdown toggling
  navmenulinks.forEach(navmenulink => {
    navmenulink.addEventListener('click', function (e) {
      if (this.parentElement.classList.contains('dropdown')) {
        e.preventDefault(); // Prevent default behavior for dropdown links

        // Toggle dropdown menu
        // let dropdown = this.parentElement;
        // const isOpen = dropdown.classList.contains('dropdown-active');
        // dropdown.classList.toggle('dropdown-active');

        // Smooth scroll to the section if dropdown was not already open
        if (/* !isOpen && */ this.hash) {
          let targetSection = document.querySelector(this.hash);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }
      } else {
        // For normal links, smooth scroll to the section
        if (this.hash) {
          e.preventDefault();
          let targetSection = document.querySelector(this.hash);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }
      }
    });
  });

  // Close dropdown menus when clicking outside
  document.addEventListener('click', function (event) {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      let dropdownMenu = dropdown.querySelector('ul');
      if (dropdownMenu && !dropdown.contains(event.target)) {
        dropdownMenu.classList.remove('dropdown-active');
      }
    });
  });



  
  /**
   * (/assets/js/main.js) Toggle mobile nav dropdowns
   * 메뉴 텍스트에 드롭다운 이벤트 적용
   */
  //* TODO. 스크롤+드롭다운 이벤트 정상 동작된 후에는 'dropdown-menu-test' 클래스명 변경 
  document.querySelectorAll('.navmenu .dropdown-menu-test').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
    
      e.preventDefault();
    //   this.parentNode.classList.toggle('active');
    //   this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
    
      this.classList.toggle('active');
      this.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();

    });
  });


/** 
 * include Html-file load (header, footer, nav)
 * Local 에서 동작을 할 수 없으므로 서비스용에서 사용
 */
  function includeHtml() {
      const includeTarget = document.querySelectorAll('.incFile');
      includeTarget.forEach(function(el, idx) {
          const targetFile = el.dataset.includeFile;
          if(targetFile){
              let xhttp = new XMLHttpRequest();
          
              xhttp.onreadystatechange = function() {
                  if (this.readyState === XMLHttpRequest.DONE) {
                      this.status === 200 ? (el.innerHTML = this.responseText) : null
                      this.status === 404 ? (el.innerHTML = 'include not found.') : null
                  }
              }
              xhttp.open('GET', targetFile, true);
              xhttp.send();
              return;
          }
      });
  };
  includeHtml();

})();