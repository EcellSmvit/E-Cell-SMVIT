import { SignedIn, UserButton} from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'

function Stepperform() {
    const {user} = useUser();
  return (
    <div className='w-screen h-screen bg-black'>
        <SignedIn>
            <div className='flex justify-between items-center p-4'>
                <img src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039" alt="" className='w-12'/>
                <UserButton/>
            </div>
            <div>
                <div className='p-4 text-6xl font-bold text-white'>
                    <h1>Welcome <span className='text-red-700'>{user?.firstName}</span>  <br /> to E-Cell Smvit Recruitment 2025</h1>
                </div>
                <div>
                   
                </div>
            </div>
        </SignedIn>
    </div>
  )
}

export default Stepperform