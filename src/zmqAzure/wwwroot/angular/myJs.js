       var linkTogglerCol = document.getElementById('togglerCol');
	   var linkNextButton = document.getElementById('nextButton');

	   if(linkTogglerCol!=null)
	   {
        linkTogglerCol.onclick = function()
		{
            var subContent = document.getElementById('sub-content');
            if (subContent.className == 'shrinkCol') {
                subContent.className = '';
				linkTogglerCol.innerHTML="<span class=\"glyphicon glyphicon-chevron-right\"></span>RecordPanel";
				linkNextButton.style.right='30%';
            } else {
                subContent.className = 'shrinkCol';
				linkTogglerCol.innerHTML="<span class=\"glyphicon glyphicon-chevron-left\"></span>RecordPanel"; 
				linkNextButton.style.right='20px';				
            }
            return false;
        }
	   }
        var linkTogglerRow = document.getElementById('togglerRow');
		if(linkTogglerRow!=null)
		{
			linkTogglerRow.onclick = function()
			{
				var headerContent = document.getElementById('header-content');
				var subContent = document.getElementById('sub-content');
				var mainContent = document.getElementById('main-content');
				if (headerContent.className == 'shrinkRow')
				{
					headerContent.className = '';
					if(subContent!=null)
					{
						subContent.style.height='70%';
					}
					mainContent.style.height='70%';
					linkTogglerRow.innerHTML="<span class=\"glyphicon glyphicon-chevron-up\"></span>ParamPanel"; 
				}
				else {
					headerContent.className = 'shrinkRow';
					if(subContent!=null)
					{					
						subContent.style.height='100%';
					}
					mainContent.style.height='100%';
					linkTogglerRow.innerHTML="<span class=\"glyphicon glyphicon-chevron-down\"></span>ParamPanel"; 
				}
				return false;
			}
		}
