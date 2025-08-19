import React from 'react'
import Stepper, { Step } from '../ui/Components/Stepper/Stepper';
import { InteractiveGridPattern } from '../magicui/interactive-grid-pattern';
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form"

function Recurtiment() {
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm()
      const onSubmit = (data) => console.log(data)
  return (
    <div className='text-white'>
      <div className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background z-20">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            
          )}
          width={50}
          height={50}
          squares={[80, 80]}
          squaresClassName="hover:fill-[#6D4DFE]"
        />
        <div className='relative z-10'>
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
        //   disableStepIndicators="true"
        >
          <Step>
            <h2>Welcome to the E-Cell SMVIT Recuritement </h2>
            <p>Check out the next step!</p>
          </Step>
          <Step>
            <h2>Step 2</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", { required: true })}
        aria-invalid={errors.firstName ? "true" : "false"}
      />
      {errors.firstName?.type === "required" && (
        <p role="alert">First name is required</p>
      )}

      <input
        {...register("mail", { required: "Email Address is required" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />
      {errors.mail && <p role="alert">{errors.mail.message}</p>}

      <input type="submit" />
    </form>
          </Step>
          <Step>
            <h2>How about an input?</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
          </Step>
          <Step>
            <h2>Final Step</h2>
            <p>You made it!</p>
          </Step>
        </Stepper>
        </div>
        
      </div>
    </div>
  )
}

export default Recurtiment