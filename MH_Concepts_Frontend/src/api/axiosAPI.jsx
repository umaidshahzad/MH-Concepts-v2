import axios from "axios";

export const api=axios.create({
    baseURL:"http://localhost:4000/api/v1",
    withCredentials:true
})

export const SignUp=(data)=>{
    return api.post(`/signup`,data)
}

export const GetProductByCategory=(category)=>{
    return api.get(`/getProductByCategory/${category}`)
}

export const DeleteProduct=(code)=>{
    return api.delete(`/deleteProduct/${code}`)
}

export const UpdateProduct=(code,data)=>{
    return api.put(`/UpdateProduct/${code}`,data)
}

export const CreateProduct=(data)=>{
return api.post(`/CreateProduct`,data)
}

export const logout=()=>{
    return api.post(`/logout`)
}

export const login=(data)=>{
    return api.post(`/login`,data)
}

export const SubmitInquiry=(data)=>{
    return api.post(`/submitInquiry`,data)
}

export const GetSingleProduct=(code)=>{
    return api.get(`/getSingleProduct/${code}`)
}

export const GetAllProducts=()=>{
    return api.get(`getAllProducts`)
}

export const DeleteLead=(id)=>{
    return api.delete(`/DeleteLead/${id}`)
}

export const UpdateLeadStatus=(id,statusVal)=>{
return api.put(`/updateLeadStatus/${id}`,{status:statusVal})
}

export const getAllLeads=()=>{
    return api.get(`/getAllLeads`)
}

export const getDashboardStats=()=>{
    return api.get(`/getDashboardStats`)
}