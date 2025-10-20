import { LoaderIcon } from 'lucide-react'


const pageLoading = () => {
  return (
    <div className='items-center justify-center flex h-screen'>
      <LoaderIcon className='text-white z-10 size-10 animate-spin'/>
    </div>
  )
}

export default pageLoading
