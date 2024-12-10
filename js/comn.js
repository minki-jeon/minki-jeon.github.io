
  /**
   * (/assets/js/main.js) Toggle mobile nav dropdowns
   * 메뉴 텍스트에 드롭다운 이벤트 적용
   */
  //* TODO. a#services 에 onclick 으로 동작 방식 변경
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
(function(){
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