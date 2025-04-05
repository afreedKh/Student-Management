import mongoose,{Document,Schema} from "mongoose";


interface Students extends Document{
    studentId:number;
    name:string;
    email:string;
    phone:number;
    course:string;
    isDeleted:boolean
}

const studentsSchema = new Schema<Students>({
    studentId:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})


const StudentModel = mongoose.model<Students>('Students',studentsSchema)

export default StudentModel;