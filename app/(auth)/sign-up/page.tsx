'use client';

import AuthForm from '@/components/forms/AuthForm'
import { SignInSchema } from '@/lib/validation'
import React from 'react'

const SignUp = () => {
  return (
    <AuthForm formType="SIGN_UP"
    schema={SignInSchema}
    defaultValues={{username:'',name:'',email:'',password:''}}
    onSubmit={(data)=>Promise.resolve({success:true,data})}/>
  )
}

export default SignUp