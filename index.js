let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputbtn=document.getElementById("input-btn")
const deletebtn=document.getElementById("delete-btn")
const tabbtn=document.getElementById("tab-btn")
const ulel=document.getElementById("ul-el")
let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage){
        myLeads=leadsFromLocalStorage
        render(myLeads)
}

tabbtn.addEventListener("click",function(){
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
                myLeads.push(tabs[0].url)
                localStorage.setItem("myLeads",JSON.stringify(myLeads))
                render(myLeads)
        })
       

})
deletebtn.addEventListener("dblclick",function(){
        localStorage.clear()
        myLeads=[]
        // render(myLeads)
        ulel.innerHTML=""
})
inputbtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    inputEl.value=""
})

function render(leads){
let listItems=''
for(let i=0;i<leads.length;i++){
             //first way using innerHTML
    
            //other way of doing the same using createElement and textContent
    // const li=document.createElement("li")
    // li.textContent=myLeads[i]
    // ulel.append(li)
            //--normal way we do it --i.e, to create list items also as external link elements --here we first kept '#'
            //--- which was a dummy one now we have something thats more real something that works
    //listItems+="<li><a target='_blank' href='"+myLeads[i]+"'>"+myLeads[i]+"</a></li>"
            
            //and then we have string templates--
    listItems+=`<li>
                    <a target="_blank" href="${leads[i]}">${leads[i]}</a>
                </li>`
}
ulel.innerHTML=listItems
}