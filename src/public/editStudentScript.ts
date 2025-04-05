declare var Swal:any;

document.getElementById("student-form")?.addEventListener("submit", async function (event: Event): Promise<void> {
    event.preventDefault();
    

    let form = event.target as HTMLFormElement;
    let formData:FormData = new FormData(form);

    let studentId = formData.get("studentId") as string;
    let studentName = formData.get("studentName") as string;
    let email = formData.get("email") as string;
    let ph = formData.get("phone") as string;
    let phone = Number(ph) as number
    let course = formData.get("course") as string;

    let mainId = document.getElementById('mainId') as HTMLInputElement | null

    let id = mainId ?  mainId.value : null;
    

    let studentIdError = document.getElementById("error-Id") as HTMLSpanElement | null;
    let studentNameError = document.getElementById("error-name") as HTMLSpanElement | null;
    let studentEmailError = document.getElementById("error-email") as HTMLSpanElement | null;
    let studentPhoneError = document.getElementById("error-phone") as HTMLSpanElement | null;
    let studentCourseError = document.getElementById("error-course") as HTMLSpanElement | null;

    document.querySelectorAll('.errorSpan').forEach(element => {
      element.innerHTML = ''
    });

    let initialError: boolean = false;

    let namePattern = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phonePattern = /^\d{10}$/;

    if (!studentId || studentId.length !== 5) {
      initialError = true;
      if (studentId == "" && studentIdError) {
        studentIdError.innerText = "Please Enter Student ID";
      } else if (studentId.length !== 5 && studentIdError) {
        studentIdError.innerText = "Student ID Must Be 5 Digits";
      }

    } else if (!studentName || !namePattern.test(studentName)) {
      initialError = true;
      if (!studentName && studentNameError) {
        studentNameError.innerText = "Please Enter Student Name";
      } else if (!namePattern.test(studentName) && studentNameError) {
        studentNameError.innerText = "Please Enter Valid Name";
      }

    } else if (!email || !emailPattern.test(email)) {
      initialError = true;
      if (!email && studentEmailError) {
        studentEmailError.innerText = "Please Enter Email Address";
      } else if (!emailPattern.test(email) && studentEmailError) {
        studentEmailError.innerText = "Please Enter Valid Email Address";
      }

    } else if (!phone || phone.toString().length!==10) {
      initialError = true;
      if (!phone && studentPhoneError) {
        studentPhoneError.innerText = "Please Enter Phone Number";
      } else if ( phone.toString().length!==10&& studentPhoneError && !phonePattern.test(phone.toString())) {
        studentPhoneError.innerText = "Phone Number Must Be 10 Digits";
      }

    } else if (course === "") {
      initialError = true;
      if (!course && studentCourseError) {
        studentCourseError.innerText = "Please Choose a course";
      }
    }
    let stdId= Number(studentId)
    
    let forms={
      stdId,
      studentName,
      email,
      phone,
      course
   }

    if (!initialError) {

      try {
        let response:Response = await fetch(`/updateStudent?id=${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(forms)
        })
  
        let data= await response.json()

        if(data.success){
          Swal.fire({
            title:'Success!',
            text:'Student Updated Successfully',
            icon:"success",

          }).then(()=>{
            form.reset();
            window.location.href='/'
          })
        }else{
          Swal.fire({
            title:'Failed',
            text:'Student Updated Failed!',
            icon:"error",
          }).then(()=>{
            Object.entries(data.validationError).forEach(([key,message])=>{
              const errorElement = document.getElementById(`error-${key}`) as HTMLSpanElement
              if (errorElement) errorElement.textContent = message as string ;
            })
          })
        }
      } catch (error) {
        console.error('Request failed');
      } 
    }
  });