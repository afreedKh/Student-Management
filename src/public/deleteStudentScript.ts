declare var Swal:any; 

async function deleteStudent(id:string){
   try {
   const response:Response =  await fetch(`/deleteStudent?id=${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':"application/json"
        }
    })

    let data = await response.json();
    if(data.success){
        Swal.fire({
            title:'Success!',
            text:'Student Deleted Successfully',
            icon:'success'
        })
        .then(()=>{
            window.location.href = '/'
        })
    }else{
        Swal.fire({
            title:'Error !',
            text:'Student Deleted Failed !',
            icon:'error'
        })
    }
   } catch (error) {
    console.log('request failed ! ');
    
   }
}