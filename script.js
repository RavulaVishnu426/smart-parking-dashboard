setInterval(()=>{

fetch("http://yourserver.com/status")
.then(res=>res.json())
.then(data=>{

updateSlot("slot1",data.slot1);
updateSlot("slot2",data.slot2);
updateSlot("slot3",data.slot3);
updateSlot("slot4",data.slot4);

})

},3000);

function updateSlot(id,status)
{
let slot=document.getElementById(id);

if(status==1)
{
slot.className="slot occupied";
slot.innerHTML="Occupied";
}
else
{
slot.className="slot empty";
slot.innerHTML="Empty";
}
}
