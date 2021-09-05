
let clickcount=0;//------------- this is an integer variable which keeps count number of phone and email    --------------------

function AddPhone(){ //---------- this is a function which add a phone text box---------------------
    // debugger;
    clickcount+=1;
    let element=document.createElement("input");
    element.type="text";

    var txtid="phone"+clickcount;
    var btnid="deletephonebutton"+clickcount;

    element.id=txtid;
    element.name="phone"+clickcount;
    element.className="phoneclass";
    element.style='margin:0rem 0.2rem 0.8rem 2.9rem';
    let inputphone=document.getElementById("dynamicphone");
    inputphone.appendChild(element);
    // DeletePhone(); //--------------------- 
    AddPhoneCrossButton(); //-------------- this is a function which add a cross button after phone text box---
    
}
function AddPhoneCrossButton(){  // this is a function definition of add cross button------
    // debugger;
    
    // clickcount+=1;
    let element=document.createElement("input");
    element.type="button";
    element.value="x";

    var txtid="phone"+clickcount;
    var btnid="deletephonebutton"+clickcount;

    element.id="deletephonebutton"+clickcount;
    element.name="deletephonebutton"+clickcount;
    
    element.setAttribute('onclick','hidephone(' +txtid+','+btnid+')');
    
    let inputphone=document.getElementById("dynamicphone");
    inputphone.appendChild(element);
    
    
}
//------------------- end function defition of add cross button----------
function hidephone(id1,id2){ //--------this is a function which hide the text field and cross button (id1 is idof textfield1 and id2 is s id of textfield2)
    
//  alert(id1.id+id2.id);
 var x=document.getElementById("dynamicphone");
 var y=document.getElementById(id1.id);
 var z=document.getElementById(id2.id);
 x.removeChild(y);
 x.removeChild(z);

}





var arr=[]; //global empty array which will  use for storing more than one objects


function createobject(){ // this is a function which is create an object and save all data into local storage----
    debugger;
  
    
   
//---------create object---------
let data=localStorage.getItem("patientdetails");//-----Get data from local storage--------
    if(data != null && data != undefined) {arr=JSON.parse(data);}//----- if data is not null and undefined then data will have converted into object and assign in arr variable----
        

    


    let dataobject={
        patientname:document.getElementById("name").value,
        patientphone1:document.getElementById("phone").value
        
    };
    //alternative phone
    var phoneinputlength=document.getElementsByClassName("phoneclass").length;
    
    let patientphoneoptional="";
   for(let i=0;i<phoneinputlength;i++)
   {
    patientphoneoptional+=document.getElementsByClassName("phoneclass")[i].value + " /";
   }
   dataobject.patientphone2=patientphoneoptional;
   //add email
   dataobject.patientemail1=document.getElementById("email").value;
   //add gender
   dataobject.patientgender=document.getElementById("gender").value;
   
  dataobject.patientaddress=document.getElementById("address").value;
  //add checkbox
  
  var allergies=document.getElementsByName("allergiescheck");
  //alert(allergies.length);
  var checkarr=[];

for (let index = 0; index < allergies.length; index++) {
    
    if(allergies[index].checked==true)
    checkarr.push(allergies[index].value);
    // checkarr+=allergies[index].value+",";
    

  
}
//alert(checkarr);
dataobject.patientallergies=checkarr;


   // storing data in local storage
   if(flag==true)
   {
    //    alert("save from edit");
    if(isEmpatyname() && isEmpatymobile() && isEmpatyemail() &&  isEmpatyallergies()){
       arr[index]=dataobject;
    }
       
   }
   else{
           
       if(isEmpatyname() && isEmpatymobile() && isEmpatyemail() &&  isEmpatyallergies()){
        arr.push(dataobject);
       }
       else{
           return;
       }
    
   }
   
   localStorage.setItem("patientdetails",JSON.stringify(arr));
   flag=false;
//---------x create object x---------

    
   

  

  
  
//   console.log(patientemailoptional);
//    console.log(dataobject);
    
}

function createTable(){
     debugger;
let data=localStorage.getItem("patientdetails");
if(data!=null && data!=undefined)  arr=JSON.parse(data);




// console.log(y.length);
if(arr.length>=0)
{
let storedata=``;
for (let index = 0; index < arr.length; index++) {
    if(arr[index]==null)
    {
        continue;
    }
    else
    {
        storedata+=`<tr>
        <td>${arr[index].patientname}</td>
        <td>${arr[index].patientphone1}</td>
        <td>${arr[index].patientphone2}</td>
        <td>${arr[index].patientemail1}</td>
        <td>${arr[index].patientgender}</td>
        <td>${arr[index].patientallergies}</td>
        <td>${arr[index].patientaddress}</td>
        <td>
        <a href="#" onclick="doupdate(${index})">update</a>
        <a href="#" onclick="dodelete(${index})">delete</a>
        </td>
        </tr>`
        
    }
    
}
document.getElementById("tablebody").innerHTML=storedata;
}

}

function Insert(){
    // debugger;

    createobject();
    createTable();


    
}

function dodelete(i){
    debugger;
    // alert("dodelete"+i);
    var x=arr[i];
    //alert(x.patientname);
    //delete arr[i];
    
    arr.splice(i,1);
    localStorage.setItem("patientdetails",JSON.stringify(arr));
    createTable();
    
    // createobject();

}
var flag=false;
var index=0;

// ------------------ update-----------------------

function doupdate(i){
    debugger;
    // alert("doupdate"+i);

    flag=true;
    index=i;
    
   document.getElementById("dynamicphone").innerHTML="";
//    document.getElementsByName("allergiescheck").checked=false;
//    document.getElementsByName("myForm").reset();

    var x=arr[i];
    // alert(x);
    // console.log(x);
    //dynamic phone list
   var str=x.patientphone2;
   var res = str.split("/");
   var length1=res.length;
//    alert("alternate phone="+res);
//     alert("lenth of phone="+length1);
    
    for(let j=0;j<length1-1;j++)
    {
        AddPhone();  
        
        document.getElementsByClassName("phoneclass")[j].value=res[j];
        
    }
     
    
    
    document.getElementById("name").value=x.patientname;
    document.getElementById("phone").value=x.patientphone1;
    document.getElementById("email").value=x.patientemail1;
    document.getElementById("address").value=x.patientaddress;

    //add checkbox
  
  
  var checkboxname=x.patientallergies;
  //alert(checkboxname);
  //alert(checkboxname.length);
  resetcheckbox();
for (let index = 0; index < checkboxname.length; index++) {
    
    document.getElementById("allergies_"+(checkboxname[index])).checked=true;

}



}
// ------------------x update x-----------------------
function resetcheckbox(){
    debugger;
    //alert("resetcheck");
    for(let i=1;i<=9;i++)
    {
        var checkbox1=document.getElementById("allergies_"+i);
        checkbox1.checked=false;
        

    }
}




    // var forminputnumber=document.forms["myForm"]["phone"].value;
    // var forminputemail=document.forms["myForm"]["email"].value;
    // var forminputallergies=document.forms["myForm"][""].value;
function isEmpatyname() {
    debugger;
    
    var forminputname = document.forms["myForm"]["name"].value;
    if (forminputname == "") {
      //  alert("please fill name");
    return false;
    
    }
    else{
      //  alert("correct name")
        return true;
    }
    
    
  }

  function isEmpatymobile() {
    debugger;
    
    var forminputname = document.forms["myForm"]["phone"].value;
    if (forminputname == "") {
      //  alert("please fill mobile");
    return false;
    
    }
    else{
       // alert("correct mobile")
        return true;
    }
    
    
  }
  function isEmpatyemail() {
    debugger;
    
    var forminputname = document.forms["myForm"]["email"].value;
    if (forminputname == "") {
      //  alert("please fill email");
    return false;
    
    }
    else{
       // alert("correct email")
        return true;
    }
    
    
  }
  function isEmpatyallergies() {
    debugger;
    
    var validallergies=document.getElementsByName("allergiescheck");
   // alert(validallergies.length);
    
    
  for (let index = 0; index < validallergies.length; index++) {
      
      if(validallergies[index].checked==false)
      {
        // alert("correct allergies")
        // return true;
        continue;
      }
      else
      {
        
          return true;
      }
      
      
      
    
  }
   
    
    
  }
