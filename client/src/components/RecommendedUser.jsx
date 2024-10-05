import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { axiosInstance } from '../lib/axois'
import toast from 'react-hot-toast'
export default function RecommendedUser() {

  const RecommendedUser = ({user})=>{
    const queryClient = useQueryClient();
    const {data:connectionStatus,isLoading} = useQuery({
      queryKey:["connectionStatus",user._id],
      queryFn:()=>axiosInstance.get(`connections/status/${user._id}`)
    })
 
  const {mutate:sendConnectionRequest} = useMutation({
    mutationFn:(userId)=>axiosInstance.post(`/connections/request/${userId}`),
    onSuccess:()=>{
      toast.success("connections request sent successfully!")
      queryClient.invalidateQueries({queryKey:["connectionStatus",user._id]})
    },
    onError:(error)=>{
      toast.error(error.response?.data?.error || "An error occurred")
    }
  })
  
  const {mutate:acceptRequest} = useMutation({
    mutationFn:(requestId)=>axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess:()=>{
      toast.success("connections accepted")
      queryClient.invalidateQueries({queryKey:["connectionStatus",user._id]})
    },
    onError:(error)=>{
      toast.error(error.response?.data?.error || "An error occurred")
    }
  })

  const {mutate:rejectRequest} = useMutation({
    mutationFn:(rejectId) => axiosInstance.put(`/connections/accept/${rejectId}`),
    onSuccess:()=>{
      toast.success("connection request rejected")
      queryClient.invalidateQueries({queryKey:["connectionStatus",user._id]})
    },
    onError:(error)=>{
      toast.error(error.response?.data?.error || "An error occurred")
    }
  })
}
  return (
    <div className=''>

    </div>
  )
}
