import { format,parseISO,isValid } from "date-fns";

export  const formData = (dateString)=>{
    const date= parseISO(dateString);
    return isValid(date) ? format(date, "MMM yyy") : "Present"
}