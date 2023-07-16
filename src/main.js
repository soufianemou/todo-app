$(document).ready(()=>{
    
    //function that deals with dark and light mod
    function lightDark(){
        $('#mod').on('click',()=>{
            if($('#mod').hasClass('light')){
    
                $("#mod img").attr('src',"./images/icon-sun.png")
                $('#main').css("background-image", "url(./images/bg-desktop-dark.jpg)");  
                $("body").css('background-color',"#393a4c")
    
                $('h2,input').css('color','#fafafa')
                $('h2,input,#option').css('background-color','#4d5066')
    
                $('#list,h2').addClass('border-[#9CA3AF]')
    
                $('i').addClass('text-white')
    
                $('#mod').removeClass('light')
                $('#mod').addClass('dark')           
            }else{
    
                $("#mod img").attr('src',"./images/icon-moon.png")
                $('#main').css("background-image", "url(./images/bg-desktop-light.jpg)");  
                $("body").css('background-color',"white")          
    
                $('h2,input').css('color','black')
                $('h2,input,#option').css('background-color','white')
    
                $('#list,h2').removeClass('border-[#9CA3AF]')
    
                $('i').removeClass('text-white')
    
                $('#mod').removeClass('dark')
                $('#mod').addClass('light')
            }
    
        })
    }
    lightDark()


    function inputFocus(){
        $('input[type="text"]').focus()
    }
    inputFocus()

    //insert new task
    function inserNewTodo(){
        let i =0
        $(document).keyup(function(event) {
            const inputValue = $.trim($('input').val())
            if (event.keyCode === 13 && $('input').val() !== '' && inputValue !== '' ) {
                if($('#mod').hasClass('dark')){
                    $('#list').prepend(
                        `<div class="relative" draggable="true">
                        <input  type="checkbox" disabled id="cbx${i==0?'':i}" class="hidden-xs-up">
                        <label for="cbx${i==0?'':i}" class="cbx absolute left-6 top-4"></label>
                        <h2 class="w-full py-5 ps-[75px] outline-none  border-b-2 border-[#9CA3AF] font-extrabold text-[#fafafa] bg-[#4d5066] cursor-pointer">${$('input').val().trim()}</h2>
                        <button onclick="removeItems(this)" class="z-30 absolute right-5 top-4 font-bold"><i class="fa-solid fa-xmark fa-2x text-white  hover:scale-[1.2]"></i></button>
                        </div>`)
                    $('#actives').prepend(
                        `<div class="relative" draggable="true">
                            <h2 class="w-full py-5 ps-[75px] outline-none  border-b-2 border-[#9CA3AF] font-extrabold text-[#fafafa] bg-[#4d5066] cursor-pointer">${$('input').val().trim()}</h2>
                        </div>`)        
                        dragItem()                        
                }else{
                    $('#list').prepend(
                        `<div class="relative" draggable="true">
                        <input  type="checkbox" disabled id="cbx${i==0?'':i}" class="hidden-xs-up">
                        <label for="cbx${i==0?'':i}" class="cbx absolute left-6 top-4"></label>
                        <h2  class="w-full py-5 ps-[75px] outline-none  border-b-2 font-extrabold text-black bg-white cursor-pointer">${$('input').val().trim()}</h2>
                        <button onclick="removeItems(this)" class="z-30 absolute right-5 top-4 font-bold"><i class="fa-solid fa-xmark fa-2x  hover:scale-[1.2]"></i></button>
                        </div>`)
                    $('#actives').prepend(
                        `<div class="relative" draggable="true">
                            <h2  class="w-full py-5 ps-[75px] outline-none  border-b-2 font-extrabold text-black bg-white cursor-pointer">${$('input').val().trim()}</h2>
                        </div>`)  
                        dragItem()
                        i++
                    }
            $('input').val('')
            calculItems()
            checkboxCheck()
        }      
        });

    }  
    inserNewTodo()

    
    function clearcompleted(){
        $("#deletall").click(() => {
            $('#completed').children().each(function() {
                const completedChildHtml = $(this).find('h2').html();
            
                $('#list').children().each(function(index, element) {
                if ($(element).find('h2').html() === completedChildHtml) {
                    $(element).remove();
                    return false; // Exit the loop after removing the matching child
                }
                });
            
                $(this).remove();
            });
        });            
    }
    clearcompleted()


    function activePage(){
        $('#actives').hide()
        $('#completed').hide()
        $('#status').children().each((index,element)=>{
            $(element).click(()=>{
                if($(element).hasClass('all')){
                    $(element).addClass('active')
                    $(element).siblings().removeClass('active')
                    $('#list').show()
                    $('#list').siblings(':not(#option, #heading, #inptTo,h4)').hide();
                }
                if($(element).hasClass('actives')){
                    $(element).addClass('active')
                    $(element).siblings().removeClass('active')
                    $('#actives').show()
                    $('#actives').siblings(':not(#option, #heading, #inptTo,h4)').hide();
                }
                if($(element).hasClass('completed')){
                    $(element).addClass('active')
                    $(element).siblings().removeClass('active')
                    $('#completed').show()
                    $('#completed').siblings(':not(#option, #heading, #inptTo,h4)').hide();
                }
            })
        })
    }
    activePage()


    function checkboxCheck(){       
        $('input[type="checkbox"]').siblings('h2').each((index,elem)=>{
            $(elem).click(()=>{
                if(!$(elem).hasClass('line-through text-[#C2C1C5]')){
                    $(elem).addClass('line-through text-[#C2C1C5]')
                    // the clone
                    let clonedcontent = $(elem).parent().clone();
                    clonedcontent.find('input, label, button').remove();
                    $('#completed').prepend(clonedcontent)
                    
                    setTimeout(()=>{
                        $(elem).siblings('input[type="checkbox"]').prop('checked',true)                       
                    },1000)
                    
                    $('#actives').children().each((index,element)=>{
                        if($(elem).html() === $(element).find('h2').html()){
                            $(element).find('h2').parent().remove()
                            calculItems()
                        }
                    })
                }                              
            inputFocus()                
            })
        })
        
    }
    checkboxCheck()
    

    //function that hundel the delete button of the task
    $('#list').on('click', 'button', function() {
        const taskHtml = $(this).siblings('h2').html();
        $(this).parent().remove(); // Remove the parent div containing the task
        // Remove corresponding task from #actives
        $('#actives').children().each(function(index, elem) {
            if ($(elem).find('h2').html() === taskHtml) {
            $(elem).remove();
            $('input[type="text"]').focus()
            calculItems()
            return false;
            }   
        });
    });
    

    //calcule the items left that hasn't completed yet
    function calculItems() {
        const numActiveItems = $("#actives").children().length;
        $('#numItems').html(numActiveItems);
    }
    
    //deals with drag and drop
    dragItem()
    function dragItem() {
        let drag = null;
        let targetItem = null;

        $('#list').children().each((index, elem) => {
            $(elem).on('dragstart', (e) => {
                drag = $(e.currentTarget);
            });
            $(elem).on('dragend', () => {
                drag = null;
                targetItem = null; // Reset targetItem after dragging is done
            });
        });

        $('#list').on('dragover', (e) => {
            e.preventDefault();
            targetItem = $(e.target).closest("div");
        });

        $('#list').on('drop', (e) => {
            e.preventDefault();
            if (targetItem && drag && targetItem[0] !== drag[0]) {
                const targetIndex = $('#list').children().index(targetItem);
                const dragIndex = $('#list').children().index(drag);
                const item = targetIndex > dragIndex ? targetItem.next() : targetItem;
                
                if (targetIndex === $('#list').children().length - 1) {
                    // Get the position to move the last item
                    const newPosition = $(item).index();
                    // Move the last item to the specified position
                    if (newPosition >= 0) {
                        $('#list').children().eq(newPosition).before(drag);
                    } else {
                        $('#list').append(drag);
                    }
                } else {
                    $(item).before(drag);
                }
            }
        });
    }   


})