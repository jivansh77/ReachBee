import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-20">
        {/* Info Section */}
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-5xl font-bold">Welcome Back!</h1>
          <p className="py-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="badge badge-primary">✓</div>
              <span>Feature One Lorem Ipsum</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="badge badge-primary">✓</div>
              <span>Feature Two Dolor Sit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="badge badge-primary">✓</div>
              <span>Feature Three Amet</span>
            </div>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-2">Welcome Back!</h2>
            <form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="input input-bordered" 
                  required 
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  className="input input-bordered" 
                  required 
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover text-primary">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-8">
                <button className="btn btn-primary">Sign In</button>
              </div>
              <div className="divider">OR</div>
              <div className="text-center">
                <p className="text-sm">Don't have an account?
                  <Link to="/signup" className="btn btn-link text-primary -ml-3">Sign Up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn